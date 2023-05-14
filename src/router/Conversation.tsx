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
    <div className='mx-auto flex max-w-6xl flex-col gap-4'>
      {conversation.messages.map(msg => (
        <div
          key={msg._id}
          className={`w-full cursor-pointer rounded-md border border-slate-300 bg-slate-100 px-12 py-8 shadow-full transition-colors duration-300 ease-in-out hover:-translate-y-1 dark:border-slate-700 dark:bg-black dark:text-secondary
          ${userData.username === msg.fromUser.username ? 'text-right' : ''}`}
        >
          <h2 className='font-jura text-4xl text-primary'>
            {msg.fromUser.username}
          </h2>
          <p>{msg.content}</p>
        </div>
      ))}
      <form
        onSubmit={handleSubmit(token, withUser, content)}
        className='w-full rounded-md border border-slate-200 bg-white px-12 py-8 shadow-lg transition-colors duration-300 ease-in-out dark:border-slate-700 dark:bg-black'
      >
        <h2 className='mb-2 font-jura text-4xl text-primary'>To: {withUser}</h2>
        <fieldset className='flex w-full gap-2'>
          <input
            name='content'
            placeholder='Tell me you thought...'
            value={content}
            onChange={event => setContent(event.target.value)}
            required
            className='flex-1 rounded-md border border-solid border-slate-500 px-4 py-2 focus:outline-primary'
          />
          {content && (
            <button>
              <i className='fa-sharp fa-solid fa-share fa-rotate-180 text-2xl text-primary'></i>
            </button>
          )}
        </fieldset>
      </form>
    </div>
  );
};

export default Conversation;
