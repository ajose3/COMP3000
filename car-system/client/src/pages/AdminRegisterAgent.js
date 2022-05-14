import React, { useState } from 'react';
import "./AdminRegisterAgent.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AdminRegisterAgent() {

  const [agentRegUsername, setAgentRegUsername] = useState("");
  const [agentRegPassword, setAgentRegPassword] = useState("");

  let navigate = useNavigate();

  const registerAgent = () => {
    const data = { Username: agentRegUsername, Password: agentRegPassword };
    axios.post("http://localhost:3001/admins/regAgent", data).then((response) => {
      if (response.data.error) {
        toast.error(response.data.error);
      }
      else {
        console.log(data);
        navigate("/adminMenu");
        toast.success("Registration Success");
      }
    });
  };

  return (
    <div>
    <h2>Please Enter the following information to register an admin:</h2>
    <label>Username: </label>
    <input type="text"
    onChange={(event) => {
      setAgentRegUsername(event.target.value);
    }}
    />

    <label>Password: </label>
    <input type="password"
    onChange={(event) => {
      setAgentRegPassword(event.target.value);
    }}
    />

    <button onClick={registerAgent}>Login</button>
  </div>
  );
}

export default AdminRegisterAgent;