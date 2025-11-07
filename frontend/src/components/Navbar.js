import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for admin authentication
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    
    if (adminToken) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [location]); // Re-check when location changes

  const handleUserLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    setIsAdmin(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className="navbar-brand" style={{ cursor: 'default' }}>
          🔒 APDS Banking
        </span>
        
        <div className="navbar-menu">
          {isAdmin ? (
            // Admin is logged in
            <>
              <button onClick={handleAdminLogout} className="navbar-button">
                Logout
              </button>
            </>
          ) : isAuthenticated ? (
            // Regular user is logged in
            <>
              <span className="navbar-user">Welcome, {user?.fullName}</span>
              <Link to="/dashboard" className="navbar-link">Dashboard</Link>
              <Link to="/payment" className="navbar-link">New Payment</Link>
              <button onClick={handleUserLogout} className="navbar-button">
                Logout
              </button>
            </>
          ) : (
            // No one is logged in
            <>
              <Link to="/login" className="navbar-link">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

