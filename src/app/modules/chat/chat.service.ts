import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';

import Chat from './chat.model';
import { Types } from 'mongoose';

const createChatIfNoExists = async (userId: string, providerId: string) => {
  let chat = await Chat.findOne({
    participants: { $all: [userId, providerId] },
  });
  if (!chat) {
    chat = await Chat.create({ participants: [userId, providerId] });
  }
  return chat;
};

const saveMessage = async (
  chatId: string,
  senderId: Types.ObjectId,
  text: string,
) => {
  const chat = await Chat.findById(chatId);
  if (!chat) throw new AppError(StatusCodes.NOT_FOUND, 'Chat not found');

  const newMessage = {
    sender: senderId,
    text: text.trim(),
  };

  chat.messages.push(newMessage);
  chat.lastMessage = text;
  chat.lastMessageAt = new Date();
  await chat.save();
  return chat;
};

const getChatById = async (chatId: string) => {
  const result = await Chat.findById(chatId);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Chat not found');
  }
  return result;
};

const getUserChats = async (userId: string) => {
  const result = await Chat.find({
    participants: userId,
  });
  return result;
};

const ChatServices = {
  createChatIfNoExists,
  saveMessage,
  getChatById,
  getUserChats,
};
export default ChatServices;
