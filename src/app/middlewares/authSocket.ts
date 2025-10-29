import jwt from 'jsonwebtoken';
import config from '../config';

export const socketAuth = (socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const decoded = jwt.verify(token, config.jwt_access_secret as string);
    socket.data.user = decoded;
    next();
  } catch (err) {
    next(new Error('Unauthorized'));
  }
};
