import React, { FC, MutableRefObject } from 'react';
import { Message } from '../../../interfaces/message.interface';
import { User } from '../../../interfaces/user.interface';

interface PersonalChatBubbleProps {
  scrollRef: MutableRefObject<HTMLInputElement>;
  currentUser: User;
  message: Message;
}

const PersonalChatBubble: FC<PersonalChatBubbleProps> = ({
  scrollRef,
  currentUser,
  message,
}) => {
  return (
    <div
      ref={scrollRef}
      key={message._id}
      className={`${
        message.sender === currentUser?._id
          ? 'bg-slate-900 rounded-br-none self-end'
          : 'bg-green-800 rounded-bl-none'
      } text-white w-fit py-2 px-4 rounded-xl  my-2 mx-4`}>
      {message.content}
    </div>
  );
};

export default PersonalChatBubble;
