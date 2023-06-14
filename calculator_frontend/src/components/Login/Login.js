import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import config from '../../config';

function Login({ handleLogin }) {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch(`${config.apiUrl}/api/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 401){
            throw new Error('Invalid email or password');
          } else if (response.status === 403) {
            throw new Error('User is not active');
          } else {
            throw new Error('An error occurred. Please try again.');
          }
        })
        .then(data => {
          const { token } = data;
          localStorage.setItem('authToken', token);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have successfully logged in.',
            showConfirmButton: true,
          });
          handleLogin();
          navigate('/calculator');
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Login Error',
            text: error.message,
          });
        });
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 offset-3">
          <h2>Login</h2>
         
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary col-6 offset-3">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
