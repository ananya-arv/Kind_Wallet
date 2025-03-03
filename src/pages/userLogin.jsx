import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const handleLogin = () => {
    event.preventDefault();
    console.log('Login clicked');
    login();
  };

  return (
    <div className="userLogin">
      <div className="card">
        <div className="left">
          <h2>Join KindWallet!</h2>
          <span>Are you an NGO?</span>
          <Link to="/register">
            <button className="button">Register</button>
          </Link>
        </div>
        <div className="right">
          <h2>User Login</h2>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <Link to="/dashboard">
            <button className="button" onClick={handleLogin}>Login</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
