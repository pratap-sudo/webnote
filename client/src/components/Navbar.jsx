// -------------------- components/Navbar.jsx --------------------
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (option) => {
    setShowDropdown(false);
    switch (option) {
      case 'about':
        setShowAbout(true); // Show the modal instead of alert
        break;
      case 'rate':
        window.open(
          'https://forms.gle/XzroV3v9fPkh1EGh6',
          '_blank'
        );
        break;
      case 'feedback':
        window.open(
          'https://forms.gle/MbHF4Ndek1GisUw76',
          '_blank'
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <nav className="navbar">
        <h1 className="navbar-title">WebNote</h1>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          {!isLoggedIn && <Link to="/register">Register</Link>}
          {!isLoggedIn && <Link to="/login">Login</Link>}
          {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
          {isLoggedIn && <button onClick={handleLogout}>Logout</button>}

          {/* More Button and Dropdown */}
          <div className="more-options">
            <button className="more-btn" onClick={toggleDropdown}>☰ More</button>
            {showDropdown && (
              <div className="dropdown-box">
                <p onClick={() => handleOptionClick('about')}>About Us</p>
                <p onClick={() => handleOptionClick('rate')}>Rate Us</p>
                <p onClick={() => handleOptionClick('feedback')}>Feedback</p>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* About Us Modal */}
      {showAbout && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>About WebNote</h2>
            <p>
              WebNote is a secure and user-friendly file management application
              designed for storing, managing, and accessing your personal files
              from anywhere. Built with privacy and simplicity in mind.
            </p>
            <button onClick={() => setShowAbout(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;