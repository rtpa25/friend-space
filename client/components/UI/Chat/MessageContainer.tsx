import { FC, MutableRefObject } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { GrpoupMessage } from '../../../interfaces/groupMessage.interface';
import { Message } from '../../../interfaces/message.interface';
import GroupChatBubble from './GroupChatBubble';
import PersonalChatBubble from './PersonalChatBubble';

interface MessageContainerProps {
  isGroup: boolean;
  groupMessages?: GrpoupMessage[];
  personalMessages?: Message[];
  scrollRef: MutableRefObject<HTMLInputElement>;
}

const MessageContainer: FC<MessageContainerProps> = ({
  personalMessages,
  scrollRef,
  groupMessages,
  isGroup,
}) => {
  const currentUser = useAppSelector((state) => state.currentUser.user);

  const personalMessagesContainer = personalMessages?.map((message) => {
    return (
      <PersonalChatBubble
        key={message._id}
        scrollRef={scrollRef}
        currentUser={currentUser!}
        message={message}
      />
    );
  });

  const groupMessagesContainer = groupMessages?.map((message) => {
    return (
      <GroupChatBubble
        key={message._id}
        scrollRef={scrollRef}
        currentUser={currentUser!}
        message={message}
      />
    );
  });

  return (
    <div className='overflow-y-auto overflow-x-hidden flex flex-col justify-start h-3/4'>
      {isGroup ? groupMessagesContainer : personalMessagesContainer}
    </div>
  );
};

export default MessageContainer;
