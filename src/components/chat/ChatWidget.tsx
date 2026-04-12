// src/components/chat/ChatWidget.tsx
"use client";

import { useState, useRef, useEffect } from "react";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice chat state
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const mediaRecRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Track whether user has scrolled past the hero — prompt must never cover above-the-fold content
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) setHasScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Show prompt 2s after user has scrolled past the hero (never on first load)
  useEffect(() => {
    if (!hasScrolled || promptDismissed || isOpen) return;
    const timer = setTimeout(() => {
      if (!promptDismissed && !isOpen) setShowPrompt(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [hasScrolled, promptDismissed, isOpen]);

  // Hide prompt when chat opens
  useEffect(() => {
    if (isOpen) {
      setShowPrompt(false);
    }
  }, [isOpen]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

  const sendMessage = async (text: string, speakReply: boolean) => {
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
          voice: speakReply,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      if (speakReply) {
        // Voice mode: full JSON response (TTS needs complete text)
        const data = await response.json();
        const replyText: string = data.message ?? "";

        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, role: "assistant", content: replyText },
        ]);

        if (replyText) {
          try {
            const audioUrl = await voiceApi.synthesize(replyText);
            const audio = new Audio(audioUrl);
            audioRef.current = audio;
            const cleanup = () => {
              URL.revokeObjectURL(audioUrl);
              audioRef.current = null;
              setIsPlayingAudio(false);
            };
            audio.onended = cleanup;
            audio.onerror = cleanup;
            setIsPlayingAudio(true);
            await audio.play();
          } catch (ttsErr) {
            console.error("TTS error:", ttsErr);
            setIsPlayingAudio(false);
            setVoiceError("Could not play voice reply. Text reply is shown above.");
          }
        }
      } else {
        // Text mode: streaming response — add empty bubble, fill as tokens arrive
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
    await sendMessage(text, false);
  };

  // --- Voice chat: press-and-hold mic → transcribe → send → auto-TTS reply ---

  const startRecording = async () => {
    if (isRecording || isLoading) return;
    setVoiceError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        try {
          const text = await voiceApi.transcribe(blob);
          if (text && text.trim()) {
            await sendMessage(text, true);
          } else {
            setVoiceError("No speech detected. Try again.");
          }
        } catch (err) {
          console.error("Voice transcription error:", err);
          setVoiceError("Could not transcribe audio. Is the voice service running?");
        }
      };
      mr.start();
      mediaRecRef.current = mr;
      setIsRecording(true);
    } catch {
      setVoiceError("Microphone access denied. Please allow microphone permission.");
    }
  };

  const stopRecording = () => {
    if (!isRecording || !mediaRecRef.current) return;
    try {
      mediaRecRef.current.stop();
    } catch {
      // noop — stop() may throw if already inactive
    }
    mediaRecRef.current = null;
    setIsRecording(false);
  };

  // Cleanup on unmount: stop any in-flight recording or audio playback
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (mediaRecRef.current && mediaRecRef.current.state !== "inactive") {
        try {
          mediaRecRef.current.stop();
        } catch {
          // noop
        }
        mediaRecRef.current = null;
      }
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
          style={{ position: 'fixed', bottom: '96px', right: '24px' }}
          className="z-50 w-[350px] sm:w-[400px] h-[500px] bg-stone-50 dark:bg-stone-900 shadow-2xl flex flex-col overflow-hidden border border-amber-500/30"
        >
          {/* Header */}
          <div className="bg-stone-900 dark:bg-black text-white px-4 py-3 flex items-center gap-3 border-b border-amber-500/20">
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
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-100 dark:bg-stone-950"
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
            <div ref={messagesEndRef} />
          </div>

          {/* Voice status strip (recording / playback / errors) */}
          {(isRecording || isPlayingAudio || voiceError) && (
            <div
              className="px-3 py-2 bg-stone-900 dark:bg-black border-t border-amber-500/20 text-xs uppercase tracking-[0.2em]"
              role="status"
              aria-live="polite"
            >
              {voiceError ? (
                <p className="text-red-300" role="alert">
                  {voiceError}
                </p>
              ) : isRecording ? (
                <p className="text-amber-400 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" aria-hidden="true" />
                  Recording — click mic to send
                </p>
              ) : (
                <p className="text-amber-400 flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" aria-hidden="true" />
                  Speaking…
                </p>
              )}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-700"
          >
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
                disabled={isLoading || isRecording}
              />
              <button
                type="button"
                onClick={() => (isRecording ? stopRecording() : startRecording())}
                disabled={isLoading}
                aria-label={isRecording ? "Stop recording and send" : "Click to start recording"}
                aria-pressed={isRecording}
                className={[
                  "w-10 h-10 flex items-center justify-center transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-stone-900",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  isRecording
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-[0_0_0_4px_rgba(220,38,38,0.25)]"
                    : "bg-white dark:bg-stone-800 border border-amber-500/60 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-stone-700",
                ].join(" ")}
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
                disabled={isLoading || isRecording || !input.trim()}
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
        </div>
      )}
    </>
  );
}