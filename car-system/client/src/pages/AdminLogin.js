import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {

    const [adminUsername, setAdminUsername] = useState("");
    const [adminPassword, setAdminPassword] = useState("");

    let navigate = useNavigate();

    // Login function for Admin
    const loginAdmin = () => {
        const data = { Username: adminUsername, Password: adminPassword };
        axios.post("http://localhost:3001/admins/login", data).then((response) => {
            if (response.data.error) {
                console.log(response.data.error);
                toast.error(response.data.error);
            } else {
                console.log(data);
                toast.success("Registration Success");
                navigate("/adminMenu");
            }
        });
    };

  return (
    <div className="loginContainer">
        <label>Username: </label>
        <input type="text"
        onChange={(event) => {
            setAdminUsername(event.target.value);
        }} 
        />
        <label>Password: </label>
        <input type="password"
        onChange={(event) => {
            setAdminPassword(event.target.value);
        }}
        />

        <button onClick={loginAdmin}>Login</button>
    </div>
  )
};

export default AdminLogin;