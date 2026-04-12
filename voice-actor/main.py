import os
import uuid
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from gtts import gTTS
from kyrgyz_normalizer import normalize
import openai

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
# RUN
# ========================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)
