import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Vehicle.css';
import './AllVehicles';
import { toast } from 'react-toastify';

function Vehicle() {

    // Defining variables
    let { RegPlate } = useParams();
    const [vehicleObject, setVehicleObject] = useState({});
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");

    // Calling API Routes
    useEffect(() => {
      // Get details of the vehicle
      axios.get(`http://localhost:3001/vehicles/byReg/${RegPlate}`).then((response) => {
        setVehicleObject(response.data);
      });

      //Get Review details for the vehicle
      axios.get(`http://localhost:3001/reviews/${RegPlate}`).then((response) => {
        setReviews(response.data);
      });
    }, []);

    // Function to create a review
    const addReview = () => {
      axios.post("http://localhost:3001/reviews", {Review: newReview, VehicleRegPlate: RegPlate})
      .then((response) => {
        const reviewToAdd = { Review: newReview };
        setReviews([...reviews, reviewToAdd])
        setNewReview("");
      })
      .catch((err) => toast.error(err.response.data));
      toast.success("Review Submitted Successfully");
    }

  return (
    <div className="vehiclePage">
      <div className="leftSide">
        <div className='vehicle' id='individual'>
          <div className="carMake"> <h1> {vehicleObject.CarMake} {vehicleObject.CarModel} {vehicleObject.CarYear} </h1> </div>
          <div className="carImage"><img src={vehicleObject.CarImage} width="50%"/></div>
          <div className="carPrice"> <p> Daily Price: £{vehicleObject.CarPrice} </p> </div>
          <div className="carCategory"> <p> Category: {vehicleObject.CarCategory} </p></div>
          <div className="carTransmission"> <p> Transmission: {vehicleObject.CarTransmission} </p> </div>
          <div className="seats"> <p> No. of seats: {vehicleObject.CarSeats} </p> </div>
        </div>
      </div>
      <div className='rightSide'>
        <div className='addReviewContainer'>
          <input type="text" placeholder="Review..." value={newReview} onChange={(event) => {setNewReview(event.target.value)}} />
          <button onClick={addReview}> Submit Review </button>
        </div>
        <div className='listOfReviews'>
          {reviews.map((review, key) => {
            return (
            <div key={key} className='review'>
              {review.Review}
            </div>
            );
          })}
        </div>
      </div>
    </div>
    
  )
}

export default Vehicle;