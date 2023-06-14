import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import './Register.css';

function Register() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.apiUrl}/api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have successfully registered.',
          timer: 2000, 
          showConfirmButton: true,
        });
  
        navigate('/login'); 
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Error',
          text: 'Registration failed',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 offset-3">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary col-6 offset-3">Register</button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
