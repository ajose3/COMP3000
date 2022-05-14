import "./RentPage.css";
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../helpers/AuthContext';
import axios from 'axios';


function RentPage() {

    let navigate = useNavigate();

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    const { authState } = useContext(AuthContext);
    let { RegPlate } = useParams();

    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    const [pickUp, setPickUp] = useState("");
    const [dropOff, setDropOff] = useState("");
    const [vehicleObject, setVehicleObject] = useState({});

    const [days, setDays] = useState(0);
    const [totalCost, setTotalCost] = useState(0.00);


    useEffect(() => {
        // Get details of the vehicle
        axios.get(`http://localhost:3001/vehicles/byReg/${RegPlate}`).then((response) => {
          setVehicleObject(response.data);
        });
      }, []);

    // Calculate cost and number of days
    const calculateDays = () => {
        const dateOne = new Date(StartDate);
        const dateTwo = new Date(EndDate);
        const time = Math.abs(dateTwo - dateOne);
        const days = Math.ceil(time/ (1000 * 60 * 60 * 24));
        setDays(days);
        console.log(days);
        const totalCost = vehicleObject.CarPrice * days;
        setTotalCost(totalCost);
        console.log("£"+totalCost);
    }


    // Function to create a review
    const rent = () => {
      axios.post(`http://localhost:3001/rentals/${RegPlate}`, {
        StartDate: StartDate, 
        EndDate: EndDate,
        PickUp: pickUp,
        DropOff: dropOff,
        Cost: totalCost,
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
          navigate("/");
        }
      })
      .catch((err) => toast.error(err.response.data));
    };

  return (
    <div className="rentpage">
      <div className="rentDetails">
          <div className="carMake"><Link to={{ pathname: `/vehicle/${vehicleObject.RegPlate}`}}> <h1>Rent: {vehicleObject.CarMake} {vehicleObject.CarModel} {vehicleObject.CarYear} </h1></Link> </div>
          <h3>Start Date: <input type="date" id="d1" min={disablePastDate()} onChange={(event) => {setStartDate(event.target.value);}} /> </h3>
          <br />
          <h3>End Date: <input type="date" id="d2" min={StartDate} onChange={(event) => {setEndDate(event.target.value);}} /> </h3>
          <br />
          <br />
          <h3>Pick-up location: {pickUp}     </h3>
          <select onChange={(event) => {setPickUp(event.target.value);}}>
            <option>Plymouth</option>
            <option>Exeter</option>
            <option>Bristol</option>
          </select>
          <br />
          <br />
          <h3>Drop-off location:  {dropOff}  </h3>
          <select onChange={(event) => {setDropOff(event.target.value);}}>
            <option>Plymouth</option>
            <option>Exeter</option>
            <option>Bristol</option>
          </select>
          <br />
          <br />
          <button onClick={calculateDays}>Get Price</button>
          <br />
          <label>For a Duration of: { days } days</label>
          <br />
          <br />
          <label>Price: £{ totalCost }.00 </label>
          <br />
          <br />
      </div>  
          
          
          <input type="text" placeholder="card number" />
          <br />
          <input type="text" placeholder="sort code" />
          <br />
          <input type="text" placeholder="security number" />
          <br />
          <button onClick={rent}>Rent</button>   
    </div>
  )
};

export default RentPage;