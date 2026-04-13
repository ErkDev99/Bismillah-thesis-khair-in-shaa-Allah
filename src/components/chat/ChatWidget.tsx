// src/components/chat/ChatWidget.tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { voiceApi } from "@/lib/voiceApi";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptDismissed, setPromptDismissed] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! I'm your Wanderlust travel assistant. How can I help you plan your Central Asian adventure today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Dictation state
  const [isDictating, setIsDictating] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [audioLevels, setAudioLevels] = useState<number[]>(new Array(24).fill(0));

  // Dictation refs
  const mediaRecRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Track whether user has scrolled past the hero — hide prompt when back above the fold
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) {
        setHasScrolled(true);
      } else {
        setShowPrompt(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Show prompt 2s after user has scrolled past the hero (never on first load)
  // Auto-dismiss after 7s so it never covers content for long
  useEffect(() => {
    if (!hasScrolled || promptDismissed || isOpen) return;
    const showTimer = setTimeout(() => {
      if (!promptDismissed && !isOpen) setShowPrompt(true);
    }, 2000);
    return () => clearTimeout(showTimer);
  }, [hasScrolled, promptDismissed, isOpen]);

  useEffect(() => {
    if (!showPrompt) return;
    const hideTimer = setTimeout(() => {
      setShowPrompt(false);
      setPromptDismissed(true);
    }, 7000);
    return () => clearTimeout(hideTimer);
  }, [showPrompt]);

  // Hide prompt when chat opens
  useEffect(() => {
    if (isOpen) {
      setShowPrompt(false);
    }
  }, [isOpen]);

  // Auto-scroll to bottom when new messages arrive (scroll container only, never window)
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const handleDismissPrompt = (
    e: React.MouseEvent | React.KeyboardEvent
  ) => {
    e.stopPropagation();
    setShowPrompt(false);
    setPromptDismissed(true);
  };

  const handlePromptClick = () => {
    setShowPrompt(false);
    setIsOpen(true);
  };

  // ── Text chat: send message via /api/chat (streaming) ────────────────────

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const assistantId = Date.now() + 1;
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: fullText } : m
          )
        );
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again or contact us directly at info@wanderlust.com",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage(text);
  };

  // ── Dictation: record audio → visualize → transcribe to text input ────────

  const stopAnalyser = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setAudioLevels(new Array(24).fill(0));
  }, []);

  const cleanupRecording = useCallback(() => {
    stopAnalyser();
    if (mediaRecRef.current && mediaRecRef.current.state !== "inactive") {
      try { mediaRecRef.current.stop(); } catch { /* */ }
    }
    mediaRecRef.current = null;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    analyserRef.current = null;
    chunksRef.current = [];
  }, [stopAnalyser]);

  const startDictation = async () => {
    if (isDictating || isTranscribing || isLoading) return;
    setVoiceError("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Set up analyser for waveform visualization
      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Start waveform animation
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateLevels = () => {
        analyser.getByteFrequencyData(dataArray);
        // Pick 24 evenly-spaced bins and normalize to 0–1
        const bars = 24;
        const step = Math.floor(dataArray.length / bars);
        const levels: number[] = [];
        for (let i = 0; i < bars; i++) {
          levels.push(dataArray[i * step] / 255);
        }
        setAudioLevels(levels);
        animFrameRef.current = requestAnimationFrame(updateLevels);
      };
      animFrameRef.current = requestAnimationFrame(updateLevels);

      // Start recording
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.start();
      mediaRecRef.current = mr;
      setIsDictating(true);
    } catch {
      setVoiceError("Microphone access denied.");
      cleanupRecording();
    }
  };

  const cancelDictation = () => {
    cleanupRecording();
    setIsDictating(false);
  };

  const confirmDictation = async () => {
    if (!mediaRecRef.current) return;

    // Stop recording and collect the blob
    const blob = await new Promise<Blob>((resolve) => {
      const mr = mediaRecRef.current!;
      mr.onstop = () => {
        resolve(new Blob(chunksRef.current, { type: "audio/webm" }));
      };
      mr.stop();
    });

    // Cleanup mic/analyser immediately
    stopAnalyser();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    analyserRef.current = null;
    mediaRecRef.current = null;

    setIsDictating(false);
    setIsTranscribing(true);

    try {
      const text = await voiceApi.transcribe(blob);
      if (text && text.trim()) {
        setInput((prev) => {
          const separator = prev.trim() ? " " : "";
          return prev + separator + text.trim();
        });
      } else {
        setVoiceError("No speech detected. Try again.");
      }
    } catch (err) {
      console.error("Transcription error:", err);
      setVoiceError("Could not transcribe. Is the voice service running?");
    } finally {
      setIsTranscribing(false);
      chunksRef.current = [];
    }
  };

  // Clear voice error after 4s
  useEffect(() => {
    if (!voiceError) return;
    const t = setTimeout(() => setVoiceError(""), 4000);
    return () => clearTimeout(t);
  }, [voiceError]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (mediaRecRef.current && mediaRecRef.current.state !== "inactive") {
        try { mediaRecRef.current.stop(); } catch { /* */ }
      }
      streamRef.current?.getTracks().forEach((t) => t.stop());
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <>
      {/* Proactive Chat Prompt */}
      {showPrompt && !isOpen && (
        <div
          style={{ position: 'fixed', bottom: '100px', right: '24px' }}
          className="z-50 max-w-[280px]"
        >
          <button
            type="button"
            onClick={handlePromptClick}
            className="relative block w-full text-left bg-stone-900 p-4 border border-amber-500/30 shadow-2xl cursor-pointer hover:border-amber-500/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
            aria-label="Open chat with travel assistant"
          >
            {/* Avatar and message */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shrink-0" aria-hidden="true">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-amber-100 mb-1">Need help planning your trip?</p>
                <p className="text-xs text-stone-400">Click to chat with our travel assistant!</p>
              </div>
            </div>

            {/* Small arrow pointing to button */}
            <span
              className="absolute -bottom-2 right-8 w-4 h-4 bg-stone-900 border-r border-b border-amber-500/30 transform rotate-45"
              aria-hidden="true"
            />
          </button>

          {/* Dismiss button — sibling so it's not nested inside the prompt button */}
          <button
            type="button"
            onClick={handleDismissPrompt}
            className="absolute -top-2 -right-2 w-6 h-6 bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 hover:text-amber-400 transition-colors border border-amber-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
            aria-label="Dismiss chat prompt"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{ position: 'fixed', bottom: '24px', right: '24px' }}
        className="z-50 w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-stone-950"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        aria-controls="chat-dialog"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          id="chat-dialog"
          role="dialog"
          aria-labelledby="chat-dialog-title"
          aria-modal="false"
          style={{
            position: 'fixed',
            bottom: '96px',
            right: '24px',
            height: '500px',
            maxHeight: 'calc(100vh - 120px)',
          }}
          className="z-50 w-[350px] sm:w-[400px] bg-stone-50 dark:bg-stone-900 shadow-2xl flex flex-col overflow-hidden border border-amber-500/30"
        >
          {/* Header */}
          <div className="flex-shrink-0 bg-stone-900 dark:bg-black text-white px-4 py-3 flex items-center gap-3 border-b border-amber-500/20">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center" aria-hidden="true">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 id="chat-dialog-title" className="font-semibold font-serif">Wanderlust Assistant</h3>
              <p className="text-amber-400/70 text-xs uppercase tracking-wider" aria-live="polite">
                {isLoading ? "Typing..." : "Online"}
              </p>
            </div>
            <Link
              href="/voice-chat"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 hover:bg-amber-500/20 flex items-center justify-center transition-colors text-stone-400 hover:text-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 dark:focus-visible:ring-offset-black"
              aria-label="Open immersive voice mode"
              title="Voice mode"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m7 7v4m-4 0h8M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 hover:bg-amber-500/20 flex items-center justify-center transition-colors text-stone-400 hover:text-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 dark:focus-visible:ring-offset-black"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 bg-stone-100 dark:bg-stone-950"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                      : "bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 shadow-sm border border-stone-200 dark:border-stone-700"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    <span className="sr-only">
                      {message.role === "user" ? "You said: " : "Assistant said: "}
                    </span>
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start" aria-label="Assistant is typing">
                <div className="bg-white dark:bg-stone-800 text-stone-800 shadow-sm border border-stone-200 dark:border-stone-700 px-4 py-2">
                  <div className="flex gap-1" aria-hidden="true">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
                    <span
                      className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <span
                      className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Voice error strip */}
          {voiceError && (
            <div
              className="flex-shrink-0 px-3 py-2 bg-stone-900 dark:bg-black border-t border-amber-500/20 text-xs uppercase tracking-[0.2em]"
              role="status"
              aria-live="polite"
            >
              <p className="text-red-300" role="alert">{voiceError}</p>
            </div>
          )}

          {/* Input area — switches between normal mode and dictation mode */}
          <div className="flex-shrink-0 p-3 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-700">
            {isDictating ? (
              /* ── Dictation mode: waveform + cancel/confirm ── */
              <div className="flex items-center gap-2" role="status" aria-label="Recording audio">
                {/* Waveform visualization */}
                <div className="flex-1 flex items-center justify-center gap-[2px] h-10 px-2" aria-hidden="true">
                  {audioLevels.map((level, i) => (
                    <div
                      key={i}
                      className="w-[3px] bg-amber-500 transition-all duration-75"
                      style={{
                        height: `${Math.max(2, level * 28)}px`,
                        opacity: 0.4 + level * 0.6,
                      }}
                    />
                  ))}
                </div>

                {/* Cancel button (X) */}
                <button
                  type="button"
                  onClick={cancelDictation}
                  className="w-10 h-10 flex items-center justify-center text-stone-500 dark:text-stone-400 hover:text-red-500 dark:hover:text-red-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-stone-900"
                  aria-label="Cancel recording"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Confirm button (✓) */}
                <button
                  type="button"
                  onClick={confirmDictation}
                  className="w-10 h-10 flex items-center justify-center text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-stone-900"
                  aria-label="Confirm and transcribe recording"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            ) : isTranscribing ? (
              /* ── Transcribing state ── */
              <div className="flex items-center justify-center h-10 gap-2" role="status" aria-label="Transcribing audio">
                <div className="flex gap-1" aria-hidden="true">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
                <span className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wider">Transcribing...</span>
              </div>
            ) : (
              /* ── Normal mode: text input + mic + send ── */
              <form onSubmit={handleSubmit}>
                <div className="flex gap-2">
                  <label htmlFor="chat-input" className="sr-only">
                    Message
                  </label>
                  <input
                    id="chat-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about tours, destinations..."
                    className="flex-1 px-4 py-2 border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-200 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 dark:focus:ring-amber-400 focus:border-transparent text-sm"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={startDictation}
                    disabled={isLoading}
                    aria-label="Dictate — click to record voice"
                    title="Dictate"
                    className="w-10 h-10 flex items-center justify-center bg-white dark:bg-stone-800 border border-amber-500/60 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-stone-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-14 0" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v4M8 22h8" />
                    </svg>
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-stone-300 disabled:to-stone-300 dark:disabled:from-stone-600 dark:disabled:to-stone-600 text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 dark:focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-stone-900"
                    aria-label="Send message"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
