import { ArrowBackIosOutlined, Send } from '@material-ui/icons';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleChatWindow } from '../store/slices/chatWindowData.slice';

const ChatPage = () => {
  const { isOpen, user } = useAppSelector((state) => state.chat);
  const currentUser = useAppSelector((state) => state.currentUser.user);
  const dispatch = useAppDispatch();

  const [messageText, setMessageText] = useState<string>('');
  return (
    <div
      className={`md:w-8/12 bg-slate-700 w-full ${
        !isOpen && 'hidden'
      } flex flex-col justify-between`}>
      <div className='p-2'>
        <div
          className='cursor-pointer text-green-500 md:hidden'
          onClick={() => {
            dispatch(toggleChatWindow());
          }}>
          <ArrowBackIosOutlined />
        </div>
        <span className='md:m-4 md:text-gray-400 md:block hidden'>
          Choosen Conversation: {user?.name}
        </span>
        <hr className='border-gray-500 m-4' />
        <div className='text-center'>
          <div className='flex m-10 justify-between md:justify-start items-center'>
            <img
              src={`https://ui-avatars.com/api/?background=5865f2&color=fff&name=${user?.name}&font-size=0.3`}
              alt={user?.name}
              className='rounded-full scale-150'
            />
            <h3 className='text-gray-100 text-2xl mr-24 md:ml-10'>
              {user?.name}
            </h3>
          </div>
          <hr className='md:border-gray-500 md:m-4 md:block hidden' />
          <span className='text-green-500'>
            This is the start of the direct messages with {user?.name}
          </span>
        </div>
        <hr className='border-gray-500 m-4 md:hidden' />
      </div>
      <div></div>
      <div className='flex justify-center m-4'>
        <input
          className='w-full h-8 bg-gray-900 text-gray-100 rounded-md p-4'
          type='text'
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <div className='text-green-500 relative right-7'>
          <Send />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
