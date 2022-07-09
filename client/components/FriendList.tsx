// import Image from 'next/image';
import React from 'react';

const FriendList = () => {
  return (
    <div className='w-full flex flex-col items-center'>
      <button className='bg-green-700 text-white h-12 w-3/4 m-4 rounded-lg hover:bg-green-800 duration-150'>
        Add Friend
      </button>
      <div className='w-3/4 scroll-m-0'>
        <div className='cursor-pointer flex items-center w-full'>
          <img
            src={
              'https://ui-avatars.com/api/?background=5865f2&color=fff&name=ronit&font-size=0.3'
            }
            alt='ronit'
            className='rounded-full scale-105 my-4 mr-4'
          />
          <span className='text-white'>Ronit Panda</span>
        </div>
        <div className='cursor-pointer flex items-center w-full'>
          <img
            src={
              'https://ui-avatars.com/api/?background=5865f2&color=fff&name=ronit&font-size=0.3'
            }
            alt='ronit'
            className='rounded-full scale-105 my-4 mr-4'
          />
          <span className='text-white'>Ronit Panda</span>
        </div>
        <div className='cursor-pointer flex items-center w-full'>
          <img
            src={
              'https://ui-avatars.com/api/?background=5865f2&color=fff&name=ronit&font-size=0.3'
            }
            alt='ronit'
            className='rounded-full scale-105 my-4 mr-4'
          />
          <span className='text-white'>Ronit Panda</span>
        </div>
        <div className='cursor-pointer flex items-center w-full'>
          <img
            src={
              'https://ui-avatars.com/api/?background=5865f2&color=fff&name=ronit&font-size=0.3'
            }
            alt='ronit'
            className='rounded-full scale-105 my-4 mr-4'
          />
          <span className='text-white'>Ronit Panda</span>
        </div>
      </div>
    </div>
  );
};

export default FriendList;
