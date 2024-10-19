const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

function addMessage(content, className) {
    const message = document.createElement('div');
    message.className = `message ${className}`;
    message.innerText = content;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const message = userInput.value;
    if (!message) return;

    addMessage(message, 'user-message');
    userInput.value = '';

    try {
        const response = await fetch('http://127.0.0.1:8000/chat/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();
        addMessage(data.response, 'bot-message');
    } catch (error) {
        addMessage('Error: Unable to connect to the server.', 'bot-message');
    }
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});