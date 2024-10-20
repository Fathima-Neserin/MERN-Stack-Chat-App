import React from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from "react-icons/ti";  // Correct import for the icon

const MessageContainer = () => {
  const noChatSeleted = false;
  return (
    <>
      <div className='md:min-w-[550px] min-h-3.5 flex flex-col bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        {noChatSeleted ? <NoChatSelected /> : (
          <>
            {/* HEADER */}
            <div className='bg-slate-500 px-4 py-2 mb-2'>
              <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>Nezrin</span>
            </div>
            <Messages />
            <MessageInput />
          </>
        )}
      </div>
    </>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'> {/* Corrected 'flext' to 'flex' */}
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome Fathima 👋</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />  {/* Corrected icon name */}
      </div>
    </div>
  );
};