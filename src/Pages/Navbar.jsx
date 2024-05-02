import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import CSS for Navbar styles

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        {/* Logo or site title (optional) */}
        <Link to="/" className="site-title">
          BlogIt
        </Link>
        {/* Navigation links */}
        <div className="nav-links">
          <Link to="/" className="nav-link" activeClassName="active">
            Home
          </Link>
          <Link to="/bookmarks" className="nav-link" activeClassName="active">
            Bookmarks
          </Link>
          <Link to="/create" className="nav-link" activeClassName="active">
            Create Blog
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
