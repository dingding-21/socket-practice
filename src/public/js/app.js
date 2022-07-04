const socket = new WebSocket(`ws://${window.location.host}`);

// 서버를 연결했을 때
socket.addEventListener('open', () => {
  console.log('Connected to Server✅');
});

// 서버로부터 메세지를 받을 때
socket.addEventListener('message', (message) => {
  console.log('Just got this: ', message.data, 'from the server');
});

// 서버로부터 연결이 끊겼을 때
socket.addEventListener('close', () => {
  console.log('Disconnected to Server❌');
});

setTimeout(() => {
  socket.send('hello from the browser!');
}, 10000);
