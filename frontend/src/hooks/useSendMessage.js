import { useState } from 'react';
import useConversation from "../zustand/useConversation";
import { toast } from "react-hot-toast";
import axios from 'axios';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('chat-user'));

      if (!user || !user.token) {
        throw new Error('No token found. Please log in again.');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `http://localhost:5000/api/message/send/${selectedConversation._id}`,
        { message },
        config
      );

      setMessages([...messages, response.data.newMessage]);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
