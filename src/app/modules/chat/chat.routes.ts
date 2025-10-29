import express from 'express';
import chatController from './chat.controller';
import ChatController from './chat.controller';

const router = express.Router();

router.post('/create', ChatController.createChat);
router.get('/user/chats/:userId', ChatController.getUserChats);
router.get('/messages/:chatId', chatController.getMessages);

export const chatRoutes = router;
