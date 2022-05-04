import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import "./EditVehicle.css";
import { toast } from 'react-toastify';

function EditVehicle() {
    // NEEDS FIXING

    let { RegPlate } = useParams();
    const [vehicleObject, setVehicleObject] = useState({});
    const [CarMake, setCarMake] = useState("");
    const [CarModel, setCarModel] = useState("");
    const [CarYear, setCarYear] = useState("");
    const [CarImage, setCarImage] = useState("");
    const [CarPrice, setCarPrice] = useState("");
    const [CarCategory, setCarCategory] = useState("");
    const [CarTransmission, setCarTransmission] = useState("");
    const [CarSeats, setCarSeats] = useState("");




    let navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:3001/vehicles/byReg/${RegPlate}`).then((response) => {
            setVehicleObject(response.data);
        });
    }, []);

    const editVehicle = () => {
        const data = { CarMake: CarMake, CarModel: CarModel, CarYear: CarYear, CarImage: CarImage, CarPrice: CarPrice, CarCategory: CarCategory, CarTransmission: CarTransmission, CarSeats: CarSeats } 
        axios.put(`http://localhost:3001/vehicles/editVehicle/${RegPlate}`, data).then((response) => {
            if (response.data.error) {
                toast.error(response.data.error);
            }
            else {
                console.log(data);
                navigate("/adminViewCars");
                toast.success("Successfully edited vehicle");
            }
        });
    };


  return (
    <div className='editCar'>
        <Link to="/adminViewCars">
            <button className="btn btn-view">Back to Fleet</button>
        </Link>

        <h1>RegPlate: {vehicleObject.RegPlate} </h1>

        <label>CarMake: </label>
        <input 
        id="CarMake" 
        autoComplete="off"
        name="CarMake" 
        defaultValue={vehicleObject.CarMake}
        onChange={(event) => {
            setCarMake(event.target.value);
        }} 
        />

        <label>CarModel: </label>
        <input
        id="CarModel" 
        autoComplete="off"
        name="CarModel" 
        defaultValue={vehicleObject.CarModel}
        onChange={(event) => {
            setCarModel(event.target.value);
        }} 
        />

        <label>CarYear: </label>
        <input 
        id="CarYear" 
        autoComplete="off"
        name="CarYear" 
        defaultValue={vehicleObject.CarYear}
        onChange={(event) => {
            setCarYear(event.target.value);
        }}
        />

        <label>CarImage: </label>
        <input 
        id="CarImage" 
        autoComplete="off"
        name="CarImage" 
        defaultValue={vehicleObject.CarImage}
        onChange={(event) => {
            setCarImage(event.target.value);
        }}
        />

        <label>CarPrice: </label>
        <input
        id="CarPrice" 
        type="number"
        step="0.01"
        autoComplete="off"
        name="CarPrice" 
        defaultValue={vehicleObject.CarPrice}
        onChange={(event) => {
            setCarPrice(event.target.value);
        }}
        />

        <label>CarCategory: </label>
        <input
        id="CarCategory" 
        autoComplete="off"
        name="CarCategory" 
        defaultValue={vehicleObject.CarCategory}
        onChange={(event) => {
            setCarCategory(event.target.value);
        }} 
        />

        <label>CarTransmission: </label>
        <input
        id="CarTransmission" 
        autoComplete="off"
        name="CarTransmission" 
        defaultValue={vehicleObject.CarTransmission}
        onChange={(event) => {
            setCarTransmission(event.target.value);
        }}
        />

        <label>CarSeats: </label>
        <input 
        id="CarSeats" 
        autoComplete="off"
        name="CarSeats" 
        defaultValue={vehicleObject.CarSeats}
        onChange={(event) => {
            setCarSeats(event.target.value);
        }} 
        />

        <button className="btn btn-edit" onClick={editVehicle}>Save Changes</button>

    </div>
  )
}

export default EditVehicle;