import { ArrowBackIosOutlined, Send } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Message } from '../interfaces/message.interface';
import { toggleChatWindow } from '../store/slices/chatWindowData.slice';
import { generateRandomString } from '../utils/randomString';
import LoadingSpinner from './LoadingSpinner';

const ChatPage = () => {
  const { isOpen, user } = useAppSelector((state) => state.chat);
  const currentUser = useAppSelector((state) => state.currentUser.user);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [messageText, setMessageText] = useState<string>('');

  useEffect(() => {
    const fetchConversation = async () => {
      if (currentUser && user) {
        setLoading(true);
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/messages?sender=${currentUser._id}&reciver=${user._id}`,
            { withCredentials: true }
          );
          setMessages(res.data);
        } catch (error: any) {
          setError(error.message);
        }
        setLoading(false);
      } else {
        return;
      }
    };
    fetchConversation();
  }, [currentUser, user]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessageHandler = async () => {
    const newMessage: Message = {
      _id: generateRandomString(),
      content: messageText,
      sender: currentUser!._id,
      reciver: user!._id,
      createdAt: Date.now().toString(),
    };
    try {
      setMessages((prevState) => {
        return [...prevState, newMessage];
      });
      setMessageText('');
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/messages`,
        {
          content: messageText,
          sender: currentUser!._id!,
          reciver: user!._id!,
        },
        { withCredentials: true }
      );
    } catch (error: any) {
      setError(error.message);
      setMessages((prevState) => {
        return prevState.filter((message) => message !== newMessage);
      });
    }
    setMessageText('');
  };

  const messageContainer = (
    <div className='overflow-y-auto overflow-x-hidden flex flex-col justify-start h-3/4'>
      {messages.map((message) => {
        return (
          <div
            ref={scrollRef}
            key={message._id}
            className={`${
              message.sender === currentUser?._id
                ? 'bg-slate-900 rounded-br-none self-end'
                : 'bg-green-700 rounded-bl-none'
            } text-white w-fit py-2 px-4 rounded-lg  my-2 mx-4`}>
            {message.content}
          </div>
        );
      })}
    </div>
  );

  const loader = (
    <div className='text-center'>
      <LoadingSpinner />
    </div>
  );

  const errorCase = (
    <div className='text-red-500 text-center'>
      <span>{error}</span>
    </div>
  );

  return (
    <div className={`md:w-8/12 bg-slate-700 w-full`}>
      <div
        className={`p-2 ${
          !isOpen && 'hidden'
        } h-full flex flex-col justify-between`}>
        <div className='sticky'>
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
          </div>
          <hr className='border-gray-500 m-4 md:hidden' />
        </div>
        {loading ? loader : error ? errorCase : messageContainer}
        <div className='flex justify-center m-4'>
          <input
            className='w-full h-10 bg-gray-900 text-gray-100 rounded-md p-4'
            type='text'
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessageHandler();
              }
            }}
          />
          <div
            className='text-green-500 relative right-7 top-1'
            onClick={sendMessageHandler}>
            <Send />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
