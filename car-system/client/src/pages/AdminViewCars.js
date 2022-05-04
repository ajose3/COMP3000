import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./AdminViewCars.css";
import { toast } from 'react-toastify';


const AdminViewCars = () => {

    // // Defining variables
    const [listOfVehicles, setListOfVehicles] = useState([]);
    let navigate = useNavigate();

    const loadData = async () => {
      const response = await axios.get("http://localhost:3001/vehicles");
      setListOfVehicles(response.data);
  };

  // Calling API Routes
  useEffect(() => {
    loadData();
  }, []);

  const deleteVehicle = (RegPlate) => {
    if (window.confirm("Are you sure you want to delete this vehicle ?")) {
      axios.delete(`http://localhost:3001/vehicles/${RegPlate}`);
      toast.success("Car Deleted Successfully");
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <div>
    <h2>Current fleet: </h2>
    <Link to="/addEditVehicle">
        <button className="btn btn-edit">Add Vehicle</button>
    </Link>
    <Link to="/adminMenu">
        <button className="btn btn-view">Back to Menu</button>
    </Link>
    {listOfVehicles.map((value, key) => {
    return (
      <div className="vehicle" key={key}>
        <div className="carMake">
          {value.RegPlate} : {value.CarMake} {value.CarModel} {value.CarYear} 
          <button onClick={() => {navigate(`/editVehicle/${value.RegPlate}`)}}>Edit</button>
          <button onClick={() => deleteVehicle(value.RegPlate)}>Delete Vehicle</button>
        </div>
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