import { PowerSettingsNew } from '@material-ui/icons';

const SideBar = () => {
  return (
    <div className='w-1/4 bg-slate-900 h-full flex flex-col justify-between md:w-1/12'>
      <div className='flex flex-col'>
        <button className='bg-violet-600 m-4 rounded-md h-16 text-white ease-out duration-200 hover:bg-violet-900'>
          asd
        </button>
        <button className='bg-violet-600 m-4 rounded-md h-16 text-white ease-out duration-200 hover:bg-violet-900'>
          das
        </button>
        <button className='bg-violet-600 m-4 rounded-md h-16 text-white ease-out duration-200 hover:bg-violet-900'>
          dsa
        </button>
      </div>
      <div className='flex flex-col'>
        <button className='flex justify-center items-center bg-slate-900 m-4 rounded-full h-16 text-green-600 border-green-600 border-solid border-2 duration-300 hover:bg-green-600 hover:border-transparent hover:text-white'>
          add
        </button>
        <button className='flex justify-center items-center bg-slate-900 m-4 rounded-full h-16 text-green-600 border-green-600 border-solid border-2 duration-300 hover:bg-green-600 hover:border-transparent hover:text-white'>
          <PowerSettingsNew />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
