import { object, string, TypeOf } from 'zod';

export const createGroupSchema = object({
  body: object({
    name: string({
      required_error: 'name is required',
    }),
    description: string({
      required_error: 'description is required',
    }),
  }),
});

export type CreateGroupInput = TypeOf<typeof createGroupSchema>['body'];
