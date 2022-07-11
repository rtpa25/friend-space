import express from 'express';
import config from 'config';
import logger from './utils/logger';
import routes from './routes';
import { connect } from './utils/connect';
import deserializeUser from './middlewares/deserializeUser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';

const port = config.get<number>('port');

const app = express();

app.use(
  cors({
    origin: config.get<string>('origin'),
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(deserializeUser);

const server = app.listen(port, async () => {
  await connect();
  routes(app);
  logger.info(`app running on http://localhost:${port} 🚀`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: config.get<string>('origin'),
    credentials: true,
  },
});

io.on('connection', (socket) => {
  logger.info('a user connected');
  socket.removeAllListeners();

  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log('User Joined Room: ' + room);
  });

  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageRecieved) => {
    if (newMessageRecieved.reciver === newMessageRecieved.sender) return;
    socket
      .in(newMessageRecieved.reciver)
      .emit('message recieved', newMessageRecieved);
  });

  socket.off('setup', (userData) => {
    console.log('USER DISCONNECTED');
    socket.leave(userData._id);
  });
});
