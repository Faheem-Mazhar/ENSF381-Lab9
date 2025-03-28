import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Loginpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [status, setStatus] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
  };

  const validateUsername = (value) => {
    if (!value.trim()) {
        setUsernameError("Username or email is required");
        return false;
    }
    setUsernameError("");
    return true;
};

const validatePassword = (value) => {
    if (!value) {
        setPasswordError("Password is required");
        return false;
    }
    if (value.length < 8) {
        setPasswordError("Password must be at least 8 characters");
        return false;
    }
    setPasswordError("");
    return true;
};

const handleLogin = async (e) => {

};

  return (
    <div className='login-page'>
        <div className='login-form'>
            <h1>
            LMS Login
            </h1>
            <form onSubmit={handleLogin}>
            <div className="form-group">
                <input
                type="text"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                    validateUsername(e.target.value);
                }}
                placeholder="Enter your email or username here"
                />
                {usernameError && <span className="error">{usernameError}</span>}
            </div>
            <div className="form-group">
                <input
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                }}
                placeholder="Enter your password here"
                />
                {passwordError && <span className="error">{passwordError}</span>}
            </div>
            <button type='submit'>Login</button>
            </form>
            <div className='login-links'>
            <p>
                Forgot Password? <Link to='/forgotpassword'>Reset Password</Link>
            </p>
            <p>
                Don't have an account? <Link to='/register'>Register</Link>
            </p>
            </div>
        </div>
    </div>
  );
}

export default Loginpage;

