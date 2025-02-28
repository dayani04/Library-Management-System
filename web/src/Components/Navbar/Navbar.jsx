import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: ' #ac6d06' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">EVENTSPHERE</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link button-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link button-link" to="/AdminLogin">Admin</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link button-link" to="/UserLogin">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link button-link" to="/UserRegister">User</Link>
              </li>
            
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
