import GroupMessageModel from '../models/groupMessage.model';

export async function createGroupMessage(
  content: string,
  sender: string,
  group: string
) {
  const groupMessage = await GroupMessageModel.create({
    content,
    sender,
    group,
  });
  return groupMessage.toJSON();
}

export async function getGroupMessages(group: string) {
  const groupMessages = await GroupMessageModel.find({ group });
  return groupMessages.map((groupMessage) => groupMessage.toJSON());
}
