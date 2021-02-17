const socket = io();
let textarea = document.querySelector('#textarea');
let msg_area = document.querySelector('.message_area');
let msg_element = document.querySelector('.message');

let naam;
do {
    naam = prompt('kripa karka apna pahachaan da ')
} while (!naam);

textarea.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        sendMessage(e.target.value);
        e.target.value = ''
    }
})



const sendMessage = (message) => {
    let msg = {
        user: naam,
        message: message
    }
    appendMessage(msg, 'outgoing')
        //send to server
    socket.emit('message', msg)

}

const appendMessage = (msg, type) => {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');
    let markup = `
    <h4>${msg.user}</h4>
    <p> ${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    msg_area.appendChild(mainDiv);
}

// reciving msg

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
})