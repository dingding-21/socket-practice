const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');

room.hidden = true;

let roomName;

function showRooms() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = `Room ${roomName}`;
}

function handelRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector('input');
  console.log(roomName);
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
