// src/app/voice-chat/page.tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { voiceApi } from "@/lib/voiceApi";
import styles from "./sora.module.css";

type AppState = "idle" | "listening" | "recording" | "thinking" | "speaking";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const STATE_LABELS: Record<AppState, string> = {
  idle: "Press Start to begin",
  listening: "Listening…",
  recording: "Hearing you…",
  thinking: "Thinking…",
  speaking: "Speaking…",
};

// VAD tuning
const SPEECH_THRESHOLD = 0.018;
const SILENCE_MS       = 1400;
const MIN_SPEECH_MS    = 350;

// ─── Animated orb ────────────────────────────────────────────────────────────
function SoraBall({ state }: { state: AppState }) {
  const active   = state !== "idle";
  const thinking = state === "thinking";

  const ballClass =
    state === "recording" ? styles.ballRecording
    : state === "thinking" ? styles.ballThinking
    : state === "speaking" ? styles.ballSpeaking
    : styles.ballIdle;

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={[styles.ring, styles.ring2, active ? styles.ringActive : "", thinking ? styles.ringThinking : ""].filter(Boolean).join(" ")} />
      <div className={[styles.ring, styles.ring1, active ? styles.ringActive : "", thinking ? `${styles.ringThinking} ${styles.ringThinkingReverse}` : ""].filter(Boolean).join(" ")} />
      <div className={`${styles.ball} ${ballClass}`} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function VoiceChatPage() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error,    setError]    = useState("");

  // Ref-mirror of appState for RAF callbacks
  const stateRef         = useRef<AppState>("idle");
  const messagesRef      = useRef<ChatMessage[]>([]);
  const streamRef        = useRef<MediaStream | null>(null);
  const audioCtxRef      = useRef<AudioContext | null>(null);
  const analyserRef      = useRef<AnalyserNode | null>(null);
  const rafRef           = useRef<number | null>(null);
  const mediaRecRef      = useRef<MediaRecorder | null>(null);
  const chunksRef        = useRef<Blob[]>([]);
  const audioRef         = useRef<HTMLAudioElement | null>(null);
  const speechStartRef   = useRef<number | null>(null);
  const silenceStartRef  = useRef<number | null>(null);
  const busyRef          = useRef(false);
  const logEndRef        = useRef<HTMLDivElement>(null);
  const logContainerRef  = useRef<HTMLDivElement>(null);

  const transition = useCallback((next: AppState) => {
    stateRef.current = next;
    setAppState(next);
  }, []);

  // Keep messagesRef in sync
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  // Auto-scroll conversation log — scroll INSIDE the container only, not the page
  useEffect(() => {
    const container = logContainerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages]);

  // ── Stop recording ──────────────────────────────────────────────────────────
  const stopRecording = useCallback(() => {
    if (mediaRecRef.current && mediaRecRef.current.state !== "inactive") {
      mediaRecRef.current.stop();
    }
    mediaRecRef.current = null;
  }, []);

  // ── Process audio → transcribe → chat → TTS ────────────────────────────────
  const processAudio = useCallback(async (blob: Blob) => {
    busyRef.current = true;
    transition("thinking");
    setError("");

    try {
      // 1. Transcribe
      const text = await voiceApi.transcribe(blob);
      if (!text?.trim()) {
        busyRef.current = false;
        transition("listening");
        return;
      }

      // Add user message
      const userMsg: ChatMessage = { role: "user", content: text };
      setMessages(prev => [...prev, userMsg]);

      // 2. Chat — pass full conversation history for context
      const allMessages = [...messagesRef.current, userMsg];
      const chatRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voice: true,  // use short voice-optimised prompt + 80 max_tokens
          messages: allMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      if (!chatRes.ok) throw new Error(`Chat error ${chatRes.status}`);

      const { message: answer = "" } = (await chatRes.json()) as { message?: string };

      // Add assistant message
      if (answer) {
        setMessages(prev => [...prev, { role: "assistant", content: answer }]);
      }

      if (!answer) {
        busyRef.current = false;
        transition("listening");
        return;
      }

      // 3. TTS — speak the reply
      const audioUrl = await voiceApi.synthesize(answer);
      const audio    = new Audio(audioUrl);
      audioRef.current = audio;
      transition("speaking");

      const resume = () => {
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
        busyRef.current  = false;
        speechStartRef.current  = null;
        silenceStartRef.current = null;
        transition("listening");
      };
      audio.onended = resume;
      audio.onerror = resume;
      await audio.play();

    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      busyRef.current = false;
      transition("listening");
    }
  }, [transition]);

  // ── Start recording when VAD detects speech ─────────────────────────────────
  const startRecording = useCallback(() => {
    if (!streamRef.current || busyRef.current) return;
    if (mediaRecRef.current) return;

    chunksRef.current       = [];
    speechStartRef.current  = Date.now();
    silenceStartRef.current = null;

    const mr = new MediaRecorder(streamRef.current);
    mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    mr.onstop = async () => {
      const dur = speechStartRef.current ? Date.now() - speechStartRef.current : 0;
      if (dur >= MIN_SPEECH_MS && chunksRef.current.length > 0) {
        await processAudio(new Blob(chunksRef.current, { type: "audio/webm" }));
      } else {
        busyRef.current = false;
        transition("listening");
      }
    };
    mr.start();
    mediaRecRef.current = mr;
    transition("recording");
  }, [processAudio, transition]);

  // ── VAD loop ────────────────────────────────────────────────────────────────
  const runVAD = useCallback(() => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.fftSize);

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const st = stateRef.current;
      if (st === "thinking" || st === "speaking" || st === "idle") return;

      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const v = (data[i] - 128) / 128;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / data.length);
      const isSpeech = rms > SPEECH_THRESHOLD;

      if (st === "listening") {
        if (isSpeech) startRecording();
      } else if (st === "recording") {
        if (!isSpeech) {
          if (silenceStartRef.current === null) {
            silenceStartRef.current = Date.now();
          } else if (Date.now() - silenceStartRef.current > SILENCE_MS) {
            silenceStartRef.current = null;
            stopRecording();
          }
        } else {
          silenceStartRef.current = null;
        }
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [startRecording, stopRecording]);

  // ── Start conversation ──────────────────────────────────────────────────────
  const startConversation = async () => {
    setError("");
    setMessages([]);
    busyRef.current = false;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const ctx      = new AudioContext();
      const source   = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;

      transition("listening");
      runVAD();
    } catch {
      setError("Microphone access denied.");
    }
  };

  // ── End conversation ────────────────────────────────────────────────────────
  const endConversation = useCallback(() => {
    if (audioRef.current)  { audioRef.current.pause(); audioRef.current = null; }
    stopRecording();
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
    analyserRef.current     = null;
    busyRef.current         = false;
    speechStartRef.current  = null;
    silenceStartRef.current = null;
    transition("idle");
  }, [stopRecording, transition]);

  // Cleanup on unmount
  useEffect(() => () => { endConversation(); }, [endConversation]);

  const inConversation = appState !== "idle";

  return (
    <div className="relative min-h-screen overflow-hidden bg-amber-50 dark:bg-stone-950">
      {/* Art Deco pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="voice-deco" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="currentColor" className="text-amber-700 dark:text-amber-400" strokeWidth="0.5" />
            <circle cx="30" cy="30" r="8" fill="none" stroke="currentColor" className="text-amber-700 dark:text-amber-400" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#voice-deco)" />
        </svg>
      </div>
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-3xl" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

        {/* Header */}
        <header className="text-center mb-8">
          <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-3">
            Voice Assistant
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-amber-50 mb-5">
            Speak with Wanderlust
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4" aria-hidden="true">
            <div className="h-px w-12 md:w-20 bg-amber-500/50" />
            <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
            <div className="w-2.5 h-2.5 rotate-45 border border-amber-500" />
            <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
            <div className="h-px w-12 md:w-20 bg-amber-500/50" />
          </div>
          <p className="text-stone-600 dark:text-stone-400 max-w-xl mx-auto leading-relaxed text-sm">
            {inConversation
              ? "Just speak naturally — the assistant hears you automatically."
              : "Press Start to begin a hands-free conversation about Central Asian tours, destinations, and travel."}
          </p>
        </header>

        {/* Orb + status */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <SoraBall state={appState} />
          <p
            className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.25em] text-xs min-h-[20px]"
            role="status"
            aria-live="polite"
          >
            {STATE_LABELS[appState]}
          </p>
        </div>

        {/* Start / End button */}
        <div className="flex justify-center mb-8">
          {!inConversation ? (
            <button
              type="button"
              onClick={startConversation}
              className="flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-medium uppercase tracking-[0.2em] text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-50 dark:focus-visible:ring-offset-stone-950"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
              Start Conversation
            </button>
          ) : (
            <button
              type="button"
              onClick={endConversation}
              className="flex items-center gap-3 px-8 py-4 bg-stone-800 hover:bg-stone-700 text-amber-400 hover:text-amber-300 border border-stone-600 font-medium uppercase tracking-[0.2em] text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-50 dark:focus-visible:ring-offset-stone-950"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="4" y="4" width="16" height="16" rx="2" />
              </svg>
              End Conversation
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <p className="text-center text-red-700 dark:text-red-400 text-sm mb-6" role="alert">{error}</p>
        )}

        {/* Conversation log — accumulates all turns */}
        {messages.length > 0 && (
          <div className="mx-auto max-w-xl space-y-4">
            <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs text-center mb-2">
              Conversation
            </p>

            <div ref={logContainerRef} className="max-h-[400px] overflow-y-auto space-y-4 pr-2 scroll-smooth">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={
                    msg.role === "user"
                      ? "relative border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4"
                      : "relative border border-amber-500/40 bg-stone-900 dark:bg-black p-4 text-amber-50"
                  }
                >
                  {/* Corner accents */}
                  <div className={`absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 ${msg.role === "user" ? "border-amber-500/60" : "border-amber-500"}`} aria-hidden="true" />
                  <div className={`absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 ${msg.role === "user" ? "border-amber-500/60" : "border-amber-500"}`} aria-hidden="true" />
                  <div className={`absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 ${msg.role === "user" ? "border-amber-500/60" : "border-amber-500"}`} aria-hidden="true" />
                  <div className={`absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 ${msg.role === "user" ? "border-amber-500/60" : "border-amber-500"}`} aria-hidden="true" />

                  <p className={`uppercase tracking-[0.3em] text-xs mb-1.5 ${msg.role === "user" ? "text-amber-700 dark:text-amber-400" : "text-amber-400"}`}>
                    {msg.role === "user" ? "You" : "Assistant"}
                  </p>
                  <p className={`text-sm leading-relaxed ${msg.role === "user" ? "text-stone-800 dark:text-stone-200" : ""}`}>
                    {msg.content}
                  </p>
                </div>
              ))}

              {/* Thinking indicator */}
              {appState === "thinking" && (
                <div className="relative border border-amber-500/40 bg-stone-900 dark:bg-black p-4 text-amber-50">
                  <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-amber-500" aria-hidden="true" />
                  <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-amber-500" aria-hidden="true" />
                  <p className="text-amber-400 uppercase tracking-[0.3em] text-xs mb-1.5">Assistant</p>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              )}

              <div ref={logEndRef} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
