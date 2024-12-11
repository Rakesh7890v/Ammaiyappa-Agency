import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png';

const Header = () => {
  const [isHam, setIsHam] = useState(window.innerWidth <= 450);
  const [contact, setContact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsHam(window.innerWidth <= 450);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleContact = () => setContact(true);
  const handleTimes = () => setContact(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="header-container">
      <div className="left-head">
        <img src={logo} alt="Logo" />
      </div>

      {isHam ? (
        <>
          <i className="fas fa-bars" onClick={toggleMenu}></i>
          {menuOpen && (
            <div className="hamburger-menu">
              <ul>
                <li><Link to="/" className="link" onClick={toggleMenu}>Home</Link></li>
                <li onClick={handleContact}>Contact</li>
                <li><Link to="/" className="link" onClick={toggleMenu}>About</Link></li>
                <li><Link to="/login" className="link" onClick={toggleMenu}>Login</Link></li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <div className="right-head">
          <nav>
            <ul>
              <li><Link to="/" className="link">Home</Link></li>
              <li onClick={handleContact}>Contact</li>
              <li><Link to="/login" className="link">Login</Link></li>
            </ul>
          </nav>
        </div>
      )}

      {contact && (
        <div className="contacts">
          <i className="fas fa-times" onClick={handleTimes}></i>
          <p>Mobile: +91 8300605397</p>
          <p> LinkedIn:{" "} <a href="https://www.linkedin.com/in/ammaiyappa-agency-a4319a336/" target="_blank" rel="noopener noreferrer">ammaiyappa</a></p>
        </div>
      )}
    </div>
  );
};

export default Header;
