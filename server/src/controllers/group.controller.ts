import { Request, Response } from 'express';
import { CreateGroupInput } from '../schemas/group.schema';
import { createGroup, getAllGroups } from '../services/group.service';

export async function createGroupHandler(
  req: Request<{}, {}, CreateGroupInput>,
  res: Response
) {
  const { name, description } = req.body;
  const group = await createGroup(name, description);
  res.send(group).status(201);
}

export async function getAllGroupsHandler(req: Request, res: Response) {
  const groups = await getAllGroups();
  res.send(groups).status(200);
}
