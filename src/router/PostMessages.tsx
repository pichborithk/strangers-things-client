import { FormEvent, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { postMessage } from '../helpers/fetchAPI';
import { ViewPostContext } from '../types/types';

const PostMessages = () => {
  const { token, id, post, messagesList, userData, getUserData } =
    useOutletContext<ViewPostContext>();
  const [message, setMessage] = useState('');

  async function handleSubmitMessage(event: FormEvent) {
    event.preventDefault();
    const result = await postMessage(id!, token, message);
    if (result) {
      setMessage('');
      getUserData(token);
    }
  }

  return (
    <>
      {post.author._id === userData._id && (
        <h2 className='text-2xl dark:text-secondary'>
          {messagesList.length ? 'Messages For You' : 'There Is No Message'}
        </h2>
      )}
      {messagesList &&
        messagesList.map(msg => (
          <div
            key={msg._id}
            className='w-full rounded-md border border-slate-200 bg-white px-12 py-8 shadow-lg transition-colors duration-300 ease-in-out dark:border-slate-700 dark:bg-black dark:text-secondary'
          >
            <h2 className='mb-2 font-jura text-4xl text-primary'>
              From: {msg.fromUser.username}
            </h2>
            <p>{msg.content}</p>
          </div>
        ))}
      {post.author._id !== userData._id && (
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
      )}
    </>
  );
};

export default PostMessages;
