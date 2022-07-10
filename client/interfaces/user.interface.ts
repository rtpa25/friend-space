export interface User {
  _id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  friends: string[];
  invites: string[];
}
