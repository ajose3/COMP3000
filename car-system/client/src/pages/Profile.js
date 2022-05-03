import React, { useEffect, useState } from 'react';
import "./Profile.css";
import { useParams } from "react-router-dom";
import axios from 'axios';

function Profile() {

    let { CustomerID } = useParams(); 

    const [customerObject, setCustomerObject] = useState({});

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
        </div>
    </div>
  )
}

export default Profile;