import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {

  const [adminRegUsername, setAdminRegUsername] = useState("");
  const [adminRegPassword, setAdminRegPassword] = useState("");

  let navigate = useNavigate();

  const registerAdmin = () => {
    const data = { Username: adminRegUsername, Password: adminRegPassword };
    axios.post("http://localhost:3001/admins", data).then((response) => {
      if (response.data.error) {
        toast.error(response.data.error);
      }
      else {
        console.log(data);
        navigate("/adminViewAdmins");
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
        setAdminRegUsername(event.target.value);
      }}
      />

      <label>Password: </label>
      <input type="password"
      onChange={(event) => {
        setAdminRegPassword(event.target.value);
      }}
      />

      <button onClick={registerAdmin}>Login</button>
    </div>
  )
};

export default AdminRegister;