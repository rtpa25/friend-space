import { Request, Response } from 'express';
import { CreateMessageInput, GetMessageInput } from '../schemas/message.schema';
import { createMessage, getConversation } from '../services/message.service';
import logger from '../utils/logger';

export async function createMessageHandler(
  req: Request<{}, {}, CreateMessageInput>,
  res: Response
) {
  try {
    const { content, reciver, sender } = req.body;

    const validSenderId = res.locals.user._id;

    if (validSenderId !== sender) {
      throw new Error('You cannot send messages on behalf of other users');
    }
    const message = await createMessage(content, sender, reciver);
    return res.send(message).status(201);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getConversationHandler(
  req: Request<{}, {}, {}, GetMessageInput>,
  res: Response
) {
  const { sender, reciver } = req.query;
  const validSenderId = res.locals.user._id;

  if (validSenderId !== sender && validSenderId !== reciver) {
    throw new Error("you don't have permission to view this conversation");
  }

  const messages = await getConversation(sender, reciver);
  return res.send(messages).status(200);
}
