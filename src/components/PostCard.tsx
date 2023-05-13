import { Link } from 'react-router-dom';
import { PostCardProps } from '../types/types';

const PostCard = ({ post, token }: PostCardProps) => {
  return (
    <div className='flex justify-between rounded-md border border-slate-200 bg-white px-8 py-4 shadow-lg transition-colors duration-500 ease-in-out hover:shadow-full dark:border-slate-700  dark:bg-black dark:text-secondary dark:hover:shadow-slate-600'>
      <div>
        <h2 className='text-2xl text-primary'>{post.title}</h2>
        <span className='font-jura font-bold text-slate-400'>
          {post.description}
        </span>
        <p>
          By: {post.author.username}{' '}
          {post.isAuthor && (
            <i className='fa-solid fa-circle-check text-checked'></i>
          )}
        </p>
        <p>0 view(s)</p>
      </div>
      <div className='flex flex-col items-end justify-between'>
        <h2 className='text-2xl'>{post.price}</h2>
        <p>{post.location}</p>
        {token && (
          <Link
            to={`/${post._id}`}
            className='w-fit rounded-md border border-primary px-2 py-1 text-primary hover:bg-primary hover:text-secondary'
          >
            View
          </Link>
        )}
      </div>
    </div>
  );
};

export default PostCard;
