import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./Feedback.css";
import { AuthContext } from '../helpers/AuthContext';

function Feedback() {

    let navigate = useNavigate();

    let { RegPlate } = useParams();
    const [vehicleObject, setVehicleObject] = useState({});
    const [feedback, setFeedback] = useState([]);
    const [newFeedback, setNewFeedback] = useState("");
    const { authState } = useContext(AuthContext);

    const loadData = async () => {
        const response = await axios.get(`http://localhost:3001/feedback/${RegPlate}`);
        setFeedback(response.data);
    };

    // Calling API Routes
    useEffect(() => {
        loadData();
        // Get details of the vehicle
        axios.get(`http://localhost:3001/vehicles/byReg/${RegPlate}`).then((response) => {
          setVehicleObject(response.data);
        });
      }, []);

    // Function to create a review
    const addFeedback = () => {
        axios.post(`http://localhost:3001/feedback/${RegPlate}`, {
          FeedBack: newFeedback,
          VehicleRegPlate: RegPlate,
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
            toast.error("You cannot rent without having an account");
          } else {
            toast.success("Reserved Successfully");
            setTimeout(() => loadData(), 500);
          }
        })
        .catch((err) => toast.error(err.response.data));
      };


  return (
    <div>
        <div className='feedback'>
            <h1>Give us feedback about your journey with our {vehicleObject.CarMake} {vehicleObject.CarModel} {vehicleObject.CarYear}:</h1>
            <p>*This will remain anonymous to help us improve our services and your expericence</p>
            <input type="text" placeholder="Your Feedback..." value={newFeedback} onChange={(event) => {setNewFeedback(event.target.value)}} />
            <button onClick={addFeedback}>Submit Feedback</button>
        </div>
        <div className='listOfFeedback'>
          {feedback.map((feedback, key) => {
            return (
            <div key={key} className='feedback'>
              <p>{feedback.FeedBack}</p>
            </div>
            );
          })}
        </div>
    </div>
  )
}

export default Feedback;