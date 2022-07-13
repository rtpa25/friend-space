import { Send } from '@material-ui/icons';
import { FC } from 'react';

interface MessageInputBarProps {
  messageText: string;
  sendMessageHandler: () => Promise<void>;
  typingHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MessageInputBar: FC<MessageInputBarProps> = ({
  messageText,
  sendMessageHandler,
  typingHandler,
}) => {
  return (
    <div className='flex justify-center m-4'>
      <input
        className='w-full h-10 bg-gray-900 text-gray-100 rounded-md p-4'
        type='text'
        value={messageText}
        onChange={(e) => typingHandler(e)}
        placeholder={'Type Something.....'}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            if (messageText != '') {
              sendMessageHandler();
            }
          }
        }}
      />
      <div
        className='text-green-500 relative right-7 top-1'
        onClick={sendMessageHandler}>
        <Send />
      </div>
    </div>
  );
};

export default MessageInputBar;
