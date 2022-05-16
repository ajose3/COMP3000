import React, { useState, useContext } from 'react';
import "./ChangePassword.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function ChangePassword() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState(""); 

    let navigate = useNavigate();

    const changePassword = () => {
        axios.put("http://localhost:5001/agents/changepassword", { 
            oldPassword: oldPassword, 
            newPassword: newPassword, 
        },
        {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }
        ).then((response) => {
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success("Successfully changed password");
                navigate("/agentHome");
            }
        })
        
    };

  return (
    <div className='changepassword'>
    <h1>Change Your Password: </h1>
    <label>Old Password:</label>
    <input type="password" placeholder="Old Password..." onChange={(event) => {setOldPassword(event.target.value);}} />
    <label>New Password:</label>
    <input type="password" placeholder="New Password..." onChange={(event) => {setNewPassword(event.target.value);}} />
    <button onClick={changePassword}>Change Password</button>
</div>
  )
}

export default ChangePassword;