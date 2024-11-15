import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
  const { messages, loading, conversationExists } = useGetMessages();
  useListenMessages(); // Assuming this listens for new messages.

  const lastMessageRef = useRef(null); // Reference to the last message

  useEffect(() => {
    // Scroll to the latest message whenever messages change
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // This will trigger every time the messages array is updated

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {/* Render messages or skeleton loader */}
      {!loading && messages.length > 0 && messages.map((message, idx) => (
        <div 
          key={message.id}
          ref={idx === messages.length - 1 ? lastMessageRef : null} // Only set the ref to the last message
        >
          <Message message={message} />
        </div>
      ))}

      {loading && [...Array(3)].map((_, idx) => (
        <MessageSkeleton key={idx} />
      ))}

      {!loading && !conversationExists && (
        <p className='text-center font-semibold mt-2'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
