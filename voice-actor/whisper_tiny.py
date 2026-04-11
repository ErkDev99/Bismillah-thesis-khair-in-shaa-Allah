import os
import uuid
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import torch
from transformers import pipeline
from gtts import gTTS
from kyrgyz_normalizer import normalize

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

# ========================
# LOAD WHISPER
# ========================
device = 0 if torch.cuda.is_available() else -1

asr = pipeline(
    "automatic-speech-recognition",
    model="openai/whisper-small",
    device=device
)

# ========================
# TEXT → SPEECH
# ========================
def text_to_speech(text: str, output_file: str = None):
    text = normalize(text)

    if not output_file:
        output_file = f"tts_{uuid.uuid4()}.mp3"

    tts = gTTS(text=text, lang="ru")
    tts.save(output_file)

    print("✅ TTS готов:", output_file)
    return output_file

# ========================
# SPEECH → TEXT
# ========================
def speech_to_text(file_path: str):
    result = asr(file_path)
    print("✅ ASR текст:", result["text"])
    return result

# ========================
# REQUEST MODEL
# ========================
class TTSRequest(BaseModel):
    text: str

# ========================
# /generate-voice
# ========================
@app.post("/generate-voice")
async def generate_voice(data: TTSRequest):
    normalized_text = normalize(data.text)

    result = text_to_speech(normalized_text)

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

    result = speech_to_text(temp_path)

    if result:
        return {
            "status": "success",
            "data": result["text"]
        }

    return {"status": "error", "message": "Failed to transcribe audio"}

# ========================
# RUN
# ========================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)