import { Types } from 'mongoose';

interface IMessage {
  sender: Types.ObjectId;
  text: string;
  createdAt?: Date;
}

export interface IChat {
  participants: Types.ObjectId[];
  messages: IMessage[];
  lastMessage: string;
  lastMessageAt: Date;
}
