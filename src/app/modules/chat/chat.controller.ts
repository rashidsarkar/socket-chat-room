import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import ChatServices from './chat.service';

const createChat = catchAsync(async (req, res) => {
  const { userId, providerId } = req.body;
  const result = await ChatServices.createChatIfNoExists(userId, providerId);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Chat Create successfully',
    data: result,
  });
});
const getMessages = catchAsync(async (req, res) => {
  const { chatId } = req.params;
  const result = await ChatServices.getChatById(chatId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Message get successfully',
    data: result,
  });
});

const getUserChats = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await ChatServices.getUserChats(userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User chats retrieved successfully',
    data: result,
  });
});

const ChatController = { createChat, getMessages, getUserChats };
export default ChatController;
