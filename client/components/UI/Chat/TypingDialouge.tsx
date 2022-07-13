import { FC } from 'react';
import { User } from '../../../interfaces/user.interface';

interface TypingDialougeProps {
  user: User;
}

const TypingDialouge: FC<TypingDialougeProps> = ({ user }) => {
  return (
    <div className='bg-transparent text-green-400 text-center'>
      <span>{user?.name} is typing.....</span>
    </div>
  );
};

export default TypingDialouge;
