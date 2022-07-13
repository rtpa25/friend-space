import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { socket } from '../config/socket.connection';
import { useAppSelector } from '../hooks/redux';
import { Message } from '../interfaces/message.interface';
import { generateRandomString } from '../utils/randomString';
import ChatPageHeader from './UI/Chat/ChatPageHeader';
import MessageContainer from './UI/Chat/MessageContainer';
import MessageInputBar from './UI/Chat/MessageInputBar';
import TypingDialouge from './UI/Chat/TypingDialouge';
import ErrorCase from './UI/ErrorCase';
import Loader from './UI/Loader';

const ChatPage = () => {
  const { isOpen, user } = useAppSelector((state) => state.chat);
  const currentUser = useAppSelector((state) => state.currentUser.user);
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

  useEffect(() => {
    if (currentUser && user) {
      socket.removeAllListeners();
      socket.emit('setup', user);
      socket.on('connected', () => setSocketConnected(true));
      socket.on('typing', () => setIsTyping(true));
      socket.on('stop typing', () => setIsTyping(false));
    }
  }, []);

  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved: Message) => {
      if (newMessageRecieved.sender !== currentUser?._id) {
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

  const loader = <Loader />;

  const errorCase = <ErrorCase error={error} />;

  const messageContainer = (
    <MessageContainer
      isGroup={false}
      scrollRef={scrollRef}
      personalMessages={messages}
    />
  );

  return (
    <div className={`md:w-8/12 bg-slate-700 ${isOpen && 'w-full'}`}>
      <div
        className={`p-2 ${
          !isOpen && 'hidden'
        } h-full flex flex-col justify-between`}>
        <ChatPageHeader isGroup={false} user={user} />
        {loading ? loader : error ? errorCase : messageContainer}
        <div className='flex flex-col'>
          {istyping && <TypingDialouge user={user!} />}
          <MessageInputBar
            messageText={messageText}
            sendMessageHandler={sendMessageHandler}
            typingHandler={typingHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
