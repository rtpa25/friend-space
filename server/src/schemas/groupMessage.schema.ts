import { object, string, TypeOf } from 'zod';

export const createGroupMessageSchema = object({
  body: object({
    content: string({
      required_error: 'contnent is required',
    }),
    sender: string({
      required_error: 'senderId is required',
    }),
    group: string({
      required_error: 'groupId is required',
    }),
  }),
});

export const getGroupMessageSchema = object({
  query: object({
    group: string({
      required_error: 'groupId is required',
    }),
  }),
});

export type CreateGroupMessageInput = TypeOf<
  typeof createGroupMessageSchema
>['body'];
export type GetGroupMessageInput = TypeOf<
  typeof getGroupMessageSchema
>['query'];
