import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {

  const [loading, setLoading] = useState(false);

  const {setAuthUser} = useAuthContext();

  const signup = async(fullName,userName,password,confirmPassword,gender) => {
      
    const success = handleInputErrors({fullName,userName,password,confirmPassword,gender});

    if(!success) return ;
  
    setLoading(true);

   try {
    const config = {headers:{
        "Content-Type": "application/json"
    }}
    const response = await axios.post('http://localhost:5000/api/auth/signup',
        {fullName,userName,password,confirmPassword,gender},
    config )
    localStorage.setItem("chat-user", JSON.stringify(response));
    setAuthUser(response);
   } catch (error) {
    toast.error(`Error while doing signup ${error.message}`)
   }finally{
    setLoading(false);
   }
}
  return {loading, signup};
}

export default useSignup;

function handleInputErrors ({fullName,userName,password,confirmPassword,gender}) {
       if(!fullName || !userName || !password || !confirmPassword || !gender){
        console.error('Missing fields', )
        toast.error("Please fill all the fields",fullName,userName,password,confirmPassword,gender);
        return false;
       }

      if(password !== confirmPassword){
        toast.error("Passwords do not match");
        return false;
      }
    
      if(password.length<6){
        toast.error("Password must be at least 6 charecters long")
        return false
      }

        return true;
    }

