import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { RootContext } from '../types/types';
import { FormEvent, useEffect, useState } from 'react';
import { createMessage } from '../helpers/fetchAPI';

const Conversation = () => {
  const { token, getUserData, userData } = useOutletContext<RootContext>();
  const [content, setContent] = useState('');
  const { withUser } = useParams();
  // const navigate = useNavigate();

  const conversation = userData.conversations.find(
    con => con.withUser.username === withUser
  );

  if (!withUser || !conversation) return <></>;

  function handleSubmit(token: string, receiverName: string, content: string) {
    return async function (event: FormEvent) {
      event.preventDefault();
      const result = await createMessage(token, receiverName, content);
      if (result) {
        setContent('');
        // await getPosts(token);
        await getUserData(token);
      }
    };
  }

  return (
    <div className='mx-auto flex max-w-4xl flex-col gap-2 rounded-md border border-slate-300 bg-white py-4 shadow-full transition-colors duration-300 ease-in-out dark:border-slate-700 dark:bg-black dark:text-secondary'>
      <h1 className='text-center text-4xl text-primary'>
        {conversation.withUser.username[0].toUpperCase() +
          conversation.withUser.username.slice(1).toLowerCase()}
      </h1>
      {conversation.messages.map(msg => (
        <div
          key={msg._id}
          className={`flex w-full items-center gap-2 px-12 py-2 ${
            userData.username === msg.fromUser.username
              ? 'flex-row-reverse'
              : ''
          }`}
        >
          <p className='flex h-8 w-8 items-center justify-center rounded-full bg-primary p-2 text-2xl text-secondary'>
            {msg.fromUser.username[0].toUpperCase()}
          </p>
          <p className='rounded-full bg-slate-400 px-4 font-jura text-xl font-bold dark:bg-slate-700'>
            {msg.content}
          </p>
        </div>
      ))}
      <form
        onSubmit={handleSubmit(token, withUser, content)}
        className='w-full border-slate-200 bg-white px-12 py-2 transition-colors duration-300 ease-in-out dark:border-slate-700 dark:bg-black'
      >
        <fieldset className='flex w-full gap-2'>
          <input
            name='content'
            placeholder='Tell me you thought...'
            value={content}
            onChange={event => setContent(event.target.value)}
            required
            className='flex-1 rounded-full border border-solid border-slate-500 px-4 py-2 focus:outline-primary dark:bg-slate-700'
          />
          {content && (
            <button className='flex h-10 w-10 items-center justify-center rounded-full bg-primary'>
              <i className='fa-solid fa-arrow-up text-2xl text-secondary'></i>
            </button>
          )}
        </fieldset>
      </form>
    </div>
  );
};

export default Conversation;
