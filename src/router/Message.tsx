import { FormEvent, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { RootContext } from '../types/types';
import { createMessage } from '../helpers/fetchAPI';

const Message = () => {
  const { token, contactName, setContactName } =
    useOutletContext<RootContext>();

  const [content, setContent] = useState('');

  function handleSubmit(token: string, receiverName: string, content: string) {
    return async function (event: FormEvent) {
      event.preventDefault();
      const result = await createMessage(token, receiverName, content);
      if (result) {
        setContent('');
        // await getPosts(token);
        // await getUserData(token);
      }
    };
  }

  return (
    <div className='-my-28 mx-auto flex h-screen max-w-6xl items-center justify-center'>
      <form
        onSubmit={handleSubmit(token, contactName, content)}
        className='relative flex w-1/2 flex-col items-center justify-evenly gap-4 rounded-2xl border border-solid border-red-100 bg-slate-50 px-20 py-12 text-xl text-primary shadow-md transition-colors duration-300 ease-in-out dark:border-slate-900 dark:bg-black dark:shadow-slate-900'
      >
        <h1 className='text-4xl'>Send Message</h1>
        <fieldset className='flex w-full flex-col'>
          <label htmlFor='username' className='px-4 py-2'>
            Username
          </label>
          <input
            type='text'
            name='username'
            placeholder='Enter Username'
            value={contactName}
            onChange={event => setContactName(event.target.value)}
            required
            className='rounded-md border border-solid border-slate-300 px-4 py-2 focus:outline-primary'
          />
        </fieldset>
        <fieldset className='relative flex w-full flex-col'>
          <label htmlFor='password' className='px-4 py-2'>
            Content
          </label>
          <textarea
            name='password'
            placeholder='Write your thoughts here...'
            value={content}
            onChange={event => setContent(event.target.value)}
            required
            rows={8}
            className='resize-none rounded-md border border-solid border-slate-300 px-4 py-2 focus:outline-red-500'
          />
        </fieldset>
        <div className='text-center'>
          <button className='mb-2 rounded-lg border-2 border-primary bg-primary px-4 py-2 text-secondary hover:bg-white hover:text-primary'>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Message;
