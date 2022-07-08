import { object, string, TypeOf } from 'zod';

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: 'email is required',
    }).email('invalid email'),
    password: string({
      required_error: 'password is required',
    }),
  }),
});

export type CreateUserInput = TypeOf<typeof createSessionSchema>['body'];
