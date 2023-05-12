import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

import { RootContext } from '../types/types';
import { fetchTokenLogin } from '../helpers/fetchAPI';

const SignIn = () => {
  const { token, setToken } = useOutletContext<RootContext>();
  const navigate = useNavigate();

  const [notification, setNotification] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const result = await fetchTokenLogin({ username, password });
      if (result && !result.success) {
        setNotification(result.message);
        return;
      }
      console.log(result!.data);
      setToken(result!.data!.token);
    } catch (error) {
      console.error('Catch handle sign in', error);
    } finally {
      setUsername('');
      setPassword('');
    }
  }

  useEffect(() => {
    if (token) {
      localStorage.setItem('TOKEN', token);
      setNotification('');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    setNotification('');
  }, []);

  return (
    <div className='-my-28 mx-auto flex h-screen max-w-6xl items-center justify-center'>
      <form
        onSubmit={handleSignIn}
        className='relative flex w-1/2 flex-col items-center justify-evenly gap-12 rounded-2xl border border-solid border-red-100 bg-slate-50 px-20 py-12 text-xl text-primary shadow-md transition-colors duration-300 ease-in-out dark:border-slate-900 dark:bg-black dark:shadow-slate-900'
      >
        <h1 className='text-4xl'>Sign In</h1>
        <fieldset className='flex w-full flex-col'>
          <label htmlFor='username' className='px-4 py-2'>
            Username
          </label>
          <input
            type='text'
            name='username'
            placeholder='Enter Username'
            value={username}
            onChange={event => setUsername(event.target.value)}
            required
            className='rounded-md border border-solid border-slate-300 px-4 py-2 focus:outline-primary'
          />
        </fieldset>
        <fieldset className='relative flex w-full flex-col'>
          <label htmlFor='password' className='px-4 py-2'>
            Password
          </label>
          <input
            type={hidePassword ? 'password' : 'text'}
            name='password'
            placeholder='Enter Password'
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
            className='rounded-md border border-solid border-slate-300 px-4 py-2 focus:outline-red-500'
          />
          <i
            className={`fa-solid absolute bottom-3 right-4 text-primary ${
              hidePassword ? 'fa-eye-slash' : 'fa-eye'
            } ${!password && 'hidden'}`}
            onClick={() => setHidePassword(!hidePassword)}
          ></i>
        </fieldset>
        <div className='text-center'>
          <button className='mb-2 rounded-lg border-2 border-primary bg-primary px-4 py-2 text-secondary hover:bg-white hover:text-primary'>
            Sign In
          </button>
          <p>
            Forget{' '}
            <a href='#' className='text-slate-700'>
              Username / Password
            </a>{' '}
            ?
          </p>
          <p>
            Don't have an account?{' '}
            <Link to='/register' className='text-slate-700'>
              Join Us
            </Link>
          </p>
        </div>
        <span className='absolute bottom-4 text-base text-slate-700'>
          {notification}
        </span>
      </form>
    </div>
  );
};

export default SignIn;
