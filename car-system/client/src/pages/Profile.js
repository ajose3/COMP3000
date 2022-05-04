import React, { useEffect, useState, useContext } from 'react';
import "./Profile.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

function Profile() {

    let { CustomerID } = useParams(); 
    let navigate = useNavigate();

    const [customerObject, setCustomerObject] = useState({});
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/userInfo/${CustomerID}`).then((response) => {
            setCustomerObject(response.data);
        })
    }, []);

  return (
    <div className="profilePageContainer">
        <div className="userInfo">
            <h1> Email: {customerObject.Email} </h1>
            <h1>ID: {customerObject.CustomerID}</h1>
            <button className='changepButton' onClick={() => navigate("/changepassword")}>Change Password</button>
        </div>
    </div>
  )
}

export default Profile;