import { Close } from '@material-ui/icons';
import axios from 'axios';
import React, { FC, useState } from 'react';
import Modal from './UI/Modal';

interface AddFriendModalProps {
  show: boolean;
  onClose: () => void;
}

const AddFriendModal: FC<AddFriendModalProps> = ({ show, onClose }) => {
  const [invitationEmail, setInvitationEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setIsError] = useState<string>('');

  const addInvitationHandler = async () => {
    setIsLoading(true);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users/invite`,
        { email: invitationEmail },
        { withCredentials: true }
      );
      onClose();
    } catch (error: any) {
      setIsError(error.response.data);
    }
    setIsLoading(false);
  };

  return (
    <Modal
      show={show}
      handleClose={(e) => {
        e.preventDefault();
        onClose();
      }}>
      <div className='text-white text-center'>
        <div className='cursor-pointer flex justify-end text-red-600'>
          <Close
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          />
        </div>
        <h3 className='text-2xl text-center'>Add Friend Request</h3>
        <span className='text-base text-gray-400'>
          The user needs to have an account on FriendSpace
        </span>
      </div>
      <hr className='w-1/2 my-6' />
      <input
        type='email'
        className='auth-input-bar w-full my-2'
        value={invitationEmail}
        onChange={(e) => setInvitationEmail(e.target.value)}
      />
      <button
        className='text-gray-100 w-1/2 p-2 rounded-md my-4 bg-emerald-600 hover:bg-emerald-800 ease-in duration-100'
        onClick={addInvitationHandler}>
        {isLoading ? 'Loading...' : 'Add Friend'}
      </button>
      {error ? <span className='text-red-500'>{error}</span> : null}
    </Modal>
  );
};

export default AddFriendModal;
