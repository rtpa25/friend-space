import { PowerSettingsNew } from '@material-ui/icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { hideChatWindow } from '../store/slices/chatWindowData.slice';
import { setGroupChatData } from '../store/slices/groupChatWindowData.slice';
import { setGroups } from '../store/slices/groups.slice';
import { initials } from '../utils/initials';
import AddGroupModal from './AddGroupModal';
import Loader from './UI/Loader';

const SideBar = () => {
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isOpen } = useAppSelector((state) => state.chat);
  const { isOpen: isGroupChatOpen } = useAppSelector(
    (state) => state.groupChat
  );
  const groups = useAppSelector((state) => state.groups.value);
  const [isGroupsLoading, setIsGroupsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const logoutHandler = async () => {
    setIsLogoutLoading(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        { withCredentials: true }
      );
      router.push('/auth/login');
    } catch (error: any) {
      console.error(error);
    }
    setIsLogoutLoading(false);
  };

  useEffect(() => {
    const fetchGroups = async () => {
      setIsGroupsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/groups`,
          { withCredentials: true }
        );
        dispatch(setGroups({ value: res.data }));
      } catch (error) {
        console.error(error);
      }
      setIsGroupsLoading(false);
    };
    fetchGroups();
  }, []);

  const groupList = (
    <div className='flex flex-col'>
      {groups.map((group) => {
        return (
          <button
            onClick={() => {
              dispatch(setGroupChatData({ isOpen: true, group: group }));
              dispatch(hideChatWindow());
            }}
            key={group._id}
            className='bg-violet-600 m-4 rounded-md h-16 text-white ease-out duration-200 hover:bg-violet-900'>
            {initials(group.name)}
          </button>
        );
      })}
    </div>
  );

  return (
    <div
      className={`${
        isOpen || isGroupChatOpen ? 'hidden md:flex' : 'w-1/4'
      } bg-slate-900 h-full flex flex-col justify-between md:w-1/12`}>
      {isGroupsLoading ? <Loader /> : groupList}
      <div className='flex flex-col'>
        <button
          className='flex justify-center items-center bg-slate-900 m-4 rounded-full h-16 text-green-600 border-green-600 border-solid border-2 duration-300 hover:bg-green-600 hover:border-transparent hover:text-white'
          onClick={() => setShowModal(true)}>
          Add
        </button>
        {showModal && (
          <AddGroupModal show={showModal} onClose={() => setShowModal(false)} />
        )}
        <button
          className='flex justify-center items-center bg-slate-900 m-4 rounded-full h-16 text-green-600 border-green-600 border-solid border-2 duration-300 hover:bg-green-600 hover:border-transparent hover:text-white'
          onClick={logoutHandler}>
          {isLogoutLoading ? <Loader /> : <PowerSettingsNew />}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
