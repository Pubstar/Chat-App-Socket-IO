const socket = io();
const send_button = document.getElementById('send-button');
const messagesList = document.getElementById('messagesList');
const input = document.getElementById('inputText');
const messagesDiv = document.querySelector('.messages');
const username = document.getElementById('username');
const userCountText = document.getElementById('userCountText');

const scrollMessages = () => {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

input.addEventListener('keypress', (e) => {
    if (e.key == "Enter") send_button.click();
})

send_button.addEventListener('click', () => {
    if (username.value.length < 1 || input.value.length < 1) return;
    socket.emit('message', { sender: username.value, message: input.value });
    input.value = '';
    input.focus();
})

socket.on('updateUsers', (data) => {
    userCountText.innerText = "Users in chat: " + data;
})

socket.on('message', (data) => {
    let cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.classList.add('mt-3');
    cardEl.classList.add('w-50');
    let cardBodyEl = document.createElement('div');
    cardBodyEl.classList.add('card-body');
    let blockQuote = document.createElement('blockquote');
    blockQuote.classList.add('blockquote');
    blockQuote.classList.add('mb-0');
    let messageEl = document.createElement('p');
    messageEl.innerText = data.message;
    let footerEl = document.createElement('footer');
    footerEl.classList.add('blockquote-footer');
    footerEl.innerText = data.sender;

    if (data.sender == username.value) {
        cardEl.classList.add('setRight');
        cardEl.classList.add('me-3');
        cardEl.classList.add('text-bg-dark')
    }
    blockQuote.append(messageEl, footerEl);
    cardBodyEl.append(blockQuote);
    cardEl.append(cardBodyEl);

    messagesList.append(cardEl);
    scrollMessages();
})