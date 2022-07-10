import React, { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Close } from '@material-ui/icons';
import axios from 'axios';

interface ModalProps {
  show: boolean;
  onClose(): void;
}

const Modal: FC<ModalProps> = ({ show, onClose }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [invitationEmail, setInvitationEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setIsError] = useState<string>('');

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e: React.MouseEvent<any>) => {
    e.preventDefault();
    onClose();
  };

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

  const modalContent = show ? (
    <div
      className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black'
      onClick={(e) => handleClose(e)}>
      <div
        className='bg-gray-700 w-fit h-fit rounded-xl p-3 md:w-fit flex flex-col items-center justify-between'
        onClick={(e) => e.stopPropagation()}>
        <div className='text-white text-center'>
          <div className='cursor-pointer flex justify-end text-red-600'>
            <Close onClick={(e) => handleClose(e)} />
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
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root') as HTMLElement
    );
  } else {
    return null;
  }
};

export default Modal;
