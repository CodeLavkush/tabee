// Socket.js
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import conf from './conf/conf';

const token = Cookies.get('accessToken'); // get token from cookies

const Socket = io("http://localhost:8080", {
  withCredentials: true,  // send cookies too
  transports: ['websocket'],
  auth: {
    token,  // pass token for server-side validation
  },
});

export default Socket;
