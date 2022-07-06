import http from 'http';
import SocketIO from 'socket.io';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on('connection', (socket) => {
  // socket에 있는 모든 event 보기
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });
  socket.on('enter_room', (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit('welcome');
  });
});

/*
const wss = new WebSocket.Server({ httpServer });
const sockets = [];

// connection이 생기면 socket을 받는다
wss.on('connection', (socket) => {
  socket['nickname'] = 'Anon';
  sockets.push(socket);
  console.log('Connected to Browser✅');
  // 브러우저의 연결이 끊겼을 때의 listener 등록
  // 익명 함수 사용
  socket.on('close', () => console.log('Disconnected from the Browser❌'));
  // 특정 socket에서 메시지를 받았을 때 실행
  socket.on('message', (msg) => {
    const message = JSON.parse(msg);

    switch (message.type) {
      case 'new_message':
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
      case 'nickname':
        // 받은 nickname을 socket에 넣어준다
        socket['nickname'] = message.payload;
    }
  });
});
*/

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
