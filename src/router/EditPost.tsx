import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { ViewPostContext } from '../types/types';
import { updatePost } from '../helpers/fetchAPI';
import { PostForm } from '../components';

const EditPost = () => {
  const navigate = useNavigate();

  const { id, post, token, isEditing, setIsEditing, getPosts, getUserData } =
    useOutletContext<ViewPostContext>();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const deliverRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) return navigate(`/${id}`);

    setTitle(post.title);
    setDescription(post.description);
    setPrice(post.price);
    setLocation(post.location);
  }, []);

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
      : { title, description, price, willDeliver: deliverRef.current!.checked };

    const result = await updatePost(id!, token, dataObj);
    if (result) {
      await getPosts(token);
      await getUserData(token);
      setIsEditing(false);
      navigate(`/${id}`);
    }
  }

  function handleCancel() {
    setIsEditing(false);
    navigate('..');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='relative flex w-2/3 flex-col items-center justify-evenly gap-8 rounded-2xl border border-solid border-red-100 bg-slate-50 px-20 py-12 text-xl text-slate-700 shadow-md transition-colors duration-300 ease-in-out dark:border-slate-900 dark:bg-black dark:shadow-slate-900'
    >
      <h1 className='text-4xl text-primary'>Edit Post</h1>
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
        willDeliver={post.willDeliver}
      />
      <div className='w-full'>
        <button className='mb-2 w-full rounded-lg border-2 border-primary px-4 py-2 text-primary hover:bg-primary hover:text-secondary'>
          SAVE
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
  );
};

export default EditPost;
