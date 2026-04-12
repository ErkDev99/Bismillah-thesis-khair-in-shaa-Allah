from gtts import gTTS

tts = gTTS("Привет как дела", lang="ru")
tts.save("voice.mp3")