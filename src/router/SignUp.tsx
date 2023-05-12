import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

import logo from '../asset/Resized_svg.svg';
import { registerUser } from '../helpers/fetchAPI';
import { RootContext } from '../types/types';

const SignUp = () => {
  const { token } = useOutletContext<RootContext>();
  const navigate = useNavigate();

  const [notification, setNotification] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  async function handleRegister(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (password !== confirmPassword) {
      setNotification('Password do not match');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    try {
      const result = await registerUser({ username, password });
      if (result && !result.success) {
        setNotification(result.message);
        return;
      }
      setNotification(result!.message);
    } catch (error) {
      console.error('Catch handle register', error);
    } finally {
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    }
  }

  useEffect(() => {
    setNotification('');
    if (token) {
      navigate('/');
    }
  }, []);

  return (
    <div className='-my-28 mx-auto flex h-screen max-w-6xl items-center justify-center'>
      <div className='flex w-full items-center justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-colors duration-300 ease-in-out dark:border-slate-900 dark:bg-black dark:shadow-slate-900'>
        <form
          onSubmit={handleRegister}
          className='relative flex w-1/2 flex-col items-center justify-evenly gap-8 bg-primary px-20 py-12 text-xl text-secondary shadow-md'
        >
          <h1 className='text-4xl'>Create An Account</h1>
          <fieldset className='flex w-full flex-col'>
            <label htmlFor='username' className='px-4 py-2'>
              Username
            </label>
            <input
              autoComplete='off'
              type='text'
              name='username'
              placeholder='Enter Username'
              value={username}
              onChange={event => setUsername(event.target.value)}
              required
              className='rounded-md border border-solid border-secondary px-4 py-2 text-slate-700 focus:outline-primary'
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
              className='rounded-md border border-solid border-secondary px-4 py-2 text-slate-700 focus:outline-primary'
            />
            <i
              className={`fa-solid absolute bottom-3 right-4 text-primary  ${
                hidePassword ? 'fa-eye-slash' : 'fa-eye'
              } ${!(password || confirmPassword) && 'hidden'}`}
              onClick={() => setHidePassword(!hidePassword)}
            ></i>
          </fieldset>
          <fieldset className='relative flex w-full flex-col'>
            <label htmlFor='confirm-password' className='px-4 py-2'>
              Password Confirmation
            </label>
            <input
              type={hidePassword ? 'password' : 'text'}
              name='confirm-password'
              placeholder='Re-enter Password'
              value={confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)}
              required
              className='rounded-md border border-solid border-secondary px-4 py-2 text-slate-700 focus:outline-primary'
            />
            <i
              className={`fa-solid absolute bottom-3 right-4 text-primary  ${
                hidePassword ? 'fa-eye-slash' : 'fa-eye'
              } ${!(password || confirmPassword) && 'hidden'}`}
              onClick={() => setHidePassword(!hidePassword)}
            ></i>
          </fieldset>
          <div className='mt-2 w-full text-center'>
            <button className='mb-2 w-full rounded-lg border-2 border-secondary px-4 py-2 hover:bg-white hover:text-primary'>
              Create Account
            </button>
            <p>
              Already Have An Account?{' '}
              <Link to='/signin' className='underline'>
                Sign in
              </Link>
            </p>
          </div>
          <span className='absolute bottom-4 text-base text-secondary'>
            {notification}
          </span>
        </form>

        <img src={logo} alt='join' className='flex-1' />
      </div>
    </div>
  );
};

export default SignUp;
