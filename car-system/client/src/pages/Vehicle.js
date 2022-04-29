import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Vehicle.css';
import './AllVehicles';
import { toast } from 'react-toastify';
import { AuthContext } from '../helpers/AuthContext';

function Vehicle() {

    // Defining variables
    let { RegPlate } = useParams();
    const [vehicleObject, setVehicleObject] = useState({});
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const { authState } = useContext(AuthContext);

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
      axios.post("http://localhost:3001/reviews", {
        Review: newReview, 
        VehicleRegPlate: RegPlate
      }, 
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          toast.error("You cannot submit a review without signing up");
        } else {
        const reviewToAdd = { Review: newReview, Email: response.data.Email };
        setReviews([...reviews, reviewToAdd])
        setNewReview("");
        toast.success("Review Submitted Successfully");
        }
      })
      .catch((err) => toast.error(err.response.data));
    };

    // Function to delete a review
    const deleteReview = (id) => {
      axios
        .delete(`http://localhost:3001/reviews/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
          setReviews(
            reviews.filter((val) => {
              return val.id != id;
            })
          );
          toast.success("Comment has been deleted");
        });
    };

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
              <label> Email: {review.Email}</label>
              {authState.Email === review.Email && (
                  <button
                    onClick={() => {
                      deleteReview(review.id);
                    }}
                  >
                    X
                  </button>
                )}
            </div>
            );
          })}
        </div>
      </div>
    </div>
    
  )
}

export default Vehicle;