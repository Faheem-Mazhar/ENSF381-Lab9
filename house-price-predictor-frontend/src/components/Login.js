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
    e.preventDefault();
    
    // Validate inputs
    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);
    
    if (!isUsernameValid || !isPasswordValid) {
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/validate_login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            navigate('/houseprediction');
        } else {
            const data = await response.json();
            setStatus({ 
                type: 'error', 
                message: data.message || 'Login failed. Please check your credentials.' 
            });
        }
    } catch (error) {
        setStatus({ 
            type: 'error', 
            message: 'An error occurred. Please try again later.' 
        });
    }
};

  return (
    <div className='login-page'>
        <div className='login-form'>
            <h1>Login - House Price Predictor</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            validateUsername(e.target.value);
                        }}
                        placeholder="Enter your username"
                    />
                    {usernameError && <span className="error">{usernameError}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                        placeholder="Enter your password"
                    />
                    {passwordError && <span className="error">{passwordError}</span>}
                </div>
                {status.message && (
                    <div className={`status-message ${status.type}`}>
                        {status.message}
                    </div>
                )}
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

