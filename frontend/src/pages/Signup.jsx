import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { handleError, handleSuccess } from '../Util';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
           return handleError("Name, email, and password are required.");
        
        }

        try {
            const url = "http://localhost:8080/auth/signUp";
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupInfo),
            });

        
            const result = await response.json();
            const {success, message, error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                     navigate('/login');
                },1000)
            }
            else if(error){
                const errorMessage = error?.details[0].message;
                handleError(errorMessage);
            }
            else{
                handleError(message);
            }
            console.log(result);

        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <div className='container'>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" onChange={handleChange} name="name" autoFocus placeholder="Enter your name..." />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" onChange={handleChange} name="email" placeholder="Enter your email..." />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={handleChange} name="password" placeholder="Enter your password..." />
                </div>

                <button type="submit">Sign Up</button>
                <span>
                    Already have an account? <Link to='/login'>Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
