import GroupMessageModel from '../models/groupMessage.model';

export async function createGroupMessage(
  content: string,
  senderId: string,
  senderName: string,
  group: string
) {
  const groupMessage = await await GroupMessageModel.create({
    content,
    senderId,
    senderName,
    group,
  });
  return groupMessage.toJSON();
}

export async function getGroupMessages(group: string) {
  const groupMessages = await GroupMessageModel.find({ group });
  return groupMessages.map((groupMessage) => groupMessage.toJSON());
}
