import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import { toast } from 'react-toastify';

function Login() {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const { setAuthState } = useContext(AuthContext); 

    let navigate = useNavigate();

    // Login function for customer
    const login = () => {
        const data = { Email: Email, Password: Password };
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
          if (response.data.error) {
            toast.error(response.data.error);
          } else {
            localStorage.setItem("accessToken", response.data.token);
            setAuthState({ 
              Email: response.data.Email, 
              CustomerID: response.data.CustomerID, 
              status: true, 
            });
            toast.success("Login Success");
            navigate("/");
          }
        });
      };

  return (
    <div className="login">
            <h2>Enter credentials to login:</h2>
            <label>Email Address:</label>
            <input type="text" 
            onChange={(event) => {setEmail(event.target.value);
            }}
            />
            <label>Password:</label>
            <input type="password"
            autoComplete="on" 
            onChange={(event) => {setPassword(event.target.value);
            }} 
            />
            <button onClick={login}>Login</button>
            <br /><br />
            <br /><br />
            <label className="newAccount">Don't have an account? Create one following the link below</label>
            <Link to="/registration">Sign Up</Link>
    </div>
  )
}

export default Login;