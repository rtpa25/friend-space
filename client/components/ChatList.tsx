import React from 'react';
import { useAppSelector } from '../hooks/redux';
import FriendList from './FriendList';
import InvitationsList from './InvitationsList';

const ChatList = () => {
  const { isOpen } = useAppSelector((state) => state.chat);
  const { isOpen: isGroupChatOpen } = useAppSelector(
    (state) => state.groupChat
  );

  return (
    <div
      className={`${
        isOpen || isGroupChatOpen ? 'hidden md:flex' : 'w-3/4'
      } md:w-3/12 bg-slate-800 flex flex-col items-center overflow-y-auto no-scrollbar overflow-x-hidden`}>
      <FriendList />
      <InvitationsList />
    </div>
  );
};

export default ChatList;
