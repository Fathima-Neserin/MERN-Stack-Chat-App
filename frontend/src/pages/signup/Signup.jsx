import React, { useState } from 'react';
import GenderCheckBox from './GenderCheckBox';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    gender: '',  
  });

  const handleCheckBoxChange = (gender) => {
    setInputs((prev) => ({
      ...prev,
      gender,  
    }));
  };

  const {loading, signup} = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, userName, password, confirmPassword, gender } = inputs; // Destructure the inputs
    await signup(fullName, userName, password, confirmPassword, gender); // Pass individual values
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          SignUp
          <span className="text-blue-500 ml-2">ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full input-bordered h-10 px-3"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          {/* Username Input */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full input-bordered h-10 px-3"
              value={inputs.userName}
              onChange={(e) =>
                setInputs({ ...inputs, userName: e.target.value })
              }
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input-bordered h-10 px-3"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input-bordered h-10 px-3"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          {/* Gender CheckBoxes */}
          <GenderCheckBox
            gender="Male"
            handleCheckBoxChange={handleCheckBoxChange}
            isChecked={inputs.gender === 'Male'}
          />
          <GenderCheckBox
            gender="Female"
            handleCheckBoxChange={handleCheckBoxChange}
            isChecked={inputs.gender === 'Female'}
          />

          {/* Link to login */}
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-3 inline-block"
          >
            Already have an account?
          </Link>

          {/* Submit Button */}
          <div>
            <button 
            className="btn btn-block btn-sm mt-3 border border-slate-700"
            disabled={loading}>
             {loading ? <span className='loading loading-spinner'></span> : " Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
