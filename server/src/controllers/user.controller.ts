import { Request, Response } from 'express';
import {
  AddFriendSchema,
  AddInviteSchema,
  CreateUserInput,
} from '../schemas/user.schema';
import {
  addInvite,
  createUser,
  addFriend,
  findUser,
} from '../services/user.service';
import logger from '../utils/logger';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getCurrentUser(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const user = await findUser({ _id: userId });
  return res.send(user).status(200);
}

export async function addInviteHandler(
  req: Request<{}, {}, AddInviteSchema>,
  res: Response
) {
  try {
    if (res.locals.user.email === req.body.email) {
      return res.status(409).send('You cannot invite yourself');
    }
    const { invitedUser } = await addInvite(
      res.locals.user._id,
      req.body.email
    );
    return res.status(200).send(invitedUser);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function addFriendHandler(
  req: Request<{}, {}, AddFriendSchema>,
  res: Response
) {
  try {
    if (res.locals.user.email === req.body.email) {
      return res.status(409).send('You cannot be your own friend');
    }

    const { friendUser } = await addFriend(res.locals.user._id, req.body.email);

    return res.status(200).send(friendUser);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
