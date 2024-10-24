import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import { config } from 'dotenv';
import axios from 'axios';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const [conversationExists, setConversationExists] = useState(false);
  
    useEffect(() => {
      const getMessages = async () => {
        setLoading(true);
        try {
          const user = JSON.parse(localStorage.getItem('chat-user'));
  
          if (!user || !user.token) {
            throw new Error('No token found. Please log in again.');
          }
  
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
  
          const response = await axios.get(
            `http://localhost:5000/api/message/${selectedConversation._id}`,
            config
          );
        
          const { messages, conversationExists } = response.data;
  
          setMessages(messages);
          setConversationExists(conversationExists);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      if (selectedConversation._id) getMessages();
    }, [selectedConversation._id, setMessages]);
  
    return { messages, loading, conversationExists };
  };
  
  export default useGetMessages;
  