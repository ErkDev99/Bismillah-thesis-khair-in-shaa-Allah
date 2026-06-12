// src/components/chat/ChatWidget.tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { voiceApi } from "@/lib/voiceApi";
import { useLocale } from "@/components/LocaleProvider";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

// Render assistant text, turning markdown links [label](url) into clickable
// links. Internal paths (/tours/...) use Next.js client navigation; external
// URLs open in a new tab. Everything else stays plain text (newlines preserved
// by the parent's whitespace-pre-wrap).
function renderWithLinks(text: string): ReactNode[] {
  const linkClass =
    "underline font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300";
  const parts: ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const [, label, url] = match;
    if (url.startsWith("/")) {
      parts.push(
        <Link key={key++} href={url} className={linkClass}>
          {label}
        </Link>
      );
    } else {
      parts.push(
        <a
          key={key++}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {label}
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export default function ChatWidget() {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptDismissed, setPromptDismissed] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages((prev) => {
      const hasUserMessage = prev.some((m) => m.role === "user");
      if (hasUserMessage) return prev;
      return [{ id: 1, role: "assistant", content: t.chat.welcomeMessage }];
    });
  }, [t]);
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
          content: t.chat.errorConnection,
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
      setVoiceError(t.chat.errorMicDenied);
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
        setVoiceError(t.chat.errorNoSpeech);
      }
    } catch (err) {
      console.error("Transcription error:", err);
      setVoiceError(t.chat.errorTranscribe);
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
            className="relative block w-full text-left bg-emerald-950 rounded-xl p-4 border border-emerald-500/30 shadow-2xl cursor-pointer hover:border-emerald-500/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            aria-label={t.chat.promptOpenAriaLabel}
          >
            {/* Avatar and message */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shrink-0" aria-hidden="true">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-100 mb-1">{t.chat.promptTitle}</p>
                <p className="text-xs text-stone-400">{t.chat.promptSubtitle}</p>
              </div>
            </div>

            {/* Small arrow pointing to button */}
            <span
              className="absolute -bottom-2 right-8 w-4 h-4 bg-emerald-950 border-r border-b border-emerald-500/30 transform rotate-45"
              aria-hidden="true"
            />
          </button>

          {/* Dismiss button — sibling so it's not nested inside the prompt button */}
          <button
            type="button"
            onClick={handleDismissPrompt}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 hover:text-emerald-400 transition-colors border border-emerald-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            aria-label={t.chat.promptDismissAriaLabel}
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
        className="z-50 w-14 h-14 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
        aria-label={isOpen ? t.chat.closeChat : t.chat.openChat}
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
          className="z-50 w-[350px] sm:w-[400px] rounded-xl bg-stone-50 dark:bg-slate-900 shadow-2xl flex flex-col overflow-hidden border border-emerald-500/30"
        >
          {/* Header */}
          <div className="flex-shrink-0 bg-emerald-950 dark:bg-black text-white px-4 py-3 flex items-center gap-3 border-b border-emerald-500/20">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center" aria-hidden="true">
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
              <h3 id="chat-dialog-title" className="font-semibold font-serif">{t.chat.assistantName}</h3>
              <p className="text-emerald-400/70 text-xs uppercase tracking-wider" aria-live="polite">
                {isLoading ? t.chat.typing : t.chat.online}
              </p>
            </div>
            <Link
              href="/voice-chat"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 hover:bg-emerald-500/20 flex items-center justify-center transition-colors text-stone-400 hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 dark:focus-visible:ring-offset-black"
              aria-label={t.chat.voiceModeAriaLabel}
              title={t.chat.voiceModeTitle}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m7 7v4m-4 0h8M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 hover:bg-emerald-500/20 flex items-center justify-center transition-colors text-stone-400 hover:text-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 dark:focus-visible:ring-offset-black"
              aria-label={t.chat.closeChat}
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
            aria-label={t.chat.messagesAriaLabel}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-emerald-600 text-white"
                      : "bg-white dark:bg-slate-800 text-stone-800 dark:text-stone-200 shadow-sm border border-stone-200 dark:border-slate-700"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    <span className="sr-only">
                      {message.role === "user" ? t.chat.userSaidPrefix : t.chat.assistantSaidPrefix}
                    </span>
                    {message.role === "assistant"
                      ? renderWithLinks(message.content)
                      : message.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start" aria-label={t.chat.assistantTyping}>
                <div className="bg-white dark:bg-stone-800 text-stone-800 shadow-sm border border-stone-200 dark:border-stone-700 px-4 py-2">
                  <div className="flex gap-1" aria-hidden="true">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
                    <span
                      className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <span
                      className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
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
              className="flex-shrink-0 px-3 py-2 bg-stone-900 dark:bg-black border-t border-emerald-500/20 text-xs uppercase tracking-[0.2em]"
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
              <div className="flex items-center gap-2" role="status" aria-label={t.chat.recordingAriaLabel}>
                {/* Waveform visualization */}
                <div className="flex-1 flex items-center justify-center gap-[2px] h-10 px-2" aria-hidden="true">
                  {audioLevels.map((level, i) => (
                    <div
                      key={i}
                      className="w-[3px] bg-emerald-500 transition-all duration-75"
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
                  className="w-10 h-10 flex items-center justify-center text-stone-500 dark:text-stone-400 hover:text-red-500 dark:hover:text-red-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-stone-900"
                  aria-label={t.chat.cancelRecordingAriaLabel}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Confirm button (✓) */}
                <button
                  type="button"
                  onClick={confirmDictation}
                  className="w-10 h-10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-stone-900"
                  aria-label={t.chat.confirmRecordingAriaLabel}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            ) : isTranscribing ? (
              /* ── Transcribing state ── */
              <div className="flex items-center justify-center h-10 gap-2" role="status" aria-label={t.chat.transcribingAriaLabel}>
                <div className="flex gap-1" aria-hidden="true">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
                <span className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.chat.transcribing}</span>
              </div>
            ) : (
              /* ── Normal mode: text input + mic + send ── */
              <form onSubmit={handleSubmit}>
                <div className="flex gap-2">
                  <label htmlFor="chat-input" className="sr-only">
                    {t.chat.inputLabel}
                  </label>
                  <input
                    id="chat-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t.chat.inputPlaceholder}
                    className="flex-1 px-4 py-2 rounded-lg border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-stone-900 dark:text-stone-200 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-400 focus:border-transparent text-sm"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={startDictation}
                    disabled={isLoading}
                    aria-label={t.chat.dictateAriaLabel}
                    title={t.chat.dictateTitle}
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-slate-800 border border-emerald-500/60 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="w-10 h-10 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 dark:disabled:bg-slate-600 text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
                    aria-label={t.chat.sendAriaLabel}
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
