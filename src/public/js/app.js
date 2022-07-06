const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');

room.hidden = true;

let roomName;

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector('input');
  console.log(input.value);
  socket.emit('new_message', input.value, roomName, () => {
    addMessage(`You: ${input.value}`);
  });
  input.value = '';
}

function showRooms() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName}`;
  const form = room.querySelector('form');
  form.addEventListener('submit', handleMessageSubmit);
}

function handelRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector('input');
  socket.emit('enter_room', input.value, showRooms);
  roomName = input.value;
  input.value = '';
}

function addMessage(message) {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  ul.appendChild(li);
}

form.addEventListener('submit', handelRoomSubmit);
socket.on('welcome', () => {
  addMessage('someone joined!');
});
socket.on('bye', () => {
  addMessage('someone leftㅜㅜ');
});
socket.on('new_message', addMessage);
