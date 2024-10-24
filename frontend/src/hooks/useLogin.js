import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (userName, password) => {
    
    const success = handleInputErrors({userName,password});

    if(!success) return ;
  
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
  
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { userName, password },
        config
      );
      console.log("Login Response:", response.data);
      localStorage.setItem("chat-user", JSON.stringify(response.data));
      setAuthUser(response.data);
    } catch (error) {
      // Handle error here
      if (error.response && error.response.data && error.response.data.error) {
        // Show the error message from the backend
        toast.error(error.response.data.error); // e.g., "Invalid Username or Password"
      } else {
        // Fallback for unexpected errors
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
}
    return {loading, login};
  
}  

export default useLogin;



function handleInputErrors ({userName,password}) {
    if(!userName || !password){
     console.error('Missing fields', )
     toast.error("Please fill all the fields");
     return false;
    }

     return true;
 }
