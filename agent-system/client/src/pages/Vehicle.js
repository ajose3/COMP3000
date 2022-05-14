import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Vehicle.css';
import { toast } from 'react-toastify';

function Vehicle() {



    // Defining variables
    let { RegPlate } = useParams();
    const [vehicleObject, setVehicleObject] = useState({});
    const [reviews, setReviews] = useState([]);

  

    let navigate = useNavigate();


    // Calling API Routes
    useEffect(() => {
      // Get details of the vehicle
      axios.get(`http://localhost:5001/vehicles/byReg/${RegPlate}`).then((response) => {
        setVehicleObject(response.data);
      });

      //Get Review details for the vehicle
      axios.get(`http://localhost:5001/reviews/${RegPlate}`).then((response) => {
        setReviews(response.data);
      });
    }, []);

  
    
    // Function to delete a review
    const deleteReview = (id) => {
      axios
        .delete(`http://localhost:5001/reviews/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
          setReviews(
            reviews.filter((val) => {
              return val.id != id;
            })
          );
          toast.success("Review Deleted Successfully");
          navigate("/agentHome");
        });
    };



  return (
    <div className="vehiclePage">
      
      <div className="leftSide">
        <div className='vehicle' id='individual'>
            <div className="carMake"> {vehicleObject.CarMake} {vehicleObject.CarModel} {vehicleObject.CarYear} </div>
            <div className="carImage"><img src={vehicleObject.CarImage} height={200} width={350} /></div>
        </div>
        <div className='extraInfo'>
            <div className='specs'>Specifications: </div>
            <div className="carCategory">Category: {vehicleObject.CarCategory}</div>
            <div className="carTransmission">Transmission: {vehicleObject.CarTransmission}</div>
            <div className="carPrice">Price: £{vehicleObject.CarPrice}</div>
            <div className='carSeats'>No. of Seats: {vehicleObject.CarSeats} seats</div>
        </div>
        
      
      
      </div>
      <div className='rightSide'>
        <div className='addReviewContainer'>
        </div>
        <div className='listOfReviews'>
          {reviews.map((review, key) => {
            return (
            <div key={key} className='review'>
              <label>Review From: {review.FirstName}</label>
                <button className="btn btn-delete" onClick={() => {deleteReview(review.id)}}> Delete</button>
                <br />
                <br />
              "{review.Review}"
            </div>
            );
          })}
        </div>
      </div>
    </div>
    
  )
}

export default Vehicle;