import { Close } from '@material-ui/icons';
import axios from 'axios';
import { FC, useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { addGroup } from '../store/slices/groups.slice';
import Modal from './UI/Modal';

interface AddGroupModalProps {
  show: boolean;
  onClose: () => void;
}

const AddGroupModal: FC<AddGroupModalProps> = ({ show, onClose }) => {
  const [groupName, setGroupName] = useState<string>('');
  const [groupDesc, setGroupDesc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setIsError] = useState<string>('');
  const dispatch = useAppDispatch();

  const addGroupHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/groups`,
        { name: groupName, description: groupDesc },
        { withCredentials: true }
      );
      dispatch(addGroup(res.data));
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
        <h3 className='text-2xl text-center'>Add Group</h3>
        <span className='text-base text-gray-400'>
          Fill in the name and description and every user can chat in the group
        </span>
      </div>
      <hr className='w-1/2 my-6' />
      <input
        type='text'
        className='auth-input-bar w-full my-2'
        value={groupName}
        placeholder={'Name of the group'}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <input
        type='text'
        className='auth-input-bar w-full my-2'
        placeholder={'Description of the group'}
        value={groupDesc}
        onChange={(e) => setGroupDesc(e.target.value)}
      />
      <button
        className='text-gray-100 w-1/2 p-2 rounded-md my-4 bg-emerald-600 hover:bg-emerald-800 ease-in duration-100'
        onClick={addGroupHandler}>
        {isLoading ? 'Loading...' : 'Add Group'}
      </button>
      {error ? <span className='text-red-500'>{error}</span> : null}
    </Modal>
  );
};

export default AddGroupModal;
