import { Request, Response } from 'express';
import {
  CreateGroupMessageInput,
  GetGroupMessageInput,
} from '../schemas/groupMessage.schema';
import {
  createGroupMessage,
  getGroupMessages,
} from '../services/groupMessage.service';
import logger from '../utils/logger';

export async function createGroupMessageHandler(
  req: Request<{}, {}, CreateGroupMessageInput>,
  res: Response
) {
  try {
    const { content, group, senderId, senderName } = req.body;

    const validSenderId = res.locals.user._id;
    const validSenderName = res.locals.user.name;

    if (validSenderId !== senderId) {
      throw new Error('You cannot send messages on behalf of other users');
    }
    if (validSenderName !== senderName) {
      throw new Error('You cannot send messages on behalf of other users');
    }
    const groupMessage = await createGroupMessage(
      content,
      senderId,
      senderName,
      group
    );
    return res.send(groupMessage).status(201);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getGroupMessagesHandler(
  req: Request<{}, {}, {}, GetGroupMessageInput>,
  res: Response
) {
  const { group } = req.query;
  const messages = await getGroupMessages(group);
  return res.send(messages).status(200);
}
