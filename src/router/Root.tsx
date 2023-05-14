import { Outlet } from 'react-router-dom';
import { Navbar } from '../components';
import { useEffect, useState } from 'react';
import { Post } from '../types/types';
import { initialUserData } from '../types/classes';
import { fetchAllPosts } from '../helpers/fetchAPI';
import { fetchUserData } from '../helpers/fetchAPI';

const initialToken: string = localStorage.getItem('TOKEN')
  ? localStorage.getItem('TOKEN')!
  : '';

const Root = () => {
  const [token, setToken] = useState(initialToken);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userData, setUserData] = useState(initialUserData);
  const [contactName, setContactName] = useState('');

  const [openUser, setOpenUser] = useState(false);

  async function getPosts(token: string): Promise<void> {
    const result = await fetchAllPosts(token);
    setPosts(result);
  }
  async function getUserData(token: string): Promise<void> {
    const result = await fetchUserData(token);
    // console.log(result);
    if (result && result._id) {
      setUserData(result);
      return;
    }
    setUserData(initialUserData);
  }

  useEffect(() => {
    if (!token) {
      getPosts('');
      setUserData(initialUserData);
      return;
    } else {
      getUserData(token);
      getPosts(token);
    }
  }, [token]);

  function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }

  return (
    <main onClick={() => setOpenUser(false)} className='min-h-screen py-28'>
      <Navbar
        token={token}
        openUser={openUser}
        setOpenUser={setOpenUser}
        userData={userData}
        setToken={setToken}
        setUserData={setUserData}
      />
      <Outlet
        context={{
          token,
          posts,
          userData,
          setToken,
          getPosts,
          getUserData,
          contactName,
          setContactName,
        }}
      />
      <div
        onClick={toggleDarkMode}
        className='fixed bottom-[5%] right-[5%] z-10 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-4xl text-secondary transition-colors duration-500 ease-in-out hover:scale-110 dark:bg-secondary'
      >
        <i
          className={`fa-solid fa-sharp fa-sun absolute opacity-0 transition-all duration-1000 ease-in-out dark:rotate-[720deg]  dark:text-primary dark:opacity-100`}
        ></i>
        <i
          className={`fa-solid fa-moon absolute transition-all duration-1000 ease-in-out dark:rotate-[720deg]  dark:text-primary dark:opacity-0`}
        ></i>
      </div>
    </main>
  );
};

export default Root;
