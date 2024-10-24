import axios from 'axios';
import  { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post("http://localhost:5000/api/auth/logout", config);

      localStorage.removeItem("chat-user");
      setAuthUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout }; // Return the loading and logout function
};

export default useLogout;
