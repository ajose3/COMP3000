import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Vehicle.css';
import './AllVehicles';
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

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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
              <label> By: {review.FirstName}</label>
              {authState.FirstName === review.FirstName && (
                <button onClick={() => {deleteReview(review.id)}}> X</button>)}
            </div>
            );
          })}
        </div>
      </div>
      <div className='bottomSide'>
      <h2>Rent this car: </h2>
          <label>Start Date: </label>
          <DatePicker 
            selected={startDate} 
            onChange={date => setStartDate(date)}
            dateFormat='dd/MM/yyyy' 
            minDate={new Date()}
            filterDate={date => date.getDay() !== 0}
          />
          <label>End Date: </label>
          <DatePicker 
            selected={endDate} 
            onChange={date => setEndDate(date)}
            dateFormat='dd/MM/yyyy' 
            minDate={startDate}
            filterDate={date => date.getDay() !== 0}
          />

          <br />
          <br />

          <label>Pick-up location: </label>
          <select>
            <option>Plymouth</option>
            <option>Exeter</option>
            <option>Bristol</option>
          </select>
          
          <br />
          
          <label>Drop-off location: </label>
          <select>
            <option>Plymouth</option>
            <option>Exeter</option>
            <option>Bristol</option>
          </select>

          <br />
          <br />

          <label>Price: </label>
          <label>£ 100.00</label>

          <br />
          <br />

          <button>Check Availability</button>

          <br />
          <br />
          <label>Availability: </label>
          <label>Available</label>
      </div>
    </div>
    
  )
}

export default Vehicle;