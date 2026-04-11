// src/lib/voiceApi.ts
// Minimal client-side helpers for the voice-actor FastAPI service.
// Both variants (voice_service.py / main.py) expose the same two endpoints:
//   POST /transcribe-voice  (multipart file upload)  -> { status, data }
//   POST /generate-voice    (JSON {text})            -> audio/mpeg bytes
//
// In dev + prod, these are reached via the /voice/* rewrite in next.config.ts,
// which forwards to http://localhost:8001 (the FastAPI process).

const VOICE_BASE = "/voice";

export const voiceApi = {
  /** Send a recorded audio blob to the ASR endpoint and return the transcript text. */
  transcribe: async (audioBlob: Blob): Promise<string> => {
    const fd = new FormData();
    fd.append("file", audioBlob, "recording.webm");

    const res = await fetch(`${VOICE_BASE}/transcribe-voice`, {
      method: "POST",
      body: fd,
    });
    if (!res.ok) throw new Error(`ASR error: ${res.status}`);

    const json = (await res.json()) as {
      status: string;
      data?: string | { text?: string } | Record<string, unknown>;
    };
    if (json.status !== "success") throw new Error("ASR failed");

    const data = json.data;
    if (typeof data === "string") return data;
    if (data && typeof data === "object" && "text" in data && typeof data.text === "string") {
      return data.text;
    }
    return JSON.stringify(data ?? "");
  },

  /** Send a text string to the TTS endpoint and return an object URL for the audio. */
  synthesize: async (text: string): Promise<string> => {
    const res = await fetch(`${VOICE_BASE}/generate-voice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error(`TTS error: ${res.status}`);

    const blob = await res.blob();
    return URL.createObjectURL(new Blob([blob], { type: "audio/mpeg" }));
  },
};
