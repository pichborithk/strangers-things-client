import { UserData } from '../types/classes';
import {
  MakeNewPost,
  NewPost,
  Post,
  TokenFetch,
  UserAuth,
} from '../types/types';

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export async function registerUser({
  username,
  password,
}: UserAuth): Promise<TokenFetch | void> {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Catch register', error);
  }
}

export async function fetchTokenLogin({
  username,
  password,
}: UserAuth): Promise<TokenFetch | void> {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (!result.success) {
      console.error(result.message);
    }
    return result;
  } catch (error) {
    console.error('Catch Error on FetchTokenLogin', error);
  }
}

export async function fetchAllPosts(token: string = ''): Promise<Post[]> {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    const result = await response.json();
    if (!result.success) console.error(result.message);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchUserData(token: string): Promise<UserData | void> {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    const result = await response.json();
    if (!result.success) throw result.error;
    return result.data;
  } catch (error) {
    console.error('Catch error on fetchUserData', error);
  }
}

export async function createPost(
  dataObj: NewPost,
  token: string
): Promise<MakeNewPost | void> {
  try {
    const response = await fetch(`${BASE_URL}/posts/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(dataObj),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updatePost(id: string, token: string, dataObj: NewPost) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(dataObj),
    });
    const result = await response.json();
    if (!result.success) {
      throw result.error;
    } else {
      console.log(result.data);
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deletePost(id: string, token: string): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    const result = await response.json();
    if (!result.success) {
      throw result.message;
    } else {
      console.log('Success Delete Post');
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function createComment(
  id: string,
  token: string,
  content: string
) {
  try {
    const response = await fetch(`${BASE_URL}/comments/create/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ content }),
    });
    const result = await response.json();
    if (result.error) {
      throw result.error;
    } else {
      console.log(result.data);
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteComment(
  postId: string,
  token: string,
  commentId: string
) {
  try {
    const response = await fetch(`${BASE_URL}/comments/delete/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ commentId }),
    });
    const result = await response.json();
    if (!result.success) {
      throw result.message;
    } else {
      console.log('Success Delete Comment');
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function createMessage(
  token: string,
  receiverName: string,
  content: string
) {
  try {
    const response = await fetch(`${BASE_URL}/messages/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ receiverName, content }),
    });
    const result = await response.json();
    if (!result.success) {
      throw result.error;
    } else {
      console.log(result.data);
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
