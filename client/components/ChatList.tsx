import React from 'react';
import FriendList from './FriendList';
import InvitationsList from './InvitationsList';

const ChatList = () => {
  return (
    <div className='w-3/4 md:w-3/12 bg-slate-800 flex flex-col items-center overflow-y-auto no-scrollbar overflow-x-hidden'>
      <FriendList />
      <InvitationsList />
    </div>
  );
};

export default ChatList;
