// Socket.js
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import conf from './conf/conf';

const token = Cookies.get('accessToken'); // get token from cookies

const Socket = io(conf.backendUrl, {
  autoConnect: false,
  withCredentials: true,
  transports: ['websocket'],
});

export default Socket;
