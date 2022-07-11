import { ArrowBackIosOutlined, Send } from '@material-ui/icons';
import axios from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { socket } from '../config/socket.connection';
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
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
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
          socket.emit('join chat', currentUser._id);
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

  useMemo(() => {
    if (currentUser && user) {
      socket.removeAllListeners();
      socket.emit('setup', user);
      socket.on('connected', () => setSocketConnected(true));
      socket.on('typing', () => setIsTyping(true));
      socket.on('stop typing', () => setIsTyping(false));
    }
  }, []);

  useMemo(() => {
    socket.on('message recieved', (newMessageRecieved) => {
      if (newMessageRecieved.sender !== currentUser?._id) {
        console.log(newMessageRecieved);
        setMessages((prevState) => {
          return [...prevState, newMessageRecieved];
        });
      }
    });
  }, []);

  const sendMessageHandler = async () => {
    socket.emit('stop typing', currentUser?._id);
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
      socket.emit('new message', newMessage);
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

  const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', user?._id);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', user?._id);
        setTyping(false);
      }
    }, timerLength);
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
                : 'bg-green-800 rounded-bl-none'
            } text-white w-fit py-2 px-4 rounded-xl  my-2 mx-4`}>
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
    <div className={`md:w-8/12 bg-slate-700 ${isOpen && 'w-full'}`}>
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
        <div className='flex flex-col'>
          {istyping && (
            <div className='bg-transparent text-green-400 text-center'>
              <span>{user?.name} is typing.....</span>
            </div>
          )}
          <div className='flex justify-center m-4'>
            <input
              className='w-full h-10 bg-gray-900 text-gray-100 rounded-md p-4'
              type='text'
              value={messageText}
              onChange={(e) => typingHandler(e)}
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
    </div>
  );
};

export default ChatPage;
