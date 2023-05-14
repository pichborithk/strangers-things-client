import { useNavigate, useOutletContext } from 'react-router-dom';
import { RootContext } from '../types/types';
import { useEffect } from 'react';

const Profile = () => {
  const { token, userData } = useOutletContext<RootContext>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/signin');
      return;
    }
  }, []);

  if (!userData._id) return <></>;

  return (
    <div className='mx-auto max-w-6xl'>
      <h1 className='mb-4 text-center text-4xl dark:text-primary'>
        Welcome{' '}
        <span className='text-primary dark:text-secondary'>
          {userData.username}
        </span>
      </h1>
      <div className='flex gap-4'>
        <div className='flex w-1/2 flex-col items-center gap-4 rounded-md border bg-white p-4 shadow-full  transition-colors duration-300 dark:border-slate-700 dark:bg-black'>
          <h1 className='text-4xl text-primary'>All Posts</h1>
          <div className='flex w-full flex-wrap gap-2'>
            {userData.posts.map(post => {
              if (post.active)
                return (
                  <div
                    className='w-full cursor-pointer rounded-md border border-slate-300 bg-slate-100 px-12 py-8 transition-colors duration-300 ease-in-out hover:-translate-y-1  dark:border-slate-700 dark:bg-black dark:text-secondary'
                    key={post._id}
                    onClick={() => navigate(`/posts/${post._id}`)}
                  >
                    <h2 className='text-2xl text-primary'>{post.title}</h2>
                    <span className='font-jura font-bold text-slate-400'>
                      {post.description}
                    </span>
                    <p>{post.price}</p>
                    <p>{post.comments.length} comment(s)</p>
                    <p>0 view(s)</p>
                  </div>
                );
            })}
          </div>
          <div className='flex w-full flex-wrap gap-2'>
            {userData.posts.map(post => {
              if (!post.active)
                return (
                  <div
                    key={post._id}
                    className='w-full rounded-md border border-gray-300 bg-red-500 px-12 py-8 text-white shadow transition-colors duration-300 ease-in-out dark:border-slate-700 dark:bg-slate-900 dark:text-secondary'
                  >
                    <h2 className='text-2xl'>{post.title}</h2>
                    <span className='font-jura font-bold text-slate-400'>
                      {post.description}
                    </span>
                    <p>{post.price}</p>
                    <p>{post.comments.length} comment(s)</p>
                    <p>0 view(s)</p>
                  </div>
                );
            })}
          </div>
        </div>
        <div className='relative flex w-1/2 flex-col items-center gap-4 rounded-md border bg-white p-4 shadow-full  transition-colors duration-300 dark:border-slate-700 dark:bg-black'>
          <h1 className='text-4xl dark:text-secondary'>Inbox</h1>
          <span
            className='absolute right-4 top-4 cursor-pointer bg-primary p-2 text-secondary hover:scale-105'
            onClick={() => navigate('/newmessage')}
          >
            New message
          </span>
          <div className='flex w-full flex-col gap-2'>
            {userData.conversations.map(conversation => (
              <div
                key={conversation._id}
                className='w-full cursor-pointer rounded-md border border-slate-300 bg-slate-100 px-12 py-8 shadow-full transition-colors duration-300 ease-in-out hover:-translate-y-1 dark:border-slate-700 dark:bg-black dark:text-secondary'
                onClick={() =>
                  navigate(`/conversation/${conversation.withUser.username}`)
                }
              >
                <h2 className='font-jura text-4xl text-primary'>
                  {conversation.withUser.username}
                </h2>
                <p>
                  {
                    conversation.messages[conversation.messages.length - 1]
                      .content
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
