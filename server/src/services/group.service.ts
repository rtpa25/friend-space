import GroupModel from '../models/group.model';

export async function createGroup(name: string, description: string) {
  const group = await GroupModel.create({ name, description });
  return group.toJSON();
}

export async function getAllGroups() {
  const groups = await GroupModel.find();
  return groups.map((group) => group.toJSON());
}
