import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSwr from 'swr';
import ChatList from '../components/ChatList';
import ChatPage from '../components/ChatPage';
import SideBar from '../components/SideBar';
import { requireAuth } from '../HOC/requireAuth';
import fetcher from '../utils/fetcher';

interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  session: string;
}

const Home: NextPage<{ fallbackData: User }> = ({ fallbackData }) => {
  const router = useRouter();

  const { data } = useSwr<User | null>(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    fetcher,
    { fallbackData }
  );

  const logoutHandler = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        { withCredentials: true }
      );
      router.push('/auth/login');
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) {
    return <div>Please login</div>;
  }

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
