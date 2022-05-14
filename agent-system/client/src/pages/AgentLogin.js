import React from 'react';
import "./AgentLogin.css";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";


function AgentLogin() {

    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const {setAuthState} = useContext(AuthContext);

    let navigate = useNavigate();

    // Login function for customer
    const loginAgent = () => {
        const data = { Username: Username, Password: Password };
        axios.post("http://localhost:5001/agents/login", data).then((response) => {
          if (response.data.error) {
            toast.error(response.data.error);
          } else {
            localStorage.setItem("accessToken", response.data.token);
            setAuthState({ Username: response.data.Username, AgentID: response.data.AgentID, status: true, });
            toast.success("Successfully logged in");
            navigate("/agentHome");
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