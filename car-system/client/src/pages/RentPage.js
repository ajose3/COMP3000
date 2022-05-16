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

    const [Name, setName] = useState("");
    const [CardNumber, setCardNumber] = useState("");
    const [SortCode, setSortCode] = useState("");
    const [SecurityNumber, setSecurity] = useState("");

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


    const rent = () => {
      if (!StartDate || !EndDate || !pickUp || !dropOff || !totalCost || !Name || !CardNumber || !SortCode || !SecurityNumber) {
        toast.error("Please follow the instructions and make details are given");
      } else {
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
      }, axios.post("http://localhost:3001/billing", {
        Cost: totalCost,
      })
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          toast.error(response.data.error);
        } else {
          toast.success("Booking has been successful and can be viewed in your portal");
          navigate(`/viewRentals/${authState.CustomerID}`);
        }
      })
      .catch((err) => toast.error(err.response.data));
      }
    };

  return (
    <div className="rentpage">
      <div className="instruction">
        <h3>Please fill in every field and press the get price to get quote</h3>
      </div>
      <div className="rentDetails">
          <div className="carMake"><Link to={{ pathname: `/vehicle/${vehicleObject.RegPlate}`}}> <h1>Rent: {vehicleObject.CarMake} {vehicleObject.CarModel} {vehicleObject.CarYear} </h1></Link> </div>
          <h3>*Start Date: <input type="date" id="d1" min={disablePastDate()} onChange={(event) => {setStartDate(event.target.value);}} /> </h3>
          <br />
          <h3>*End Date: <input type="date" id="d2" min={StartDate} onChange={(event) => {setEndDate(event.target.value);}} /> </h3>
          <br />
          <br />
          <h3>*Pick-up location: {pickUp}     </h3>
          <select onChange={(event) => {setPickUp(event.target.value);}}>
            <option>Plymouth</option>
            <option>Exeter</option>
            <option>Bristol</option>
          </select>
          <br />
          <br />
          <h3>*Drop-off location:  {dropOff}  </h3>
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
          <label>Price: £{ totalCost } </label>
          <br />
          <br />
      </div>  
          
        <div className="payment">
          <h1>Payment Section</h1>
          <label>*Full Name as on card: </label>
          <input name="Name" type="text" placeholder="Full name" onChange={(event) => {setName(event.target.value);}}/>
          <br />
          <br />
          <label>*Card Number: </label>
          <input name="CardNumber" type="number" min="000000000000000000" placeholder="card number" onChange={(event) => {setCardNumber(event.target.value);}} />
          <br />
          <br />
          <label>*Sort Code: </label>
          <input name="SortCode" type="number" min="000000" placeholder="sort code" onChange={(event) => {setSortCode(event.target.value);}} />
          <br />
          <br />
          <label>*Security Number: </label>
          <input name="SecurityNumber" type="number" min="000" placeholder="security number" onChange={(event) => {setSecurity(event.target.value);}} />
          <br />
        </div>
        <button onClick={rent}>Confirm your reservation</button>   
    </div>
  )
};

export default RentPage;