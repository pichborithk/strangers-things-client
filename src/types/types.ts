import { Dispatch, RefObject, SetStateAction } from 'react';
import { UserData } from './classes';

export type Post = {
  title: string;
  description: string;
  location: string;
  price: string;
  _id: string;
  author: UserInfo;
  comments: { _id: string; fromUser: UserInfo; content: string }[];
  willDeliver: boolean;
  active: boolean;
  isAuthor: boolean;
  updatedAt: string;
  createAt: string;
};

export type UserInfo = {
  username: string;
  _id: string;
};

export type Conversation = {
  withUser: { _id: string; username: string };
  _id: string;
  messages: Message[];
};

export type Message = {
  _id: string;
  fromUser: UserInfo;
  content: string;
};

export type UserAuth = {
  username: string;
  password: string;
};

export type TokenFetch = {
  success: boolean;
  message: string;
  data: { token: string } | null;
};

export type NewPost = {
  title: string;
  description: string;
  price: string;
  location?: string;
  willDeliver: boolean;
};

export type MakeNewPost = {
  success: boolean;
  error: Error | null;
  data: Post | null;
};

export type Error = {
  name: string;
  message: string;
};

export type HomeProps = {
  token: string;
  posts: Post[];
  userData: UserData;
};

export type PostCardProps = {
  post: Post;
  token: string;
};

export type RootContext = {
  token: string;
  posts: Post[];
  userData: UserData;
  setToken: Dispatch<SetStateAction<string>>;
  getPosts: (token: string) => Promise<void>;
  getUserData: (token: string) => Promise<void>;
};

export type ViewPostContext = {
  token: string;
  postId?: string;
  post: Post;
  userData: UserData;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  getPosts: (token: string) => Promise<void>;
  getUserData: (token: string) => Promise<void>;
};

export type PostFromProps = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  price: string;
  setPrice: Dispatch<SetStateAction<string>>;
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  deliverRef: RefObject<HTMLInputElement>;
  willDeliver: boolean;
};

export type NavbarProps = {
  token: string;
  openUser: boolean;
  userData: UserData;
  setOpenUser: Dispatch<SetStateAction<boolean>>;
  setToken: Dispatch<SetStateAction<string>>;
  setUserData: Dispatch<SetStateAction<UserData>>;
};
