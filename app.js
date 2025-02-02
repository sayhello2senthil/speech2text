const recordButton = document.getElementById('recordButton');
const transcriptionDiv = document.getElementById('transcription');
const testDiv = document.getElementById('testdiv');

let mediaRecorder;

recordButton.addEventListener('click', () => {
    if (!mediaRecorder) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (e) => {
                const audioBlob = e.data;
                const formData = new FormData();
                formData.append('audio', audioBlob);

                fetch('http://127.0.0.1:5000/transcribe', {
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Response data:', data)
                    transcriptionDiv.textContent = data.transcription;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            };
            mediaRecorder.start();
        });
    } else {
        mediaRecorder.stop();
        mediaRecorder = null;
    }
});


let testData = "This is a test paragraph"
testDiv.textContent = testData;
