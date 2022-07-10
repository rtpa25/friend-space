import { Close, Done } from '@material-ui/icons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { User } from '../interfaces/user.interface';
import { setFriends } from '../store/slices/friends.slice';
import { setInvitations } from '../store/slices/invitations.slice';
import LoadingSpinner from './LoadingSpinner';

const InvitationsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const invites = useAppSelector((state) => state.invitations.value);
  const friends = useAppSelector((state) => state.friends.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchInvites = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me/invites`,
          { withCredentials: true }
        );
        dispatch(setInvitations({ value: res.data }));
      } catch (error: any) {
        setError(error.response.data);
      }
      setIsLoading(false);
    };
    fetchInvites();
  }, []);

  const invitationHandler = async (accept: boolean, invitation: User) => {
    try {
      const newInvites = invites.filter((invite) => {
        return invite.email !== invitation.email;
      });
      dispatch(setInvitations({ value: newInvites }));
      if (accept) {
        dispatch(setFriends({ value: [...friends, invitation] }));
        await axios.patch(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users/friend`,
          { email: invitation.email },
          { withCredentials: true }
        );
      }
    } catch (error) {
      dispatch(setFriends({ value: [...friends] }));
      console.error(error);
    }
  };

  const invitationList = (
    <div className='w-3/4'>
      {invites.map((invite) => {
        return (
          <div key={invite._id} className='flex items-center w-full'>
            <img
              src={`https://ui-avatars.com/api/?background=5865f2&color=fff&name=${invite.name}&font-size=0.3`}
              alt={invite.name}
              className='rounded-full scale-105 my-4 mr-4'
            />
            <span className='text-white'>{invite.name}</span>
            <div
              className='cursor-pointer text-emerald-400 mx-2'
              onClick={() => invitationHandler(true, invite)}>
              <Done />
            </div>
            <div
              className='cursor-pointer text-red-400 mx-2'
              onClick={() => invitationHandler(true, invite)}>
              <Close />
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className='w-full flex flex-col items-center'>
      <hr className='w-3/4 my-4' />
      <span className='text-white'>Invitations</span>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <span className='text-red-500'>{error}</span>
      ) : (
        invitationList
      )}
    </div>
  );
};

export default InvitationsList;
