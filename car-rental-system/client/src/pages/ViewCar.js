import React, { useState, useEffect } from 'react';
import {useParams, Link} from "react-router-dom";
import axios from 'axios';
import "./ViewCar.css";

const ViewCar = () => {

    const [car, setCar] = useState({});

    const {RegPlate} = useParams();

    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/getcar/${RegPlate}`)
          .then((resp) => setCar({...resp.data[0] }));
    }, [RegPlate]);

  return (
    <div className="view-single-car">
        <p>Car details</p>
        <div>
            <strong>Car Brand: </strong>
            <span>{car.CarBrand}</span>
            <br />
            <br />
            <strong>Car Model: </strong>
            <span>{car.CarModel}</span>
            <br />
            <br />
            <img src={car.ImageUrl} height={200} width={350}/>
            <br />
            <br />
            <strong>Category: </strong>
            <span>{car.Category}</span>
            <br />
            <br />
            <strong>Price: </strong>
            <span>{car.Price}</span>
            <br />
            <br />
            <strong>Location of Car: </strong>
            <span>{car.LocationOfCar}</span>
            <br />
            <br />
            <strong>Transmission: </strong>
            <span>{car.Transmission}</span>
            <br />
            <br />
            <strong>Number of Passengers: </strong>
            <span>{car.NumOfPassengers}</span>
            <br />
            <br />
            <Link to="/payment">
                <button>Rent this Car</button>
            </Link>
        </div>
    </div>
  );
};

export default ViewCar;