import MessageModel from '../models/message.model';

export async function createMessage(
  content: string,
  sender: string,
  reciver: string
) {
  const message = await MessageModel.create({ content, sender, reciver });
  return message.toJSON();
}

export async function getConversation(sender: string, reciver: string) {
  const messages = await MessageModel.find({
    $or: [
      { sender, reciver },
      { sender: reciver, reciver: sender },
    ],
  });
  return messages.map((message) => message.toJSON());
}
