import { FormEvent, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { deleteComment, createComment } from '../helpers/fetchAPI';
import { ViewPostContext } from '../types/types';

const PostComments = () => {
  const { token, postId, post, getUserData, userData, getPosts } =
    useOutletContext<ViewPostContext>();
  const [comment, setComment] = useState('');

  // async function handleSubmitComment(event: FormEvent) {
  //   event.preventDefault();
  //   const result = await createComment(id!, token, comment);
  //   if (result) {
  //     setComment('');
  //     await getPosts(token);
  //     await getUserData(token);
  //   }
  // }

  function handleSubmitComment(id: string, token: string, comment: string) {
    return async function (event: FormEvent) {
      event.preventDefault();
      const result = await createComment(id, token, comment);
      if (result) {
        setComment('');
        await getPosts(token);
        await getUserData(token);
      }
    };
  }

  function handleDeleteComment(
    postId: string,
    token: string,
    commentId: string
  ) {
    return async function () {
      const result = await deleteComment(postId, token, commentId);
      if (result) {
        setComment('');
        await getPosts(token);
        await getUserData(token);
      }
    };
  }

  return (
    <div className='flex w-full flex-col gap-4 rounded-md border border-slate-200 bg-white py-6 shadow-lg transition-colors duration-300 ease-in-out dark:border-slate-700 dark:bg-black dark:text-secondary'>
      <h2 className='text-center text-2xl dark:text-secondary'>Comments</h2>
      {post.comments &&
        post.comments.map(cmt => (
          <div key={cmt._id} className='flex gap-2 px-12'>
            <p className='flex h-12 w-12 items-center justify-center rounded-full bg-primary p-2 text-4xl text-secondary'>
              {cmt.fromUser.username[0].toUpperCase()}
            </p>
            <div className='flex flex-1 items-center rounded-md bg-slate-300 px-4 py-2 dark:bg-slate-700'>
              <div className='flex-1'>
                <p>
                  {cmt.fromUser.username[0].toUpperCase() +
                    cmt.fromUser.username.slice(1)}{' '}
                  {cmt.fromUser._id === userData._id && (
                    <i className='fa-solid fa-circle-check text-checked'></i>
                  )}
                </p>
                <p className='font-jura font-bold'>{cmt.content}</p>
              </div>
              {userData._id === cmt.fromUser._id && (
                <i
                  className='fa-solid fa-trash cursor-pointer text-xl text-red-700'
                  onClick={handleDeleteComment(postId!, token, cmt._id)}
                ></i>
              )}
            </div>
          </div>
        ))}
      <form
        onSubmit={handleSubmitComment(postId!, token, comment)}
        className='px-12'
      >
        <fieldset className='flex w-full gap-2'>
          <input
            name='comment'
            placeholder='Tell me you thought...'
            value={comment}
            onChange={event => setComment(event.target.value)}
            required
            className='flex-1 rounded-full border border-solid border-slate-500 px-4 py-2 focus:outline-primary dark:bg-slate-700'
          />
          {comment && (
            <button>
              <i className='fa-sharp fa-solid fa-share fa-rotate-180 text-2xl text-primary'></i>
            </button>
          )}
        </fieldset>
      </form>
    </div>
  );
};

export default PostComments;
