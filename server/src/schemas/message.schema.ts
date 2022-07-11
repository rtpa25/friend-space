import { object, string, TypeOf } from 'zod';

export const createMessageSchema = object({
  body: object({
    content: string({
      required_error: 'contnent is required',
    }),
    sender: string({
      required_error: 'senderId is required',
    }),
    reciver: string({
      required_error: 'reciverId is required',
    }),
  }),
});

export const getMessageSchema = object({
  query: object({
    sender: string({
      required_error: 'senderId is required',
    }),
    reciver: string({
      required_error: 'reciverId is required',
    }),
  }),
});

export type CreateMessageInput = TypeOf<typeof createMessageSchema>['body'];
export type GetMessageInput = TypeOf<typeof getMessageSchema>['query'];
