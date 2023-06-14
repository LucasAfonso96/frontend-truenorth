import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes  } from 'react-router-dom';
import Calculator from './components/Calculator/Calculator';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Navbar from './components/Navbar/NavBar';
import UserRecords from './components/UserRecords/UserRecords';
import config from './config';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = async () => {
    const response = await fetch(`${config.apiUrl}/api/logout/`, {
      method: 'GET',
    });

    if (response.ok) {
      setLoggedIn(false);
    } else {
      // Handle error case
    }
  };
      
  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={<Home isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/login"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={!isLoggedIn ? <Register/> : <Navigate to="/login" replace />}
          />
         <Route
          path="/calculator"
          element={<Calculator isLoggedIn={isLoggedIn} />}
         />
          <Route
          path="/records"
          element={<UserRecords isLoggedIn={isLoggedIn} />}
         />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
