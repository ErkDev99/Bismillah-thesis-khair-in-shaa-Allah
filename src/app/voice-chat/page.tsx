// src/app/voice-chat/page.tsx
"use client";

import { useState, useRef } from "react";
import { voiceApi } from "@/lib/voiceApi";
import styles from "./sora.module.css";

type AppState = "idle" | "recording" | "thinking" | "speaking";

const STATE_LABELS: Record<AppState, string> = {
  idle: "Press and hold the microphone",
  recording: "Recording — release to send",
  thinking: "Thinking…",
  speaking: "Speaking — click to stop",
};

function SoraBall({ state }: { state: AppState }) {
  const active = state !== "idle";
  const thinking = state === "thinking";

  const ballStateClass =
    state === "recording"
      ? styles.ballRecording
      : state === "thinking"
      ? styles.ballThinking
      : state === "speaking"
      ? styles.ballSpeaking
      : styles.ballIdle;

  const ring1Classes = [
    styles.ring,
    styles.ring1,
    active ? styles.ringActive : "",
    thinking ? `${styles.ringThinking} ${styles.ringThinkingReverse}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const ring2Classes = [
    styles.ring,
    styles.ring2,
    active ? styles.ringActive : "",
    thinking ? styles.ringThinking : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={ring2Classes} />
      <div className={ring1Classes} />
      <div className={`${styles.ball} ${ballStateClass}`} />
    </div>
  );
}

export default function VoiceChatPage() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const mediaRecRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    if (appState !== "idle") return;
    setError("");
    setTranscript("");
    setResponse("");
    chunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        await processAudio(blob);
      };
      mr.start();
      mediaRecRef.current = mr;
      setAppState("recording");
    } catch {
      setError("Microphone access denied. Please allow microphone permission in your browser.");
    }
  };

  const stopRecording = () => {
    if (appState !== "recording" || !mediaRecRef.current) return;
    mediaRecRef.current.stop();
    mediaRecRef.current = null;
    setAppState("thinking");
  };

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setAppState("idle");
  };

  const processAudio = async (blob: Blob) => {
    setAppState("thinking");
    try {
      // 1. Speech → Text (via /voice/transcribe-voice proxied to voice-actor:8001)
      const text = await voiceApi.transcribe(blob);
      if (!text) {
        setAppState("idle");
        return;
      }
      setTranscript(text);

      // 2. Chat — uses this project's existing non-streaming /api/chat endpoint
      //    (ChatWidget uses the same shape: { messages: [{role, content}] } → { message })
      const chatRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: text }],
        }),
      });
      if (!chatRes.ok) throw new Error(`Chat error: ${chatRes.status}`);
      const chatJson = (await chatRes.json()) as { message?: string };
      const answer = chatJson.message ?? "";
      setResponse(answer);

      if (!answer) {
        setAppState("idle");
        return;
      }

      // 3. Text → Speech
      const audioUrl = await voiceApi.synthesize(answer);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onplay = () => setAppState("speaking");
      audio.onended = () => {
        audioRef.current = null;
        setAppState("idle");
      };
      audio.onerror = () => {
        audioRef.current = null;
        setAppState("idle");
      };
      await audio.play();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError("Error: " + msg);
      setAppState("idle");
    }
  };

  const handleMicClick = () => {
    if (appState === "speaking") {
      stopSpeaking();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-amber-50 dark:bg-stone-950">
      {/* Art Deco geometric pattern overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="voice-deco" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M30 0 L60 30 L30 60 L0 30 Z"
              fill="none"
              stroke="currentColor"
              className="text-amber-700 dark:text-amber-400"
              strokeWidth="0.5"
            />
            <circle
              cx="30"
              cy="30"
              r="8"
              fill="none"
              stroke="currentColor"
              className="text-amber-700 dark:text-amber-400"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#voice-deco)" />
        </svg>
      </div>

      {/* Radial amber glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Hero header */}
        <header className="text-center mb-12">
          <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-3">
            Voice Assistant
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-amber-50 mb-5">
            Speak with Wanderlust
          </h1>
          {/* Diamond divider */}
          <div className="flex items-center justify-center gap-2 mb-6" aria-hidden="true">
            <div className="h-px w-12 md:w-20 bg-amber-500/50" />
            <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
            <div className="w-2.5 h-2.5 rotate-45 border border-amber-500" />
            <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
            <div className="h-px w-12 md:w-20 bg-amber-500/50" />
          </div>
          <p className="text-stone-600 dark:text-stone-400 max-w-xl mx-auto leading-relaxed">
            Press and hold the microphone to ask about Central Asian destinations, tours, visas, or
            anything travel-related. Our assistant listens, understands, and replies out loud.
          </p>
        </header>

        {/* Sora orb + status */}
        <div className="flex flex-col items-center gap-6 mb-10">
          <SoraBall state={appState} />
          <p
            className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.25em] text-xs min-h-[20px]"
            role="status"
            aria-live="polite"
          >
            {STATE_LABELS[appState]}
          </p>
        </div>

        {/* Transcript card */}
        {transcript && (
          <div className="relative mx-auto mb-8 max-w-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6">
            <div
              className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-amber-500/60"
              aria-hidden="true"
            />
            <div
              className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-amber-500/60"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-amber-500/60"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-amber-500/60"
              aria-hidden="true"
            />
            <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-2">
              You
            </p>
            <p className="text-stone-800 dark:text-stone-200 leading-relaxed">{transcript}</p>
          </div>
        )}

        {/* Mic button */}
        <div className="flex justify-center mb-8">
          <button
            type="button"
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onMouseLeave={() => {
              if (appState === "recording") stopRecording();
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              startRecording();
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              stopRecording();
            }}
            onClick={handleMicClick}
            aria-label={
              appState === "recording"
                ? "Recording — release to send"
                : appState === "speaking"
                ? "Stop playback"
                : "Press and hold to record"
            }
            className={[
              "w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2",
              "focus-visible:ring-offset-amber-50 dark:focus-visible:ring-offset-stone-950",
              appState === "recording"
                ? "bg-amber-600 border-amber-700 text-white shadow-[0_0_0_12px_rgba(217,119,6,0.18)]"
                : appState === "speaking"
                ? "bg-amber-100 dark:bg-amber-900/40 border-amber-500 text-amber-700 dark:text-amber-300"
                : "bg-white dark:bg-stone-900 border-amber-500/60 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-stone-800",
            ].join(" ")}
          >
            {appState === "speaking" ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="5" y="4" width="5" height="16" rx="1" />
                <rect x="14" y="4" width="5" height="16" rx="1" />
              </svg>
            ) : (
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            )}
          </button>
        </div>

        {/* Response card (dark, like the site's CTA sections) */}
        {response && (
          <div className="relative mx-auto mb-6 max-w-xl border border-amber-500/40 bg-stone-900 dark:bg-black p-6 text-amber-50">
            <div
              className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-amber-500"
              aria-hidden="true"
            />
            <div
              className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-amber-500"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-amber-500"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-amber-500"
              aria-hidden="true"
            />
            <p className="text-amber-400 uppercase tracking-[0.3em] text-xs mb-2">Assistant</p>
            <p className="leading-relaxed">{response}</p>
          </div>
        )}

        {error && (
          <p className="text-center text-red-700 dark:text-red-400 text-sm" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
