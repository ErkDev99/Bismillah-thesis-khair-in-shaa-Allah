import os
import uuid
import asyncio
import json
from fastapi import FastAPI, UploadFile, File, WebSocket, WebSocketDisconnect
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from gtts import gTTS
from kyrgyz_normalizer import normalize
import openai
import websockets

load_dotenv()

# ========================
# INIT
# ========================
app = FastAPI(root_path="/voice")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = os.getenv("OPENAI_API_KEY")

# ========================
# TEXT → SPEECH  (OpenAI tts-1 for en/ru — fast; gTTS fallback for ky)
# ========================
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def text_to_speech(text: str, lang: str = "ru", output_file: str = None):
    if not output_file:
        output_file = f"tts_{uuid.uuid4()}.mp3"

    if lang == "ky":
        # OpenAI TTS doesn't support Kyrgyz — use gTTS
        tts = gTTS(text=normalize(text), lang=lang)
        tts.save(output_file)
    else:
        # OpenAI tts-1: low-latency, high quality
        response = client.audio.speech.create(
            model="tts-1",
            voice="nova",
            input=text,
        )
        response.stream_to_file(output_file)

    print(f"✅ TTS ready ({lang}):", output_file)
    return output_file

# ========================
# SPEECH → TEXT  (OpenAI Whisper API — multilingual, ~2s)
# ========================
def speech_to_text(file_path: str):
    with open(file_path, "rb") as f:
        result = client.audio.transcriptions.create(
            model="whisper-1",
            file=f,
        )
    text = result.text
    print("✅ ASR текст:", text)
    return text

# ========================
# REQUEST MODEL
# ========================
class TTSRequest(BaseModel):
    text: str
    lang: str = "ru"  # "en", "ru", or "ky" — frontend auto-detects

# ========================
# /generate-voice
# ========================
@app.post("/generate-voice")
async def generate_voice(data: TTSRequest):
    result = text_to_speech(data.text, lang=data.lang)

    if result:
        with open(result, "rb") as f:
            audio_bytes = f.read()

        return Response(content=audio_bytes, media_type="audio/mpeg")

    return {"status": "error", "message": "Failed to generate speech"}

# ========================
# /transcribe-voice
# ========================
@app.post("/transcribe-voice")
async def transcribe_voice(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"

    with open(temp_path, "wb") as buffer:
        buffer.write(await file.read())

    text = speech_to_text(temp_path)

    if text:
        return {"status": "success", "data": text}

    return {"status": "error", "message": "Failed to transcribe audio"}

# ========================
# OPENAI REALTIME API — WebSocket proxy
# ========================
REALTIME_MODEL = "gpt-4o-realtime-preview-2024-12-17"
REALTIME_URL   = f"wss://api.openai.com/v1/realtime?model={REALTIME_MODEL}"

REALTIME_INSTRUCTIONS = (
    "You are a friendly voice assistant for Wanderlust, a Central Asian travel "
    "company covering Kazakhstan, Kyrgyzstan, and Uzbekistan. Tours cost "
    "$1,299–$2,499. Contact: info@wanderlust.com.\n\n"
    "Reply in 1–2 short sentences. Be warm and natural, as if speaking out loud. "
    "Never use lists, bullet points, or markdown."
)

@app.websocket("/ws/realtime")
async def ws_realtime(ws: WebSocket):
    """Proxy between the browser and OpenAI Realtime API.

    The browser sends/receives JSON events identical to the OpenAI Realtime
    protocol.  This endpoint adds the API key + session config so the key
    never reaches the client.
    """
    await ws.accept()

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        await ws.close(1008, "No OPENAI_API_KEY configured on the server")
        return

    headers = {
        "Authorization": f"Bearer {api_key}",
        "OpenAI-Beta": "realtime=v1",
    }

    try:
        async with websockets.connect(REALTIME_URL, additional_headers=headers) as oai:
            # Configure the session (voice, VAD, transcription, instructions)
            await oai.send(json.dumps({
                "type": "session.update",
                "session": {
                    "instructions": REALTIME_INSTRUCTIONS,
                    "voice": "alloy",
                    "input_audio_format": "pcm16",
                    "output_audio_format": "pcm16",
                    "input_audio_transcription": {"model": "whisper-1"},
                    "turn_detection": {
                        "type": "server_vad",
                        "threshold": 0.5,
                        "prefix_padding_ms": 300,
                        "silence_duration_ms": 800,
                    },
                },
            }))

            # Forward browser → OpenAI
            async def browser_to_openai():
                try:
                    while True:
                        data = await ws.receive_text()
                        await oai.send(data)
                except WebSocketDisconnect:
                    pass

            # Forward OpenAI → browser
            async def openai_to_browser():
                try:
                    async for msg in oai:
                        await ws.send_text(msg if isinstance(msg, str) else msg.decode())
                except Exception:
                    pass

            done, pending = await asyncio.wait(
                [asyncio.create_task(browser_to_openai()),
                 asyncio.create_task(openai_to_browser())],
                return_when=asyncio.FIRST_COMPLETED,
            )
            for task in pending:
                task.cancel()

    except Exception as exc:
        try:
            await ws.close(1011, str(exc)[:120])
        except Exception:
            pass


# ========================
# RUN
# ========================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)
