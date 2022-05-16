import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './AgentAddVehicle.css';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AgentAddVehicle() {

    // Setting initial values
    const initialValues = {
        RegPlate: "",
        CarMake: "",
        CarModel: "",
        CarYear: "",
        CarImage: "",
        CarPrice: "",
        CarCategory: "",
        CarTransmission: "",
        CarSeats: "",
    };

    let navigate = useNavigate();

    // Validation when registering the number plate of the vehicle
    const validationSchema = Yup.object().shape({
        RegPlate: Yup.string().max(7).required(),
        CarMake: Yup.string().required(),
        CarModel: Yup.string().required(),
        CarYear: Yup.string().required(),
        CarImage: Yup.string().required(),
        CarPrice: Yup.string().required(),
        CarCategory: Yup.string().required(),
        CarTransmission: Yup.string().required(),
        CarSeats: Yup.string().required(),
    });
    
    // Function to register vehicle
    const onSubmit = (data) => {
        axios.post("http://localhost:5001/vehicles", data).then((response) => {
            if (response.data.error) {
                toast.error(response.data.error)
            } else {
                navigate("/agentViewCars");
                toast.success("Registration Success");
            }
        });
    };


  return (
    <div>
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
        <Form className="addCar">
            <h2>Please Enter the following information to addCar:</h2>
            <label>Registration Plate: </label>
            <ErrorMessage name="RegPlate" component="span" />
            <Field 
            id="RegPlate" 
            autoComplete="off"
            name="RegPlate" 
            placeholder="Ex. AB15CDE" 
            />
            <br />
            <br />

            <label>Car Make: </label>
            <ErrorMessage name="CarMake" component="span" />
            <Field 
            id="CarMake" 
            autoComplete="off"
            name="CarMake" 
            placeholder="Ex. BMW or Mercedes" 
            />
            <br />
            <br />

<           label>Car Model: </label>
            <ErrorMessage name="CarModel" component="span" />
            <Field 
            id="CarModel" 
            autoComplete="off"
            name="CarModel" 
            placeholder="Ex. C Class" 
            />
            <br />
            <br />

            <label>Car Year: </label>
            <ErrorMessage name="CarYear" component="span" />
            <Field 
            id="CarYear" 
            autoComplete="off"
            name="CarYear" 
            placeholder="Ex. 2015" 
            />
            <br />
            <br />

            <label>Car Image: </label>
            <ErrorMessage name="CarImage" component="span" />
            <Field 
            id="CarImage" 
            autoComplete="off"
            name="CarImage" 
            placeholder="Ex. image" 
            />
            <br />
            <br />

            <label>Car Price: </label>
            <ErrorMessage name="CarPrice" component="span" />
            <Field 
            id="CarPrice" 
            type="number"
            step="0.01"
            autoComplete="off"
            name="CarPrice" 
            placeholder="£89.99" 
            />
            <br />
            <br />

            <label>Car Category: </label>
            <ErrorMessage name="CarCategory" component="span" />
            <Field 
            id="CarCategory" 
            autoComplete="off"
            name="CarCategory" 
            placeholder="Ex. SUV" 
            />
            <br />
            <br />

            <label>Car Transmission: </label>
            <ErrorMessage name="CarTransmission" component="span" />
            <Field 
            id="CarTransmission" 
            autoComplete="off"
            name="CarTransmission" 
            placeholder="Ex. Automatic" 
            />
            <br />
            <br />

            <label>Car Seats: </label>
            <ErrorMessage name="CarSeats" component="span" />
            <Field 
            id="CarSeats" 
            autoComplete="off"
            name="CarSeats" 
            placeholder="Ex. 5" 
            />
            <br />
            <br />

            
            <button type="submit">Register</button>
        </Form>
    </Formik>
</div>
  )
}

export default AgentAddVehicle;