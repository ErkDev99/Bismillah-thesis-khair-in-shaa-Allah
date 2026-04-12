// src/lib/voiceApi.ts
// Minimal client-side helpers for the voice-actor FastAPI service.
// Both variants (voice_service.py / main.py) expose the same two endpoints:
//   POST /transcribe-voice  (multipart file upload)  -> { status, data }
//   POST /generate-voice    (JSON {text})            -> audio/mpeg bytes
//
// In dev + prod, these are reached via the /voice/* rewrite in next.config.ts,
// which forwards to http://localhost:8001 (the FastAPI process).

const VOICE_BASE = "/voice";

/**
 * Detect the dominant language of a text string.
 * Kyrgyz-specific Unicode chars (ң, ү, ө, ы, і, ә, ґ) → "ky"
 * Any remaining Cyrillic → "ru"
 * Fallback → "en"
 */
function detectLang(text: string): "ky" | "ru" | "en" {
  // Kyrgyz-specific letters not shared with standard Russian
  if (/[ңүөіәґҮӨҢІӘ]/.test(text)) return "ky";
  // Generic Cyrillic block
  if (/[\u0400-\u04FF]/.test(text)) return "ru";
  return "en";
}

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

  /** Send a text string to the TTS endpoint and return an object URL for the audio.
   *  Automatically detects the reply language and tells the backend which gTTS voice to use. */
  synthesize: async (text: string): Promise<string> => {
    const lang = detectLang(text);
    const res = await fetch(`${VOICE_BASE}/generate-voice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, lang }),
    });
    if (!res.ok) throw new Error(`TTS error: ${res.status}`);

    const blob = await res.blob();
    return URL.createObjectURL(new Blob([blob], { type: "audio/mpeg" }));
  },
};
