import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '../hooks/redux';
import { GrpoupMessage } from '../interfaces/groupMessage.interface';
import { generateRandomString } from '../utils/randomString';
import MessageContainer from './UI/Chat/MessageContainer';
import Loader from './UI/Loader';
import ErrorCase from './UI/ErrorCase';
import ChatPageHeader from './UI/Chat/ChatPageHeader';
import MessageInputBar from './UI/Chat/MessageInputBar';

const GroupChatPage = () => {
  const { isOpen, group } = useAppSelector((state) => state.groupChat);
  const currentUser = useAppSelector((state) => state.currentUser.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<GrpoupMessage[]>([]);
  const [messageText, setMessageText] = useState<string>('');
  const scrollRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const fetchConversation = async () => {
      if (currentUser && group) {
        setLoading(true);
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/groups/messages?group=${group._id}`,
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
  }, [currentUser, group]);

  const sendMessageHandler = async () => {
    const newMessage: GrpoupMessage = {
      _id: generateRandomString(),
      content: messageText,
      sender: currentUser!._id,
      group: group!._id,
      createdAt: Date.now().toString(),
    };
    try {
      setMessages((prevState) => {
        return [...prevState, newMessage];
      });
      setMessageText('');
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/groups/messages`,
        {
          content: messageText,
          sender: currentUser!._id!,
          group: group!._id!,
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
  };

  const loader = <Loader />;

  const errorCase = <ErrorCase error={error} />;

  const messageContainer = (
    <MessageContainer messages={messages} scrollRef={scrollRef} />
  );

  return (
    <div className={`md:w-8/12 bg-slate-700 ${isOpen && 'w-full'}`}>
      <div
        className={`p-2 ${
          !isOpen && 'hidden'
        } h-full flex flex-col justify-between`}>
        <ChatPageHeader isGroup={true} group={group} />
        {loading ? loader : error ? errorCase : messageContainer}
        <div className='flex flex-col'>
          {/* {istyping && (
            <div className='bg-transparent text-green-400 text-center'>
              <span>{user?.name} is typing.....</span>
            </div>
          )} */}
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

export default GroupChatPage;
