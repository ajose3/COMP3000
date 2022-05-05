import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Registration.css';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Registration() {

    const initialValues = {
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
    };

    let navigate = useNavigate();

    // Validation when customers are registering
    const validationSchema = Yup.object().shape({
        FirstName: Yup.string().required(),
        LastName: Yup.string().required(),
        Email: Yup.string().required(),
        Password: Yup.string().min(4).max(20).required(),
      });

    // Function to register the customer
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then((response) => {
            if (response.data.error) {
                toast.error(response.data.error)
            } else {
                console.log(data);
                navigate("/login");
                toast.success("Registration Success");
            }
        });
    };

  return (
    <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
            <Form className="registerCustomer">
                <h2>Please Enter the following information to register:</h2>
                <label>First Name: </label>
                <ErrorMessage name="FirstName" component="span" />
                <Field 
                id="FirstName" 
                autoComplete="off"
                name="FirstName" 
                placeholder="Ex. john..." 
                />
            
                <label>Last Name: </label>
                <ErrorMessage name="LastName" component="span" />
                <Field 
                id="LastName" 
                autoComplete="off"
                name="LastName" 
                placeholder="Ex. john..." 
                />

                <label>Email: </label>
                <ErrorMessage name="Email" component="span" />
                <Field 
                id="registerEmail" 
                autoComplete="off"
                name="Email" 
                placeholder="Ex. john@email.com" 
                />

                <label>Password: </label>
                <ErrorMessage name="Password" component="span" />
                <Field 
                id="registerPassword"
                type="password" 
                name="Password" 
                placeholder="Your Password..."
                />
                <button type="submit">Register</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Registration;