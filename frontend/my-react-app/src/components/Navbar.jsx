import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

function Navbar() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handlePracticeClick = () => {
    navigate('/');
    window.location.reload();
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleLogoutClick = () => {
    navigate('/logout');
  };

  return (
    <nav>
      <div className="navbar bg-neutral text-neutral-content">
        {!user ? (
          <>
            <input type="checkbox" value="dark" className="toggle theme-controller" />
            <button className="btn btn-ghost text-xl" onClick={handleHomeClick}>
              Home
            </button>
            <button className="btn btn-ghost text-xl" onClick={handleLoginClick}>
              Login
            </button>
            <button className="btn btn-ghost text-xl" onClick={handleRegisterClick}>
              Register
            </button>
          </>
        ) : (
          <>
            <input type="checkbox" value="dark" className="toggle theme-controller" />
            <button className="btn btn-ghost text-xl" onClick={handlePracticeClick}>
              Practice
            </button>
            <button className="btn btn-ghost text-xl" onClick={handleDashboardClick}>
              Dashboard
            </button>
            <button className="btn btn-ghost text-xl" onClick={handleLogoutClick}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
