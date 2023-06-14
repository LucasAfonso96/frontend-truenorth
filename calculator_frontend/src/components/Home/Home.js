import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ isLoggedIn }) => {
  return (
    <div className="container mt-5 text-center">
    
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/calculator">
              <button className="btn btn-primary mt-3 px-md-4">Go to Calculator</button>
            </Link>
            <Link style={{marginLeft : '50px'}} to="/records">
              <button className="btn btn-primary mt-3 px-md-4">View User Records</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-primary mt-3 px-md-4">Login</button>
            </Link>
            <Link style={{marginLeft : '50px'}} to="/register">
              <button className="btn btn-primary mt-3 px-md-4">Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
