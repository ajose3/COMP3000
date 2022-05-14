import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import "./Preparation.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Preparation() {

    let { RentingID } = useParams();

    const initialValues = {
        VehicleReadyDate: "",
        PickUp: "",
        DropOff: "",
        Status: "",
        RentalRentingID: RentingID,
    };
    
    const validationSchema = Yup.object().shape({
        VehicleReadyDate: Yup.string(),
        PickUp: Yup.string(),
        DropOff: Yup.string(),
        Status: Yup.string(),
    });

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    let navigate = useNavigate();


    // Function to register the customer
    const onSubmit = (data) => {
    axios.post(`http://localhost:5001/agents/${RentingID}`, data, {RentalRentingID: RentingID}).then((response) => {
        if (response.data.error) {
            toast.error(response.data.error)
        } else {
            console.log(data);
            navigate("/agentHome");
            toast.success("Registration Success");
        }
    });
};


  return (
    <div>
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
        <Form className="registerCustomer">
            <h2>Please Enter the preparation details for the reservation:</h2>

            <label>The vehicle will be ready by: </label>
            <ErrorMessage name="VehicleReadyDate" component="span" />
            <input
            type="date" 
            id="VehicleReadyDate" 
            autoComplete="off"
            min={disablePastDate()}
            name="VehicleReadyDate" 
            />

            <label>PickUp: </label>
            <ErrorMessage name="PickUp" component="span" />
            <select 
            id="PickUp"
            type="text" 
            name="PickUp">
                <option>Plymouth</option>
                <option>Exeter</option>
                <option>Bristol</option>
            </select> 
            

            <label>DropOff: </label>
            <ErrorMessage name="DropOff" component="span" />
            <select 
            id="DropOff"
            type="text" 
            name="DropOff" 
            >
                <option>Plymouth</option>
                <option>Exeter</option>
                <option>Bristol</option>
            </select>

            <label>Status: </label>
            <ErrorMessage name="Status" component="span" />
            <select id="Status"
            type="Status" 
            name="Status">
            <option>Ready</option>
            <option>Not Ready</option>
            </select>
    
            <button type="submit">Submit Details</button>
        </Form>
    </Formik>
</div>
  )
}

export default Preparation;