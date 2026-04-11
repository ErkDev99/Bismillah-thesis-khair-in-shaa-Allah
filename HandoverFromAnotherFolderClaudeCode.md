Here's the exact list. You almost got everything — there are a couple of things you might have missed (env vars, the page route registration, and some cruft you should not copy).

1. Copy the whole voice-actor/ folder
From: Claude code training/voice-actor/

Files to copy:

main.py — local Whisper + gTTS version (simplest, fully self-contained)
whisper_small.py — alt version with Whisper + Coqui TTS + extra /voice-to-voice endpoint
voice_service.py — alt version that calls the Kyrgyz aitil.kg external APIs (this is the one Dockerfile/docker-compose actually runs by default — uvicorn voice_service:app)
whisper_tiny.py — duplicate of main.py, skippable
gtts.py — 4-line smoke-test script, skippable
Dockerfile
requirements.txt
.env — ⚠️ contains TTS_API_URL, ASR_API_URL, TTS_TOKEN, ASR_TOKEN used by voice_service.py. If you want the Kyrgyz-native path to work, you need this file (or recreate those vars in the new project's .env). If you go with main.py (local Whisper + gTTS), you don't need these tokens.
.gitignore
Do NOT copy (trash/cruft):

venv/ — virtualenv, huge, will be recreated by pip install
__pycache__/ — Python bytecode cache
temp_recording.webm, temp_test.m4a, voice.mp3 — leftover test audio files
requirements.txtpip — looks like a typo/duplicate of requirements.txt
.git/ — don't carry over git history from this repo
2. Copy the frontend page
From: archivdin-frontend/src/pages/VoiceChatPage.jsx

Put it in the equivalent src/pages/ folder of your other project.

3. Copy these snippets (not whole files — they need merging)
You should not overwrite the whole file, just copy the relevant blocks so the other Claude knows where to add them:

voiceApi block from archivdin-frontend/src/api/index.js:88-107 — the VOICE_BASE, voiceApi.transcribe, voiceApi.synthesize
Vite proxy rule from archivdin-frontend/vite.config.js:14-17 — the /voice proxy
nginx location block from archivdin-frontend/nginx.conf:19-21 — location /voice/
docker-compose service block from archivdin-deploy/docker-compose.yml:65-73 — the voice-actor service definition
4. Things you might have forgotten
The route registration for VoiceChatPage — wherever your router is defined (probably App.jsx or a router file), there's an entry adding the /voice page to the app's navigation. Grab that too:
Grep "VoiceChatPage" (in c:\Users\erkeb\Documents\Documents\Docs\5 Super senior year\2nd semester khair in shaa Allah\Hackathon 2026 Manas University Khair in shaa Allah\Claude code training\archivdin-frontend\src)
11 lines of output
Yes — archivdin-frontend/src/App.jsx:15 imports it, and App.jsx:52 registers the route:


<Route path="/voice-chat" element={<VoiceChatPage />} />
The other Claude will need to add that (or equivalent) to its own router. Also, VoiceChatPage depends on:

useAuth hook (../hooks/useAuth) — if your other project doesn't have auth, this needs to be stubbed or removed
chatApi.createSession() and a streaming chat endpoint at /api/chat/sessions/:id/message (SSE format) — if your other project's chat API is different, this needs rewiring
Final checklist — copy these:

voice-actor/                          (whole folder, minus venv/__pycache__/temp_*/*.mp3/.git)
archivdin-frontend/src/pages/VoiceChatPage.jsx
And note to the other Claude as snippets to merge:

voiceApi block → its src/api/index.js equivalent
Vite /voice proxy → its vite.config.js
nginx /voice/ location → its nginx.conf
voice-actor service block → its docker-compose.yml
VoiceChatPage import + <Route path="/voice-chat" ... /> → its App.jsx / router
Prompt to paste into the other Claude Code session
I'm adding a voice chat feature to this project. I've copied in a voice-actor/ folder and a VoiceChatPage.jsx from a sibling project. Please integrate them — adjust to this project's conventions rather than rebuilding from scratch.

What was copied:

voice-actor/ — a standalone FastAPI microservice (port 8001) with three variants of the same service:
main.py → local Whisper (openai/whisper-small via HuggingFace transformers) + gTTS(lang="ru") for TTS. Fully self-contained, needs no external tokens. Recommended default.
whisper_small.py → local Whisper + Coqui TTS (English only, tts_models/en/ljspeech/fast_pitch) + a bonus /voice-to-voice endpoint.
voice_service.py → calls external Kyrgyz aitil.kg ASR + TTS APIs. Needs .env with TTS_API_URL, ASR_API_URL, TTS_TOKEN, ASR_TOKEN. Best Kyrgyz quality. This is what the original Dockerfile/docker-compose runs by default (uvicorn voice_service:app).
Pick whichever matches our needs and update the Dockerfile CMD / docker-compose command accordingly.
Endpoints exposed under root_path="/voice":
POST /voice/transcribe-voice — multipart file upload → {"status":"success","data":"<text>"}
POST /voice/generate-voice — JSON {"text":"..."} → audio/mpeg bytes
src/pages/VoiceChatPage.jsx — React page with press-and-hold mic button, 4-state UI (idle/recording/thinking/speaking), animated "Sora ball" visualization, MediaRecorder → audio/webm blob → transcribe → send to chat API → TTS → play. It currently depends on:
useAuth hook from ../hooks/useAuth → adapt to this project's auth (or stub out if not needed)
voiceApi.transcribe(blob) and voiceApi.synthesize(text) from ../api → add these to our api module
chatApi.createSession() and POST /api/chat/sessions/:id/message streaming SSE endpoint → rewire to this project's chat/LLM endpoint. The page consumes SSE lines of the form data: {"type":"token","data":"..."} and concatenates tokens into answer — if our chat endpoint streams differently, update this loop.
Integration steps needed:

Add the voice-actor service to our docker-compose.yml:

voice-actor:
  build:
    context: ./voice-actor
  container_name: <project>-voice
  restart: unless-stopped
  env_file: .env
  ports:
    - "8001:8001"
  command: uvicorn main:app --host 0.0.0.0 --port 8001   # or voice_service:app
Add an nginx proxy rule (if we use nginx): location /voice/ { proxy_pass http://voice-actor:8001/; }
Add a Vite dev-server proxy: '/voice': { target: 'http://voice-actor:8001', rewrite: p => p.replace(/^\/voice/, '') }
Add a voiceApi object to our frontend api module:

const VOICE_BASE = '/voice';
export const voiceApi = {
  transcribe: async (audioBlob) => {
    const fd = new FormData(); fd.append('file', audioBlob, 'recording.webm');
    const res = await fetch(`${VOICE_BASE}/transcribe-voice`, { method: 'POST', body: fd });
    if (!res.ok) throw new Error(`ASR error: ${res.status}`);
    const json = await res.json();
    if (json.status !== 'success') throw new Error('ASR failed');
    const data = json.data;
    if (typeof data === 'string') return data;
    if (data?.text) return data.text;
    return JSON.stringify(data);
  },
  synthesize: async (text) => {
    const res = await fetch(`${VOICE_BASE}/generate-voice`, {   // NOTE: original had a backslash bug, use forward slash
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error(`TTS error: ${res.status}`);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  },
};
Register VoiceChatPage in the router:

import VoiceChatPage from './pages/VoiceChatPage'
<Route path="/voice-chat" element={<VoiceChatPage />} />
Rewire VoiceChatPage.jsx's chat call to our project's chat/LLM endpoint and streaming format. Remove or adapt the useAuth dependency.
If going with voice_service.py, add TTS_API_URL, ASR_API_URL, TTS_TOKEN, ASR_TOKEN to our .env. If going with main.py, no extra env vars are needed.
Language support — important caveats:

Whisper-small handles English and Russian well (auto-detects language). Kyrgyz quality with whisper-small is weak — for native Kyrgyz ASR use the voice_service.py variant which calls asr.aitil.kg.
main.py hardcodes gTTS(lang="ru") → it will only speak Russian regardless of the input language. If we want English/Russian/Kyrgyz TTS output, detect the language from Whisper's result and route: ru/en → gTTS(lang=lang), ky → aitil.kg TTS. Please add this language routing when integrating.
Other fixes to apply:

The requirements.txt uses kyrgyz-normalizer and several libraries with very high version numbers (some look fake like fastapi==0.135.3, certifi==2026.2.25). Clean it up — use realistic pinned versions that actually exist on PyPI, or use loose pins. At minimum we need: fastapi uvicorn python-multipart torch transformers gTTS kyrgyz-normalizer requests python-dotenv pydantic. For the Coqui variant, also TTS.
The original archivdin-frontend/src/api/index.js has a typo: \generate-voice with a backslash. I've already fixed it to /generate-voice above — use the fixed version.
Whisper-small is ~1GB; it downloads on first container start. Consider baking it into the Docker image or mounting a HuggingFace cache volume to avoid re-downloads.
gTTS requires internet access from the container — it calls Google Translate's unofficial TTS endpoint.
After integration, test end-to-end: click-and-hold mic → speak → release → transcript appears → assistant reply streams → audio plays. Report any places where you had to make significant adaptations to match this project's auth/chat/router conventions.

That's everything. You've got the main folder (voice-actor/) and the main page (VoiceChatPage.jsx) on your copy list — the snippets above get merged into existing files by the other Claude, and the prompt tells it exactly what to adapt.