import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Vehicle.css';
import { toast } from 'react-toastify';
import { AuthContext } from '../helpers/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Vehicle() {



    // Defining variables
    let { RegPlate } = useParams();
    const [vehicleObject, setVehicleObject] = useState({});
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const { authState } = useContext(AuthContext);

  

    let navigate = useNavigate();


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
          const reviewToAdd = { Review: newReview, FirstName: response.data.FirstName };
          setReviews([...reviews, reviewToAdd])
          setNewReview("");
          toast.success("Review Submitted Successfully");
          navigate("/");
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
          toast.success("Review Deleted Successfully");
          navigate("/");
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
        <div className='rentBtn'>
          <button onClick={() => {navigate(`/rentPage/${vehicleObject.RegPlate}`)}}>Rent This Car</button>
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
              <label>Review From: {review.FirstName}</label>
              {authState.FirstName === review.FirstName && (
                <button onClick={() => {deleteReview(review.id)}}> X</button>)}
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