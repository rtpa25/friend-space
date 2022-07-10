import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSwr from 'swr';
import ChatList from '../components/ChatList';
import ChatPage from '../components/ChatPage';
import SideBar from '../components/SideBar';
import { requireAuth } from '../HOC/requireAuth';
import { useAppDispatch } from '../hooks/redux';
import { User } from '../interfaces/user.interface';
import { setCurrentUserData } from '../store/slices/currentUserData.slice';
import fetcher from '../utils/fetcher';

const Home: NextPage<{ fallbackData: User }> = ({ fallbackData }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data } = useSwr<User | null>(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    fetcher,
    { fallbackData }
  );

  useEffect(() => {
    if (!data) {
      router.push('/auth/login');
    } else {
      dispatch(setCurrentUserData({ user: data }));
    }
  }, [dispatch]);

  return (
    <div className='flex h-screen'>
      <SideBar />
      <ChatList />
      <ChatPage />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuth(
  async (context) => {
    const data = await fetcher(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
      context.req.headers
    );

    return { props: { fallbackData: data } };
  }
);

export default Home;
