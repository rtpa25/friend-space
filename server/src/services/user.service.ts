import { DocumentDefinition, FilterQuery } from 'mongoose';
import { omit } from 'lodash';
import UserModel, { UserDocument } from '../models/user.model';

export async function createUser(
  input: DocumentDefinition<
    Omit<
      UserDocument,
      'createdAt' | 'updatedAt' | 'comparePassword' | 'friends' | 'invites'
    >
  >
) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), 'password');
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), 'password');
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}

export async function addInvite(currentUserId: string, invitedEmail: string) {
  const currentUser = await UserModel.findById(currentUserId);

  if (!currentUser) {
    throw new Error('User not found');
  }

  const invitedUser = await UserModel.findOne({ email: invitedEmail });

  if (!invitedUser) {
    throw new Error('User not found');
  }

  if (!invitedUser.invites.includes(currentUser._id)) {
    invitedUser.invites.push(currentUser._id);
    await invitedUser.save();
  }

  return {
    invitedUser: omit(invitedUser.toJSON(), 'password'),
  };
}

export async function addFriend(currentUserId: string, friendEmail: string) {
  const currentUser = await UserModel.findById(currentUserId);

  if (!currentUser) {
    throw new Error('User not found');
  }

  const friendUser = await UserModel.findOne({ email: friendEmail });

  if (!friendUser) {
    throw new Error('User not found');
  }

  if (currentUser.friends.includes(friendUser._id)) {
    throw new Error('User already a friend');
  }

  if (!currentUser.invites.includes(friendUser._id)) {
    throw new Error('Use not invited');
  }

  currentUser.invites = currentUser.invites.filter(
    (id) => id === friendUser._id
  );

  currentUser.friends.push(friendUser._id);
  friendUser.friends.push(currentUser._id);

  await currentUser.save();
  await friendUser.save();

  return {
    friendUser: omit(friendUser.toJSON(), 'password'),
  };
}
