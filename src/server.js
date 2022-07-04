import http from 'http';
import WebSocket from 'ws';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// 같은 서버에서 http, webSocket 둘 다 작동시킴
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// connection이 생기면 socket을 받는다
wss.on('connection', (socket) => {
  console.log('Connected to Browser✅');
  // 브러우저의 연결이 끊겼을 때의 listener 등록
  // 익명 함수 사용
  socket.on('close', () => console.log('Disconnected from the Browser❌'));
  // 특정 socket에서 메시지를 받았을 때 실행
  socket.on('message', (message) => {
    console.log(message.toString('utf8'));
  });
  // frontend로 메세지 전송
  socket.send('hello');
});

server.listen(3000, handleListen);
