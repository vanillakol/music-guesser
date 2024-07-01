import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '', 
    password: '',
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post('/login', {
        email, 
        password
      });

      console.log(data);
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success('Signed In!');
        setTimeout(() => {
          navigate('/dashboard');
          window.location.reload();
        }, 1000); 
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-sm w-full">
        <form onSubmit={loginUser}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-primary-900 dark:text-white">Your email</label>
            <input 
              type="email" 
              id="email" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="name@flowbite.com" 
              required 
              onChange={(e) => setData({ ...data, email: e.target.value })} 
              value={data.email} 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-primary-900 dark:text-white">Your password</label>
            <input 
              type="password" 
              id="password" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="..." 
              required 
              onChange={(e) => setData({ ...data, password: e.target.value })} 
              value={data.password} 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
