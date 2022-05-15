import React, { useEffect, useState, useContext } from 'react';
import "./EditCustomer.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Registration.css';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { AuthContext } from '../helpers/AuthContext';
import DatePicker from "react-datepicker";


function EditCustomer() {

    let { CustomerID } = useParams(); 
    let navigate = useNavigate();
    const [customerObject, setCustomerObject] = useState({});
    const { authState } = useContext(AuthContext);

    const [DrivingLicenseNumber, setDLNumber] = useState("");
    const [Address, setAddress] = useState("");
    const [DateOfBirth, setDOB] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");

    const changeDetails = () => {
        axios.put("http://localhost:3001/auth/editInfo", { 
            DrivingLicenseNumber: DrivingLicenseNumber, 
            Address: Address,
            DateOfBirth: DateOfBirth,
            PhoneNumber: PhoneNumber, 
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
                toast.success("Successfully Updated Details");
                navigate("/");
            }
        })
    };
    

  return (
    <div className='changepassword'>
        <h1>Edit your details: </h1>
        <label>Old Password:</label>
        <input type="text" placeholder="DrivingLicenseNumber..." onChange={(event) => {setDLNumber(event.target.value);}} />
        <label>New Password:</label>
        <input type="text" placeholder="Address..." onChange={(event) => {setAddress(event.target.value);}} />
        <label>New Password:</label>
        <input type="date" placeholder="Date of Birth..." onChange={(event) => {setDOB(event.target.value);}} />
        <label>New Password:</label>
        <input type="text" placeholder="Phone Number..." onChange={(event) => {setPhoneNumber(event.target.value);}} />
        <button onClick={changeDetails}>Save Changes</button>
    </div>
  )
}

export default EditCustomer;