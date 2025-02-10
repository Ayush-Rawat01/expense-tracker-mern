import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { handleError, handleSuccess } from '../Util';

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Email, and Password are required.");
    }

    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });


      const result = await response.json();
      const { success, message, jwtToken, name,  error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser",name);

        setTimeout(() => {
          navigate('/home');
        }, 1000)
      }
      else if (error) {
        const errorMessage = error?.details[0].message;
        handleError(errorMessage);
      }
      else {
        handleError(message);
      }
      console.log(result);

    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>

        <div>
          <label htmlFor="email">Email</label>
          <input type="text" onChange={handleChange} name="email" placeholder="Enter your email..." />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" onChange={handleChange} name="password" placeholder="Enter your password..." />
        </div>

        <button type="submit">Login </button>
        <span>
          Create an account? <Link to='/signup'>Sign Up</Link>
        </span>

      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
