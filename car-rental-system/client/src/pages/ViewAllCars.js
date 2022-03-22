import React, { useState, useEffect } from 'react';
import "./ViewAllCars.css";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";

// Need to make sure each object has it's own unique key

const ViewAllCars = () => {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/getallcars");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

  return (
      <div className="home">
          {data.map((carInfo) => {
              return(
                  <div className="car-preview" key={carInfo.RegPlate}>   
                      <h2>{carInfo.CarBrand}</h2>
                      <p>{carInfo.CarModel}</p>
                      <img src={carInfo.ImageUrl} height={200} width={350}/>
                      <p>Price per day: £{carInfo.Price}</p>
                      <Link to={`/viewcar/${carInfo.RegPlate}`}>
                        <button>View Car</button>
                      </Link>
                  </div>
              )
          })}
      </div>
  );
};

export default ViewAllCars;