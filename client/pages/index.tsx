import axios from 'axios';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import ChatList from '../components/ChatList';
import ChatPage from '../components/ChatPage';
import GroupChatPage from '../components/GroupChatPage';
import SideBar from '../components/SideBar';
import { requireAuth } from '../HOC/requireAuth';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { User } from '../interfaces/user.interface';
import { setCurrentUserData } from '../store/slices/currentUserData.slice';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const isChatOpen = useAppSelector((state) => state.chat.isOpen);
  const isGroupChatOpen = useAppSelector((state) => state.groupChat.isOpen);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data } = await axios.get<User>(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
          {
            withCredentials: true,
          }
        );

        dispatch(setCurrentUserData({ user: data }));
      } catch (error) {
        window.location.href = '/auth/login';
        console.error(error);
      }
    };

    fetchCurrentUser();
  }, [dispatch]);

  return (
    <div className='flex h-screen'>
      <SideBar />
      <ChatList />
      {isChatOpen && !isGroupChatOpen ? <ChatPage /> : <GroupChatPage />}
    </div>
  );
};

export const getServerSideProps = requireAuth(((_context: any) => {
  return { props: {} };
}) as any);

export default Home;
