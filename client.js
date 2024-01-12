const socket = io();

const chatBox = document.getElementById('chat-box');
const usernameInput = document.getElementById('username-input');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

let username = '';

usernameInput.addEventListener('change', () => {
  username = usernameInput.value.trim();
});

sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message !== ''&& username !== '') {
    socket.emit('new user', username);
    socket.emit('chat message', message);
    messageInput.value = '';
  }
});

socket.on('chat message', (message) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
});
