import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { registerUser, loginUser } from '../api';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await loginUser({ username: formData.username, password: formData.password });
        login({ username: formData.username }, res.data.token);
      } else {
        await registerUser(formData);
        setIsLogin(true);
      }
      navigate('/');
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
        {!isLogin && (
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
        )}
        <input type="text" name="username" placeholder="Username" onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">{isLogin ? 'Login' : 'Register'}</button>
        <p className="text-sm mt-2 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span className="text-blue-500 cursor-pointer ml-1" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Auth;
