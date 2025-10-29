import { Server } from 'socket.io';
import http from 'http';
import ChatServices from '../modules/chat/chat.service';
import { socketAuth } from '../middlewares/authSocket';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';

let io: Server;
export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.use(socketAuth);

  io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id, 'user:', socket.data.user?.id);

    socket.on('joinRoom', (chatId) => {
      socket.join(chatId);
      console.log(`user ${socket.data.user?.id} join chat ${chatId}`);
    });

    socket.on('leaveChat', (chatId) => {
      socket.leave(chatId);
      console.log(`user ${socket.data.user?.id} left chat ${chatId}`);
    });

    socket.on('sendMessage', async ({ chatId, text }) => {
      try {
        const senderId = socket.data.user.id;
        const chat = await ChatServices.saveMessage(chatId, senderId, text);
        const lastMessage = chat.messages[chat.messages.length - 1];
        io.to(chatId).emit('chatUpdated', {
          chatId: chatId,
          lastMessage: lastMessage.text,
          lastMessageAt: lastMessage.createdAt,
        });
      } catch (error) {
        socket.emit('messageError', {
          error: 'Faild to send message',
        });
        console.log(error);
      }
    });

    socket.on('typingStart', (chatId) => {
      socket.to(chatId).emit('typingStart', {
        userId: socket.data.user?.id,
        isTyping: true,
      });
    });

    socket.on('typingStop', (chatId) => {
      socket.to(chatId).emit('userTyping', {
        userId: socket.data.user?.id,
        isTyping: false,
      });
    });

    socket.on('disconnect', () => {
      console.log('❌ User disconnected', socket.id);
    });
    return io;
  });
};
export const getIO = () => {
  if (!io) {
    throw new AppError(
      StatusCodes.NOT_ACCEPTABLE,
      'Socket.io not initialized!',
    );
  }
};
