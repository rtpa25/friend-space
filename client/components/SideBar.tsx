import { PowerSettingsNew } from '@material-ui/icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAppSelector } from '../hooks/redux';
import LoadingSpinner from './LoadingSpinner';

const SideBar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen } = useAppSelector((state) => state.chat);

  const router = useRouter();

  const logoutHandler = async () => {
    setIsLoading(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        { withCredentials: true }
      );
      router.push('/auth/login');
    } catch (error: any) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`${
        isOpen ? 'hidden md:flex' : 'w-1/4'
      } bg-slate-900 h-full flex flex-col justify-between md:w-1/12`}>
      <div className='flex flex-col'>
        <button className='bg-violet-600 m-4 rounded-md h-16 text-white ease-out duration-200 hover:bg-violet-900'>
          asd
        </button>
        <button className='bg-violet-600 m-4 rounded-md h-16 text-white ease-out duration-200 hover:bg-violet-900'>
          das
        </button>
        <button className='bg-violet-600 m-4 rounded-md h-16 text-white ease-out duration-200 hover:bg-violet-900'>
          dsa
        </button>
      </div>
      <div className='flex flex-col'>
        <button className='flex justify-center items-center bg-slate-900 m-4 rounded-full h-16 text-green-600 border-green-600 border-solid border-2 duration-300 hover:bg-green-600 hover:border-transparent hover:text-white'>
          add
        </button>
        <button
          className='flex justify-center items-center bg-slate-900 m-4 rounded-full h-16 text-green-600 border-green-600 border-solid border-2 duration-300 hover:bg-green-600 hover:border-transparent hover:text-white'
          onClick={logoutHandler}>
          {isLoading ? <LoadingSpinner /> : <PowerSettingsNew />}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
