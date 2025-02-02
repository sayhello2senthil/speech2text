from flask import Flask, request, jsonify
import speech_recognition as sr
from pydub import AudioSegment
from flask_cors import CORS
#CORS(app)

app = Flask(__name__)

@app.route('/transcribe', methods=['POST'])
def transcribe():

    audio_file = request.files['audio']
    audio = AudioSegment.from_file(audio_file)
    audio.export("temp.wav", format="wav")

    recognizer = sr.Recognizer()
    with sr.AudioFile("temp.wav") as source:
        audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)
        print(text)

    return jsonify({'transcription': text})

if __name__ == '__main__':
    app.run(debug=True)
