// src/app/voice-chat/page.tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./sora.module.css";

type AppState = "idle" | "connecting" | "listening" | "recording" | "thinking" | "speaking";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const STATE_LABELS: Record<AppState, string> = {
  idle: "Press Start to begin",
  connecting: "Connecting\u2026",
  listening: "Listening\u2026",
  recording: "Hearing you\u2026",
  thinking: "Thinking\u2026",
  speaking: "Speaking\u2026",
};

// Voice-actor FastAPI runs on port 8001 — WebSocket connects directly
// (Next.js HTTP rewrites don't reliably proxy WebSocket upgrades)
const WS_URL =
  typeof window !== "undefined"
    ? `ws://${window.location.hostname}:8001/ws/realtime`
    : "";

// ── Audio helpers ────────────────────────────────────────────────────────────

function float32ToPcm16Base64(float32: Float32Array): string {
  const pcm16 = new Int16Array(float32.length);
  for (let i = 0; i < float32.length; i++) {
    const s = Math.max(-1, Math.min(1, float32[i]));
    pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  const bytes = new Uint8Array(pcm16.buffer);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

function base64Pcm16ToFloat32(b64: string): Float32Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const int16 = new Int16Array(bytes.buffer);
  const float32 = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 0x8000;
  return float32;
}

// ── Animated orb (reuses sora.module.css) ────────────────────────────────────

function SoraBall({ state }: { state: AppState }) {
  const active = state !== "idle" && state !== "connecting";
  const thinking = state === "thinking" || state === "connecting";

  const ballClass =
    state === "recording"
      ? styles.ballRecording
      : state === "thinking" || state === "connecting"
        ? styles.ballThinking
        : state === "speaking"
          ? styles.ballSpeaking
          : styles.ballIdle;

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div
        className={[
          styles.ring,
          styles.ring2,
          active ? styles.ringActive : "",
          thinking ? styles.ringThinking : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />
      <div
        className={[
          styles.ring,
          styles.ring1,
          active ? styles.ringActive : "",
          thinking
            ? `${styles.ringThinking} ${styles.ringThinkingReverse}`
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />
      <div className={`${styles.ball} ${ballClass}`} />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function VoiceChatPage() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState("");

  // Refs that need to survive across renders / callbacks
  const stateRef = useRef<AppState>("idle");
  const wsRef = useRef<WebSocket | null>(null);
  const captureCtxRef = useRef<AudioContext | null>(null);
  const playbackCtxRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const playbackTimeRef = useRef(0);
  const scheduledRef = useRef<AudioBufferSourceNode[]>([]);
  const assistantIdRef = useRef<number | null>(null);
  const assistantTextRef = useRef("");
  const logContainerRef = useRef<HTMLDivElement>(null);

  const transition = useCallback((next: AppState) => {
    stateRef.current = next;
    setAppState(next);
  }, []);

  // Auto-scroll conversation log
  useEffect(() => {
    const c = logContainerRef.current;
    if (c) c.scrollTop = c.scrollHeight;
  }, [messages]);

  // ── Playback helpers ────────────────────────────────────────────────────────

  const stopPlayback = useCallback(() => {
    for (const s of scheduledRef.current) {
      try { s.stop(); } catch { /* already stopped */ }
    }
    scheduledRef.current = [];
    playbackTimeRef.current = 0;
  }, []);

  const playChunk = useCallback((b64: string) => {
    const ctx = playbackCtxRef.current;
    if (!ctx || ctx.state === "closed") return;

    const samples = base64Pcm16ToFloat32(b64);
    if (samples.length === 0) return;

    const buf = ctx.createBuffer(1, samples.length, 24000);
    buf.getChannelData(0).set(samples);

    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);

    const now = ctx.currentTime;
    if (playbackTimeRef.current < now) playbackTimeRef.current = now;
    src.start(playbackTimeRef.current);
    playbackTimeRef.current += buf.duration;

    scheduledRef.current.push(src);
    src.onended = () => {
      scheduledRef.current = scheduledRef.current.filter((s) => s !== src);
    };
  }, []);

  // ── Handle messages from OpenAI (proxied via FastAPI) ───────────────────────

  const handleWsMessage = useCallback(
    (ev: MessageEvent) => {
      let data: Record<string, unknown>;
      try {
        data = JSON.parse(ev.data as string);
      } catch {
        return;
      }

      switch (data.type) {
        case "session.created":
        case "session.updated":
          if (stateRef.current === "connecting") transition("listening");
          break;

        case "input_audio_buffer.speech_started":
          // User interrupted — stop assistant playback
          stopPlayback();
          if (assistantIdRef.current) {
            assistantIdRef.current = null;
            assistantTextRef.current = "";
          }
          transition("recording");
          break;

        case "input_audio_buffer.speech_stopped":
          transition("thinking");
          break;

        case "conversation.item.input_audio_transcription.completed": {
          const transcript = (data.transcript as string | undefined)?.trim();
          if (transcript) {
            setMessages((prev) => [
              ...prev,
              { id: Date.now(), role: "user", content: transcript },
            ]);
          }
          break;
        }

        case "response.audio.delta":
          if (stateRef.current !== "speaking") transition("speaking");
          if (data.delta) playChunk(data.delta as string);
          break;

        case "response.audio_transcript.delta": {
          const delta = (data.delta as string) || "";
          assistantTextRef.current += delta;

          if (!assistantIdRef.current) {
            const id = Date.now();
            assistantIdRef.current = id;
            setMessages((prev) => [
              ...prev,
              { id, role: "assistant", content: assistantTextRef.current },
            ]);
          } else {
            const id = assistantIdRef.current;
            const text = assistantTextRef.current;
            setMessages((prev) =>
              prev.map((m) => (m.id === id ? { ...m, content: text } : m))
            );
          }
          break;
        }

        case "response.done": {
          assistantIdRef.current = null;
          assistantTextRef.current = "";

          // Wait for queued audio to finish, then go back to listening
          const ctx = playbackCtxRef.current;
          if (ctx && playbackTimeRef.current > ctx.currentTime) {
            const delay =
              (playbackTimeRef.current - ctx.currentTime) * 1000 + 150;
            setTimeout(() => {
              if (stateRef.current === "speaking") transition("listening");
            }, delay);
          } else {
            transition("listening");
          }
          break;
        }

        case "error": {
          const errObj = data.error as { message?: string } | undefined;
          setError(errObj?.message || "Realtime API error");
          break;
        }
      }
    },
    [transition, stopPlayback, playChunk]
  );

  // ── Start conversation ──────────────────────────────────────────────────────

  const startConversation = async () => {
    setError("");
    setMessages([]);
    assistantIdRef.current = null;
    assistantTextRef.current = "";
    transition("connecting");

    try {
      // 1. Get mic access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;

      // 2. AudioContexts — 24 kHz to match OpenAI Realtime PCM16 format
      const captureCtx = new AudioContext({ sampleRate: 24000 });
      captureCtxRef.current = captureCtx;

      const playbackCtx = new AudioContext({ sampleRate: 24000 });
      playbackCtxRef.current = playbackCtx;

      // 3. Open WebSocket to the FastAPI proxy
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        // Start streaming mic PCM16 to OpenAI via the proxy
        const source = captureCtx.createMediaStreamSource(stream);
        const processor = captureCtx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;

        processor.onaudioprocess = (e) => {
          if (ws.readyState !== WebSocket.OPEN) return;
          const input = e.inputBuffer.getChannelData(0);
          ws.send(
            JSON.stringify({
              type: "input_audio_buffer.append",
              audio: float32ToPcm16Base64(input),
            })
          );
        };

        // Connect through a silent gain node so the processor fires
        // but doesn't route mic audio back to speakers
        const silencer = captureCtx.createGain();
        silencer.gain.value = 0;
        source.connect(processor);
        processor.connect(silencer);
        silencer.connect(captureCtx.destination);
      };

      ws.onmessage = handleWsMessage;

      ws.onerror = () => {
        setError(
          "WebSocket error. Is the voice service running on port 8001?"
        );
        transition("idle");
      };

      ws.onclose = (e) => {
        if (stateRef.current !== "idle") {
          if (e.reason) setError(e.reason);
          transition("idle");
        }
      };
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to start conversation"
      );
      transition("idle");
    }
  };

  // ── End conversation ────────────────────────────────────────────────────────

  const endConversation = useCallback(() => {
    stopPlayback();

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (captureCtxRef.current) {
      captureCtxRef.current.close();
      captureCtxRef.current = null;
    }
    if (playbackCtxRef.current) {
      playbackCtxRef.current.close();
      playbackCtxRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    assistantIdRef.current = null;
    assistantTextRef.current = "";
    transition("idle");
  }, [stopPlayback, transition]);

  // Cleanup on unmount
  useEffect(() => () => endConversation(), [endConversation]);

  // ── Render ──────────────────────────────────────────────────────────────────

  const inConversation = appState !== "idle";

  const renderMessage = (msg: ChatMessage) => (
    <div
      key={msg.id}
      className={
        msg.role === "user"
          ? "relative border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-3"
          : "relative border border-amber-500/40 bg-stone-900 dark:bg-black p-3 text-amber-50"
      }
    >
      <div
        className={`absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 ${msg.role === "user" ? "border-amber-500/60" : "border-amber-500"}`}
        aria-hidden="true"
      />
      <div
        className={`absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 ${msg.role === "user" ? "border-amber-500/60" : "border-amber-500"}`}
        aria-hidden="true"
      />
      <div
        className={`absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 ${msg.role === "user" ? "border-amber-500/60" : "border-amber-500"}`}
        aria-hidden="true"
      />
      <div
        className={`absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 ${msg.role === "user" ? "border-amber-500/60" : "border-amber-500"}`}
        aria-hidden="true"
      />
      <p
        className={`uppercase tracking-[0.3em] text-xs mb-1 ${msg.role === "user" ? "text-amber-700 dark:text-amber-400" : "text-amber-400"}`}
      >
        {msg.role === "user" ? "You" : "Assistant"}
      </p>
      <p
        className={`text-sm leading-relaxed ${msg.role === "user" ? "text-stone-800 dark:text-stone-200" : ""}`}
      >
        {msg.content}
      </p>
    </div>
  );

  return (
    <div
      className={`relative bg-amber-50 dark:bg-stone-950 flex flex-col ${inConversation ? "overflow-hidden" : "overflow-auto"}`}
      style={
        inConversation
          ? { height: "calc(100vh - 4rem)" }
          : { minHeight: "calc(100vh - 4rem)" }
      }
    >
      {/* Art Deco pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        aria-hidden="true"
      >
        <svg width="100%" height="100%">
          <pattern
            id="voice-deco"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
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
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-3xl"
        aria-hidden="true"
      />

      {/* ── IDLE ── */}
      {!inConversation && (
        <div className="relative flex flex-col items-center justify-center flex-1 px-4 gap-4">
          <header className="text-center">
            <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs mb-2">
              Voice Assistant
            </p>
            <h1 className="font-serif text-2xl md:text-3xl text-stone-900 dark:text-amber-50 mb-3">
              Speak with Wanderlust
            </h1>
            <div
              className="flex items-center justify-center gap-2"
              aria-hidden="true"
            >
              <div className="h-px w-10 bg-amber-500/50" />
              <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
              <div className="w-2 h-2 rotate-45 border border-amber-500" />
              <div className="w-1.5 h-1.5 rotate-45 bg-amber-500/60" />
              <div className="h-px w-10 bg-amber-500/50" />
            </div>
          </header>

          <div
            className="relative shrink-0"
            style={{ width: 154, height: 154 }}
          >
            <div
              className="absolute top-1/2 left-1/2"
              style={{
                transform: "translate(-50%, -50%) scale(0.7)",
                transformOrigin: "center",
              }}
            >
              <SoraBall state={appState} />
            </div>
          </div>

          <p
            className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.25em] text-xs min-h-[18px]"
            role="status"
            aria-live="polite"
          >
            {STATE_LABELS[appState]}
          </p>

          <button
            type="button"
            onClick={startConversation}
            className="flex items-center gap-3 px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-medium uppercase tracking-[0.2em] text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-50 dark:focus-visible:ring-offset-stone-950"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
            Start Conversation
          </button>

          <p className="text-stone-500 dark:text-stone-400 text-xs text-center max-w-xs">
            Real-time voice &mdash; just speak naturally.
            <br />
            Powered by OpenAI Realtime API.
          </p>

          {error && (
            <p
              className="text-red-700 dark:text-red-400 text-sm text-center"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      )}

      {/* ── IN CONVERSATION ── */}
      {inConversation && (
        <div className="relative flex flex-col items-center flex-1 overflow-hidden pt-4 px-4">
          {/* Control strip */}
          <div className="flex flex-col items-center gap-2 shrink-0 mb-3">
            <div className="scale-75 origin-top">
              <SoraBall state={appState} />
            </div>
            <p
              className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.25em] text-xs min-h-[18px]"
              role="status"
              aria-live="polite"
            >
              {STATE_LABELS[appState]}
            </p>
            <button
              type="button"
              onClick={endConversation}
              className="flex items-center gap-2 px-6 py-2.5 bg-stone-800 hover:bg-stone-700 text-amber-400 hover:text-amber-300 border border-stone-600 font-medium uppercase tracking-[0.2em] text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-50 dark:focus-visible:ring-offset-stone-950"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="4" y="4" width="16" height="16" rx="2" />
              </svg>
              End Conversation
            </button>
            {error && (
              <p
                className="text-red-700 dark:text-red-400 text-xs text-center"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>

          {/* Scrollable conversation log */}
          {messages.length > 0 && (
            <div className="w-full max-w-xl flex flex-col flex-1 overflow-hidden min-h-0">
              <p className="text-amber-700 dark:text-amber-400 uppercase tracking-[0.3em] text-xs text-center mb-2 shrink-0">
                Conversation
              </p>
              <div
                ref={logContainerRef}
                className="flex-1 overflow-y-auto space-y-3 pr-1 scroll-smooth pb-4"
              >
                {messages.map(renderMessage)}

                {/* Thinking indicator */}
                {appState === "thinking" && (
                  <div className="relative border border-amber-500/40 bg-stone-900 dark:bg-black p-3 text-amber-50">
                    <div
                      className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-amber-500"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-amber-500"
                      aria-hidden="true"
                    />
                    <p className="text-amber-400 uppercase tracking-[0.3em] text-xs mb-1">
                      Assistant
                    </p>
                    <div className="flex gap-1.5">
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
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
