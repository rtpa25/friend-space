import express from 'express';
import config from 'config';
import logger from './utils/logger';
import routes from './routes';
import { connect } from './utils/connect';
import deserializeUser from './middlewares/deserializeUser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import { User } from './socket-interfaces/user.interface';
import { PersonalMessage } from './socket-interfaces/personalMessage.interface';
import { GrpoupMessage } from './socket-interfaces/groupMessage.interface';
import helmet from 'helmet';

const port = config.get<number>('port');

const app = express();

app.set('trust proxy', 1);

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://www.friendspace.site'],
    credentials: true,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false,
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
    origin: config.get<string[]>('origin'),
    credentials: true,
  },
});

io.on('connection', (socket) => {
  socket.removeAllListeners();

  socket.on('setup', (userData: User) => {
    socket.join(userData._id);
    socket.emit('connected');
  });

  //room can be the id of inidividual user or group
  //@description - room can be a userId or a groupId
  socket.on('join chat', (room: string) => {
    socket.join(room);
  });

  //only for private messaging -- rooms are userId
  socket.on('typing', (room: string) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room: string) =>
    socket.in(room).emit('stop typing')
  );

  //on newMessage event, emit to the userId
  socket.on('new message', (newMessageRecieved: PersonalMessage) => {
    if (newMessageRecieved.reciver === newMessageRecieved.sender) return;
    socket
      .in(newMessageRecieved.reciver)
      .emit('message recieved', newMessageRecieved);
  });

  //on newMessage event, emit to the group
  socket.on('new group message', (newGroupMessageRecieved: GrpoupMessage) => {
    socket
      .in(newGroupMessageRecieved.group)
      .emit('group message recieved', newGroupMessageRecieved);
  });

  socket.off('setup', (userData: User) => {
    socket.leave(userData._id);
  });
});
