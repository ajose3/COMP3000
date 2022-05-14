import React, { useState, useContext, useEffect } from 'react';
import "./AgentLogin.css";
import { useNavigate } from 'react-router-dom';
import { AgentContext } from '../helpers/AgentContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AgentLogin() {

    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    let navigate = useNavigate();

    // Login function for customer
    const loginAgent = () => {
        const data = { Username: Username, Password: Password };
        axios.post("http://localhost:3001/agents/login", data).then((response) => {
          if (response.data.error) {
            toast.error(response.data.error);
          } else {
            localStorage.setItem("agentToken", response.data.token);
            toast.success("Login Success");
            navigate("/agentMenu");
          }
        });
      };

  return (
    <div className="login">
    <h2>Agent Login: Enter credentials to login:</h2>
    <label>Username:</label>
    <input type="text" 
    onChange={(event) => {setUsername(event.target.value);
    }}
    />
    <label>Password:</label>
    <input type="password"
    autoComplete="on" 
    onChange={(event) => {setPassword(event.target.value);
    }} 
    />
    <button onClick={loginAgent}>Login</button>
    <br /><br />
    <br /><br />
</div>
  )
}

export default AgentLogin;