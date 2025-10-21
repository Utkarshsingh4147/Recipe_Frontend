import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">Recipe App</Link>
      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/create">Create Recipe</Link>
            <button
              onClick={logout}
              className="bg-white text-blue-500 px-3 py-1 rounded hover:bg-blue-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="bg-white text-blue-500 px-3 py-1 rounded hover:bg-blue-100 transition"
          >
            Login/Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
