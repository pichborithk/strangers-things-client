import { Conversation, Post } from './types';

export class UserData {
  public username: string = '';
  public _id: string = '';
  public posts: Post[] = [];
  public conversations: Conversation[] = [];
}

export const initialUserData = new UserData();
