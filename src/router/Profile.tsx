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
    <div className='mx-auto flex max-w-6xl flex-col items-center gap-4'>
      <h1 className='text-4xl dark:text-primary'>
        Welcome{' '}
        <span className='text-primary dark:text-secondary'>
          {userData.username}
        </span>
      </h1>
      <div className='flex flex-wrap gap-2'>
        {userData.posts.map(post => {
          if (post.active)
            return (
              <div
                className='flex min-w-fit flex-1 cursor-pointer flex-col justify-between rounded-md border border-slate-200 bg-white px-12 py-8 shadow-full transition-colors duration-300 ease-in-out hover:-translate-y-1  dark:border-slate-700 dark:bg-black dark:text-secondary'
                key={post._id}
                onClick={() => navigate(`/${post._id}`)}
              >
                <h2 className='text-2xl text-primary'>{post.title}</h2>
                <span className='font-jura font-bold text-slate-400'>
                  {post.description}
                </span>
                <p>{post.price}</p>
                <p>{post.comments.length} message(s)</p>
                <p>0 view(s)</p>
              </div>
            );
        })}
      </div>
      <h1 className='text-4xl dark:text-secondary'>All Messages</h1>
      <div className='flex w-full flex-col gap-2'>
        {userData.messages.map(msg => (
          <div
            key={msg._id}
            className='w-full cursor-pointer rounded-md border border-slate-200 bg-white px-12 py-8 shadow-full transition-colors duration-300 ease-in-out hover:-translate-y-1 dark:border-slate-700 dark:bg-black dark:text-secondary'
            onClick={() => navigate(`/${msg.post?._id}`)}
          >
            {msg.fromUser._id === userData._id ? (
              <h2 className='font-jura text-4xl text-primary'>
                To: {msg.post?.author.username}
              </h2>
            ) : (
              <h2 className='font-jura text-4xl text-primary'>
                From: {msg.fromUser.username}
              </h2>
            )}
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <h1 className='text-4xl text-primary'>Deleted Posts</h1>
      <div className='flex flex-wrap gap-2'>
        {userData.posts.map(post => {
          if (!post.active)
            return (
              <div
                key={post._id}
                className='w-full rounded-md border border-gray-300 bg-gray-300 px-12 py-8 shadow transition-colors duration-300 ease-in-out dark:border-slate-700 dark:bg-slate-900 dark:text-secondary'
              >
                <h2 className='text-2xl'>{post.title}</h2>
                <span className='font-jura font-bold text-slate-400'>
                  {post.description}
                </span>
                <p>{post.price}</p>
                <p>{post.comments.length} message(s)</p>
                <p>0 view(s)</p>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default Profile;
