import {
  MakeNewPost,
  NewPost,
  Post,
  TokenFetch,
  UserAuth,
  UserData,
} from '../types/types';

const BASE_URL = `${import.meta.env.VITE_API_URL}/${
  import.meta.env.VITE_COHORT_NAME
}`;

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
      body: JSON.stringify({ user: { username, password } }),
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
      body: JSON.stringify({ user: { username, password } }),
    });
    const result: TokenFetch = await response.json();
    if (result.error) console.error(result.error.message);
    if (result.success) console.log(result.data?.message);
    return result;
  } catch (error) {
    console.error('Catch Error on FetchTokenLogin', error);
  }
}

export async function fetchAllPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const result = await response.json();
    if (result.error) console.error(result.error.message);
    return result.data.posts;
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
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (result.error) throw result.error;
    return result.data;
  } catch (error) {
    console.error('Catch error on fetchUserData', error);
  }
}

export async function makePost(
  dataObj: NewPost,
  token: string
): Promise<MakeNewPost | void> {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post: dataObj }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deletePost(id: string, token: string): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (result.error) {
      throw result.error;
    } else {
      console.log('Success Delete Post');
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function postMessage(id: string, token: string, content: string) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: { content } }),
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

export async function updatePost(id: string, token: string, dataObj: NewPost) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post: dataObj }),
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
