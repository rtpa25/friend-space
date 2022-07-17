import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ChatList from '../components/ChatList';
import ChatPage from '../components/ChatPage';
import GroupChatPage from '../components/GroupChatPage';
import SideBar from '../components/SideBar';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { User } from '../interfaces/user.interface';
import { setCurrentUserData } from '../store/slices/currentUserData.slice';

const Home: NextPage<{ fallbackData: User }> = ({ fallbackData }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isChatOpen = useAppSelector((state) => state.chat.isOpen);
  const isGroupChatOpen = useAppSelector((state) => state.groupChat.isOpen);
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data } = await axios.get<User>(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
        {
          withCredentials: true,
        }
      );
      setCurrentUser(data);
      return data;
    };
    const data = fetchCurrentUser()
      .then((res) => {
        return res;
      })
      .catch((e) => {
        console.error(e);
      });

    if (!data) {
      router.push('/auth/login');
    } else {
      dispatch(setCurrentUserData({ user: currentUser }));
    }
  }, [dispatch]);

  return (
    <div className='flex h-screen'>
      <SideBar />
      <ChatList />
      {isChatOpen && !isGroupChatOpen ? <ChatPage /> : <GroupChatPage />}
    </div>
  );
};

export default Home;
