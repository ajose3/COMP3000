import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    let navigate = useNavigate();

    const login = () => {
        const data = { Email: Email, Password: Password };
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            sessionStorage.setItem("accessToken", response.data);
            navigate("/");
          }
        });
      };

  return (
    <div className="login">
        <form>
            <h2>Enter credentials to login:</h2>
            <label>Username:</label>
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
        </form>
    </div>
  )
}

export default Login;