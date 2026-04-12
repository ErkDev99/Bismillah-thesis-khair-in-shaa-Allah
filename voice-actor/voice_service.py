import requests
import os
import uuid
from dotenv import load_dotenv
from kyrgyz_normalizer import normalize
from gtts import gTTS
from fastapi.responses import Response
from fastapi import FastAPI
load_dotenv()
app = FastAPI()  # Add this line
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
# ========================
# CONFIG
# ========================
TTS_API_URL = os.getenv("TTS_API_URL")
ASR_API_URL = os.getenv("ASR_API_URL")

TTS_TOKEN = os.getenv("TTS_TOKEN")
ASR_TOKEN = os.getenv("ASR_TOKEN")


# ========================
# TEXT → SPEECH (Kyrgyz via aitil.kg)
# ========================
def text_to_speech_aitil(text: str, output_file: str = "voice.mp3"):
    text = normalize(text)
    headers = {
        "Authorization": f"Bearer {TTS_TOKEN}",
        "Content-Type": "application/json",
        "Origin": "https://tts.aitil.kg",
        "Referer": "https://tts.aitil.kg/",
        "User-Agent": "Mozilla/5.0"
    }

    payload = {
        "text": text,
        "speaker_id": "2"
    }

    response = requests.post(TTS_API_URL, json=payload, headers=headers)

    if response.ok:
        with open(output_file, "wb") as f:
            f.write(response.content)
        print(f"✅ TTS ready (aitil.kg ky):", output_file)
        return output_file
    else:
        print("❌ TTS aitil.kg error:", response.status_code, response.text)
        return None


# ========================
# TEXT → SPEECH (en/ru fallback via Google gTTS)
# ========================
def text_to_speech_gtts(text: str, lang: str = "en", output_file: str = None):
    if not output_file:
        output_file = f"tts_{uuid.uuid4()}.mp3"

    tts = gTTS(text=text, lang=lang)
    tts.save(output_file)

    print(f"✅ TTS ready (gTTS {lang}):", output_file)
    return output_file


# ========================
# SPEECH → TEXT
# ========================
def speech_to_text(file_path: str):
    headers = {
        "x-api-token": ASR_TOKEN,
        "Origin": "https://asr.aitil.kg",
        "Referer": "https://asr.aitil.kg/"
    }

    with open(file_path, "rb") as f:
        files = {
            "file": (file_path, f, "audio/mpeg")
        }

        response = requests.post(ASR_API_URL, headers=headers, files=files)

    if response.ok:
        data = response.json()
        print("✅ ASR текст:", data)
        return data
    else:
        print("❌ ASR ошибка:", response.status_code, response.text)
        return None

from pydantic import BaseModel

class TTSRequest(BaseModel):
    text: str
    lang: str = "ky"  # "en", "ru", or "ky" — frontend auto-detects

@app.post("/generate-voice")
async def generate_voice(data: TTSRequest):
    if data.lang == "ky":
        result = text_to_speech_aitil(data.text)
    else:
        result = text_to_speech_gtts(data.text, lang=data.lang)
    
    if result:
        with open(result, "rb") as f:
            audio_bytes = f.read()
        return Response(content=audio_bytes, media_type="audio/mpeg")
    return {"status": "error", "message": "Failed to generate speech"}
from fastapi import UploadFile, File

@app.post("/transcribe-voice")
async def transcribe_voice(file: UploadFile = File(...)):
    # Save the uploaded file temporarily
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        buffer.write(await file.read())
    
    # Send it to the ASR function your teammate wrote
    result = speech_to_text(temp_path)
    
    # Optional: remove the temp file after processing
    # os.remove(temp_path)
    
    if result:
        return {"status": "success", "data": result}
    return {"status": "error", "message": "Failed to transcribe audio"}
# ========================
# Replace the very last 5 lines of your file with this:
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)