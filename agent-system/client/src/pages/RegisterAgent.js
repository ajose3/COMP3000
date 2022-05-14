import "./RegisterAgent.css";
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function RegisterAgent() {

  const initialValues = {
    Username: "",
    Password: "",
};

let navigate = useNavigate();

// Validation when customers are registering
const validationSchema = Yup.object().shape({
    Username: Yup.string().required(),
    Password: Yup.string().min(4).max(20).required(),
  });

// Function to register the customer
const onSubmit = (data) => {
    axios.post("http://localhost:5001/agents/regAgent", data).then((response) => {
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
                <h2>Please Enter the following information to register:</h2>

                <label>Username: </label>
                <ErrorMessage name="Username" component="span" />
                <Field 
                id="registerUsername" 
                autoComplete="off"
                name="Username" 
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

export default RegisterAgent;