import { Message, Post } from './types';

export class UserData {
  public username: string = '';
  public _id: string = '';
  public posts: Post[] = [];
  public messages: Message[] = [];
}

export const initialUserData = new UserData();
