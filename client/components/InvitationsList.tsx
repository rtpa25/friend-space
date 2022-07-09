import { Close, Done } from '@material-ui/icons';

const InvitationsList = () => {
  return (
    <div className='w-full flex flex-col items-center'>
      <hr className='w-3/4 my-4' />
      <span className='text-white'>Invitations</span>
      <div className='w-3/4'>
        <div className='flex items-center w-full'>
          <img
            src='https://ui-avatars.com/api/?background=5865f2&color=fff&name=niki&font-size=0.3'
            alt='niki'
            className='rounded-full scale-105 my-4 mr-4'
          />
          <span className='text-white'>Niki Rout</span>
          <div className='cursor-pointer text-emerald-400 mx-2'>
            <Done />
          </div>
          <div className='cursor-pointer text-red-400 mx-2'>
            <Close />
          </div>
        </div>
        <div className='flex items-center w-full'>
          <img
            src='https://ui-avatars.com/api/?background=5865f2&color=fff&name=niki&font-size=0.3'
            alt='niki'
            className='rounded-full scale-105 my-4 mr-4'
          />
          <span className='text-white'>Niki Rout</span>
          <div className='cursor-pointer text-emerald-400 mx-2'>
            <Done />
          </div>
          <div className='cursor-pointer text-red-400 mx-2'>
            <Close />
          </div>
        </div>
        <div className='flex items-center w-full'>
          <img
            src='https://ui-avatars.com/api/?background=5865f2&color=fff&name=niki&font-size=0.3'
            alt='niki'
            className='rounded-full scale-105 my-4 mr-4'
          />
          <span className='text-white'>Niki Rout</span>
          <div className='cursor-pointer text-emerald-400 mx-2'>
            <Done />
          </div>
          <div className='cursor-pointer text-red-400 mx-2'>
            <Close />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationsList;
