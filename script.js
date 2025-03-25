// Speech Recognition for All Browsers
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Select Elements
const resultBox = document.getElementById("result");
const speakBtn = document.getElementById("speakBtn");
const output = document.getElementById("output");

// Start Voice Recognition
speakBtn.addEventListener("click", () => {
    recognition.start();
});

// Process Speech Input
recognition.onresult = function(event) {
    let transcript = event.results[0][0].transcript.toLowerCase();
    resultBox.value = transcript;

    // Fixing Operations for Multiplication and Division
    let expression = transcript.replace(/multiply/g, "*")
                               .replace(/divided by/g, "/")
                               .replace(/plus/g, "+")
                               .replace(/minus/g, "-");

    try {
        let result = eval(expression);
        output.innerText = `Result: ${result}`;
    } catch (e) {
        output.innerText = "Invalid Calculation!";
    }
};

// Error Handling
recognition.onerror = function(event) {
    output.innerText = "Error: " + event.error;
};
