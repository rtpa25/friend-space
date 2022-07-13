import { ArrowBackIosOutlined, Phone } from '@material-ui/icons';
import { FC } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { Group } from '../../../interfaces/group.interface';
import { User } from '../../../interfaces/user.interface';
import { toggleChatWindow } from '../../../store/slices/chatWindowData.slice';
import { toggleGroupChatWindow } from '../../../store/slices/groupChatWindowData.slice';

interface ChatPageHeaderProps {
  isGroup: boolean;
  user?: User | undefined;
  group?: Group | undefined;
}

const ChatPageHeader: FC<ChatPageHeaderProps> = ({ isGroup, user, group }) => {
  const dispatch = useAppDispatch();
  const toggleWindowHandler = () => {
    if (isGroup) {
      dispatch(toggleGroupChatWindow());
    } else {
      dispatch(toggleChatWindow());
    }
  };

  const entity = isGroup ? group : user;

  return (
    <div className='sticky'>
      <div className='flex justify-between'>
        <div
          className='cursor-pointer text-green-500 md:hidden'
          onClick={toggleWindowHandler}>
          <ArrowBackIosOutlined />
        </div>
        <div className='flex justify-between items-center md:w-full'>
          <span className='md:m-4 md:text-gray-400 md:block hidden'>
            Choosen Group: {entity?.name}
          </span>
          <div className='mr-4 text-green-500 cursor-pointer'>
            <Phone />
          </div>
        </div>
      </div>

      <hr className='border-gray-500 m-4' />
      <div className='text-center'>
        <div className='flex m-10 justify-between md:justify-start items-center'>
          <img
            src={`https://ui-avatars.com/api/?background=5865f2&color=fff&name=${entity?.name}&font-size=0.3`}
            alt={entity?.name}
            className='rounded-full scale-150'
          />
          <h3 className='text-gray-100 text-2xl mr-24 md:ml-10'>
            {entity?.name}
          </h3>
        </div>
        <hr className='md:border-gray-500 md:m-4 md:block hidden' />
      </div>
      <hr className='border-gray-500 m-4 md:hidden' />
    </div>
  );
};

export default ChatPageHeader;
