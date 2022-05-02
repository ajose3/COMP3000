import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./AdminViewCars.css";


const AdminViewCars = () => {

    // // Defining variables
    const [listOfVehicles, setListOfVehicles] = useState([]);
    let navigate = useNavigate();

    // Calling API Routes
  useEffect(() => {
    // Get all vehicles
    axios.get("http://localhost:3001/vehicles").then((response) => {
      setListOfVehicles(response.data);
    });
  }, []);

  return (
    <div>
    <h2>Current fleet: </h2>
    <Link to="/addEditVehicle">
        <button className="btn btn-edit">Add Vehicle</button>
    </Link>
    {listOfVehicles.map((value, key) => {
    return (
      <div className="vehicle" key={key} onClick={() => {navigate(`/vehicle/${value.RegPlate}`)}}>
        <div className="carMake"> {value.CarMake} {value.CarModel} {value.CarYear} </div>
        <div className="carImage"><img src={value.CarImage} height={200} width={350} /></div>
        <div className="carPrice">Price: £{value.CarPrice}</div>
        <div className="carCategory">{value.CarCategory}</div>
        <div className="carTransmission">{value.CarTransmission}</div>
      </div>
    );
  })}
</div>
  )
}

export default AdminViewCars;