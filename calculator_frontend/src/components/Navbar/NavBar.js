import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark ">
      <div className="container">
        <NavLink className="navbar-brand" to="/" activeClassName="active">
          Home
        </NavLink>
        <div style={{maxWidth: '500px'}}>
          <ul className="navbar-nav   ml-auto">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" activeClassName="active">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register" activeClassName="active">
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/calculator" activeClassName="active">
                    Calculator
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/records" activeClassName="active">
                    UserRecords
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" style={{color: 'var(--bs-nav-link-color)'}} onClick={handleLogout}>
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
