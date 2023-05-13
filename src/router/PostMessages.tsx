import { FormEvent, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { deleteComment, postMessage } from '../helpers/fetchAPI';
import { ViewPostContext } from '../types/types';

const PostMessages = () => {
  const { token, id, post, getUserData, userData, getPosts } =
    useOutletContext<ViewPostContext>();
  const [message, setMessage] = useState('');

  async function handleSubmitMessage(event: FormEvent) {
    event.preventDefault();
    const result = await postMessage(id!, token, message);
    if (result) {
      setMessage('');
      await getPosts(token);
      await getUserData(token);
    }
  }

  async function handleDeleteComment(
    postId: string,
    token: string,
    commentId: string
  ) {
    const result = await deleteComment(postId, token, commentId);
    if (result) {
      setMessage('');
      await getPosts(token);
      await getUserData(token);
    }
  }

  return (
    <>
      <h2 className='text-2xl dark:text-secondary'>Comments</h2>
      {post.comments &&
        post.comments.map(cmt => (
          <div
            key={cmt._id}
            className='w-full rounded-md border border-slate-200 bg-white px-12 py-8 shadow-lg transition-colors duration-300 ease-in-out dark:border-slate-700 dark:bg-black dark:text-secondary'
          >
            <h2 className='mb-2 font-jura text-4xl text-primary'>
              From: {cmt.fromUser.username}
            </h2>
            <p>{cmt.content}</p>
            {userData._id === cmt.fromUser._id && (
              <i
                className='fa-solid fa-trash'
                onClick={() => handleDeleteComment(id!, token, cmt._id)}
              ></i>
            )}
          </div>
        ))}
      <form
        onSubmit={handleSubmitMessage}
        className='w-full rounded-md border border-slate-200 bg-white px-12 py-8 shadow-lg transition-colors duration-300 ease-in-out dark:border-slate-700 dark:bg-black'
      >
        <h2 className='mb-2 font-jura text-4xl text-primary'>
          To: {post.author.username}
        </h2>
        <fieldset className='flex w-full gap-2'>
          <input
            name='message'
            placeholder='Send a message'
            value={message}
            onChange={event => setMessage(event.target.value)}
            required
            className='flex-1 rounded-md border border-solid border-slate-500 px-4 py-2 focus:outline-primary'
          />
          {message && (
            <button>
              <i className='fa-sharp fa-solid fa-share fa-rotate-180 text-2xl text-primary'></i>
            </button>
          )}
        </fieldset>
      </form>
    </>
  );
};

export default PostMessages;
