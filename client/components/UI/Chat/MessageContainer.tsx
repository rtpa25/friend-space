import { FC, MutableRefObject } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { GrpoupMessage } from '../../../interfaces/groupMessage.interface';
import { Message } from '../../../interfaces/message.interface';

interface MessageContainerProps {
  messages: Message[] | GrpoupMessage[];
  scrollRef: MutableRefObject<HTMLInputElement>;
}

const MessageContainer: FC<MessageContainerProps> = ({
  messages,
  scrollRef,
}) => {
  const currentUser = useAppSelector((state) => state.currentUser.user);
  return (
    <div className='overflow-y-auto overflow-x-hidden flex flex-col justify-start h-3/4'>
      {messages.map((message) => {
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
      })}
    </div>
  );
};

export default MessageContainer;
