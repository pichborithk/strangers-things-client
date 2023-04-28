import { Link } from 'react-router-dom';

import { useAppDispatch } from '../app/store';
import { setToken } from '../app/tokenSlice';
import { clearUserData } from '../app/userDataSlice';
import logo from "../asset/stranger's things.png";
import { NavbarProps } from '../types/types';

const Navbar = ({ token, openUser, setOpenUser, userData }: NavbarProps) => {
  const dispatch = useAppDispatch();

  function handleSignOut(): void {
    dispatch(setToken(''));
    localStorage.clear();
    dispatch(clearUserData());
  }

  return (
    <header className='absolute top-0 w-full bg-white shadow-md dark:bg-black dark:shadow-slate-800'>
      <section className='mx-auto flex max-w-6xl items-center justify-between p-2'>
        <img src={logo} alt='logo web site' className='max-h-20' />
        <nav className='relative flex items-center gap-6 font-jura text-2xl font-bold text-primary dark:text-secondary'>
          <Link
            to='/'
            className='rounded-lg border-2 border-transparent px-2 py-2 hover:border-primary dark:hover:border-secondary'
          >
            HOME
          </Link>
          {token ? (
            <>
              <Link
                to='/profile'
                className='rounded-lg border-2 border-transparent px-2 py-2 hover:border-primary dark:hover:border-secondary'
              >
                PROFILE
              </Link>
              <p
                onClick={event => {
                  event.stopPropagation();
                  setOpenUser(!openUser);
                }}
                className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary font-gilroy text-3xl text-secondary dark:bg-secondary dark:text-primary'
              >
                {userData.username.slice(0, 1).toUpperCase()}
              </p>
              <Link
                to='/'
                onClick={handleSignOut}
                className={`absolute -bottom-[41px] -right-16 rounded-lg bg-primary px-2 py-2 text-xl text-secondary transition-opacity duration-1000 ease-in-out dark:bg-secondary dark:text-primary  ${
                  openUser
                    ? 'opacity-1 pointer-events-auto'
                    : 'pointer-events-none opacity-0'
                }`}
              >
                SIGN OUT
              </Link>
            </>
          ) : (
            <>
              <Link
                to='/signin'
                className='rounded-lg border-2 border-transparent px-2 py-2 hover:border-primary dark:hover:border-secondary'
              >
                SIGN IN
              </Link>
              <Link
                to='/register'
                className='rounded-lg border-2  bg-primary px-2 py-2 text-white hover:border-primary dark:border-black dark:bg-secondary dark:text-primary dark:hover:border-secondary'
              >
                SIGN UP
              </Link>
            </>
          )}
        </nav>
      </section>
    </header>
  );
};

export default Navbar;
