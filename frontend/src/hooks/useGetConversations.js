import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        // Retrieve the chat-user object from localStorage
        const user = JSON.parse(localStorage.getItem('chat-user'));

        if (!user || !user.token) {
          throw new Error('No token found. Please log in again.'); // Check if token is absent
        }

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}` // Use the token from the chat-user object
          }
        };

        const response = await axios.get("http://localhost:5000/api/user", config);
        setConversations(response.data); // Ensure you are setting the correct response data
      } catch (error) {
        toast.error(error.response?.data?.error || error.message); // Use error.response to get the error message
        console.error('Error fetching conversations:', error); // Log error for debugging
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
