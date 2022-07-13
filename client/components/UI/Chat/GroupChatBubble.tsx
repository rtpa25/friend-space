import React, { FC, MutableRefObject } from 'react';
import { GrpoupMessage } from '../../../interfaces/groupMessage.interface';
import { User } from '../../../interfaces/user.interface';

interface GroupChatBubbleProps {
  scrollRef: MutableRefObject<HTMLInputElement>;
  currentUser: User;
  message: GrpoupMessage;
}

const GroupChatBubble: FC<GroupChatBubbleProps> = ({
  scrollRef,
  currentUser,
  message,
}) => {
  return (
    <div
      ref={scrollRef}
      key={message._id}
      className={`${
        message.senderId === currentUser?._id
          ? 'bg-slate-900 rounded-br-none self-end text-right'
          : 'bg-green-800 rounded-bl-none'
      } text-white w-fit py-2 px-4 rounded-xl my-2 mx-4 flex flex-col`}>
      <span>{message.content}</span>
      <span className='text-gray-400 text-sm'>{message.senderName}</span>
    </div>
  );
};

export default GroupChatBubble;
