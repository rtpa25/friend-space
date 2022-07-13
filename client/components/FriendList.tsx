import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { User } from '../interfaces/user.interface';
import { setChatData } from '../store/slices/chatWindowData.slice';
import { setFriends } from '../store/slices/friends.slice';
import { hideGroupChatWindow } from '../store/slices/groupChatWindowData.slice';
import AddFriendModal from './AddFriendModal';
import LoadingSpinner from './UI/LoadingSpinner';

const FriendList = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const friends = useAppSelector((state) => state.friends.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchFriends = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me/friends`,
          { withCredentials: true }
        );
        dispatch(setFriends({ value: res.data }));
      } catch (error: any) {
        console.error(error);
        setError(error.message);
      }
      setIsLoading(false);
    };
    fetchFriends();
  }, []);

  const chatWindowHandler = (user: User) => {
    dispatch(setChatData({ isOpen: true, user: user }));
    dispatch(hideGroupChatWindow());
  };

  const friendsList = (
    <div className='w-3/4 scroll-m-0'>
      {friends.map((friend) => {
        return (
          <div
            key={friend._id}
            className='cursor-pointer flex items-center w-full'
            onClick={() => chatWindowHandler(friend)}>
            <img
              src={`https://ui-avatars.com/api/?background=5865f2&color=fff&name=${friend.name}&font-size=0.3`}
              alt={friend.name}
              className='rounded-full scale-105 my-4 mr-4'
            />
            <span className='text-white'>{friend.name}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className='w-full flex flex-col items-center'>
      <button
        className='bg-green-700 text-white h-12 w-3/4 m-4 rounded-lg hover:bg-green-800 duration-150'
        onClick={() => setShowModal(true)}>
        Add Friend
      </button>
      {showModal && (
        <AddFriendModal show={showModal} onClose={() => setShowModal(false)} />
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <span className='text-red-500'>{error}</span>
      ) : (
        friendsList
      )}
    </div>
  );
};

export default FriendList;
