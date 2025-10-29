import { z } from 'zod';

export const createChatValidation = z.object({
  body: z.object({
    userId: z.string().min(1, 'User ID is required'),
    providerId: z.string().min(1, 'Provider ID is required'),
  }),
});
const sendMessageValidation = z.object({
  body: z.object({
    chatId: z.string().min(1, 'Chat ID is required'),
    text: z.string().min(1, 'Message text is required'),
  }),
});
const ChatValidations = { createChatValidation, sendMessageValidation };
export default ChatValidations;
