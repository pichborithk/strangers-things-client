import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { RootContext } from '../types/types';
import { makePost } from '../helpers/fetchAPI';
import { PostForm } from '../components';

const NewPost = () => {
  const navigate = useNavigate();

  const { token, getPosts, getUserData } = useOutletContext<RootContext>();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const deliverRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const dataObj = location
      ? {
          title,
          description,
          price,
          location,
          willDeliver: deliverRef.current!.checked,
        }
      : {
          title,
          description,
          price,
          willDeliver: deliverRef.current!.checked,
        };
    try {
      const result = await makePost(dataObj, token);
      if (result && result.data) {
        await getPosts(token);
        await getUserData(token);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTitle('');
      setDescription('');
      setPrice('');
      setLocation('');
    }
  }

  function handleCancel() {
    setTitle('');
    setDescription('');
    setPrice('');
    setLocation('');
    navigate('/');
  }

  useEffect(() => {
    if (!token) return navigate('/');
  }, [token]);

  return (
    <div className='-my-28 mx-auto flex h-screen max-w-6xl items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='relative flex w-1/2 flex-col items-center justify-evenly gap-8 rounded-2xl border border-solid border-red-100 bg-slate-50 px-20 py-12 text-xl text-slate-700 shadow-md transition-colors duration-500 ease-in-out dark:border-slate-900 dark:bg-black dark:shadow-slate-900'
      >
        <h1 className='text-4xl text-primary'>Add New Post</h1>
        <PostForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          price={price}
          setPrice={setPrice}
          location={location}
          setLocation={setLocation}
          deliverRef={deliverRef}
          willDeliver={false}
        />
        <div className='w-full'>
          <button className='mb-2 w-full rounded-lg border-2 border-primary px-4 py-2 text-primary hover:bg-primary hover:text-secondary'>
            POST
          </button>
          <button
            type='button'
            onClick={() => handleCancel()}
            className='mb-2 w-full rounded-lg border-2 border-black px-4 py-2 text-black hover:bg-black hover:text-secondary dark:border-secondary dark:text-secondary dark:hover:bg-secondary dark:hover:text-black'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
