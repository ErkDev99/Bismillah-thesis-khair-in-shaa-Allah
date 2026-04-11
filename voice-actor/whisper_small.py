"""
Unified Voice AI Service
-----------------------
- STT: Whisper (Hugging Face)
- TTS: Matcha-like (Coqui TTS)
"""

import os
import uuid
import torch
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
from TTS.api import TTS
from kyrgyz_normalizer import normalize

# ========================
# INIT APP
# ========================
app = FastAPI(root_path="/voice")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========================
# CONFIG
# ========================
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

WHISPER_MODEL = "openai/whisper-small"
TTS_MODEL = "tts_models/en/ljspeech/fast_pitch"  # matcha-like

# ========================
# LOAD MODELS
# ========================
print("🔥 Loading Whisper...")
stt_pipeline = pipeline(
    "automatic-speech-recognition",
    model=WHISPER_MODEL,
    chunk_length_s=30,
    device=0 if DEVICE == "cuda" else -1
)

print("🔥 Loading TTS...")
tts = TTS(model_name=TTS_MODEL).to(DEVICE)

# ========================
# HELPERS
# ========================
def speech_to_text(file_path: str) -> str:
    result = stt_pipeline(file_path)
    return result["text"]


def text_to_speech(text: str) -> str:
    text = normalize(text)
    output_file = f"{uuid.uuid4()}.wav"

    tts.tts_to_file(
        text=text,
        file_path=output_file
    )

    return output_file


# ========================
# REQUEST MODEL
# ========================
class TTSRequest(BaseModel):
    text: str


# ========================
# ROUTES
# ========================

@app.get("/")
def root():
    return {"status": "ok", "service": "Voice AI (Whisper + Matcha)"}


# 🎤 Speech → Text
@app.post("/transcribe-voice")
async def transcribe_voice(file: UploadFile = File(...)):
    temp_path = f"temp_{uuid.uuid4()}.mp3"

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    text = speech_to_text(temp_path)

    os.remove(temp_path)

    return {
        "status": "success",
        "text": text
    }


# 🔊 Text → Speech
@app.post("/generate-voice")
async def generate_voice(data: TTSRequest):
    file_path = text_to_speech(data.text)

    with open(file_path, "rb") as f:
        audio = f.read()

    os.remove(file_path)

    return Response(
        content=audio,
        media_type="audio/wav",
        headers={"Content-Disposition": "attachment; filename=voice.wav"}
    )


# 🔄 Voice → Voice (полный пайплайн 🔥)
@app.post("/voice-to-voice")
async def voice_to_voice(file: UploadFile = File(...)):
    temp_path = f"temp_{uuid.uuid4()}.mp3"

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    # STT
    text = speech_to_text(temp_path)

    # TTS
    output_file = text_to_speech(text)

    os.remove(temp_path)

    with open(output_file, "rb") as f:
        audio = f.read()

    os.remove(output_file)

    return Response(content=audio, media_type="audio/wav")


# ========================
# RUN
# ========================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)