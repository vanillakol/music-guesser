import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    agreeToTerms: false,
  });

  const registerUser = async (e) => {
    e.preventDefault();

    if (data.password !== data.repeatPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      const responseData = response.data;
      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        setData({ name: '', email: '', password: '', repeatPassword: '', agreeToTerms: false });
        toast.success('User registered successfully');
        navigate('/login');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : 'An unexpected error occurred';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form className="max-w-sm mx-auto" onSubmit={registerUser}>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-primary-900 dark:text-white">Name</label>
          <input
            type="text"
            id="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="..."
            required
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data.name}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-primary-900 dark:text-white">Your email</label>
          <input
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@musify.com"
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
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            onChange={(e) => setData({ ...data, password: e.target.value })}
            value={data.password}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-primary-900 dark:text-white">Repeat password</label>
          <input
            type="password"
            id="repeat-password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            onChange={(e) => setData({ ...data, repeatPassword: e.target.value })}
            value={data.repeatPassword}
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
              onChange={(e) => setData({ ...data, agreeToTerms: e.target.checked })}
              checked={data.agreeToTerms}
            />
          </div>
          <label htmlFor="terms" className="ml-2 text-sm font-medium text-primary-900 dark:text-gray-300">
            I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Register new account
        </button>
      </form>
    </div>
  );
}

export default Register;
