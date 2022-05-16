import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import "./Preparation.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Preparation() {

    let { RentingID } = useParams();

    const [VehicleReadyDate, setVehicleReadyDate] = useState("");
    const [data, setData] = useState([]);
    const [preparation, setPreparation] = useState([]);
    const [pickUp, setPickUp] = useState("");
    const [dropOff, setDropOff] = useState("");
    const [status, setStatus] = useState("");

    
    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    let navigate = useNavigate();

    const loadData = async () => {
        const response = await axios.get(`http://localhost:5001/rentals/getInfo/${RentingID}`);
        setData(response.data);

        const res = await axios.get(`http://localhost:5001/preparation/${RentingID}`);
        setPreparation(res.data);
    };

    useEffect(() => {
        loadData();
      }, []);
    
    const prepare = () => {
        axios.put(`http://localhost:5001/preparation/${RentingID}`, {
            VehicleReadyDate: VehicleReadyDate,
            PickUp: pickUp,
            DropOff: dropOff,
            Status: status,
            RentalRentingID: RentingID,
        }).then((response) => {
            if (response.data.error){
                console.log(response.data.error);
                toast.error(response.data.error);
            } else {
                toast.success("Preparation Successfully");
                setTimeout(() => loadData(), 500);
            }
        })
    }


  return (
    <div>
        <div className='prepare'>  
      <h3>Vehicle Ready Date: <input type="date" id="d1" min={disablePastDate()} onChange={(event) => {setVehicleReadyDate(event.target.value);}} /> </h3>
      <h3>Current location: {pickUp}     </h3>
          <select onChange={(event) => {setPickUp(event.target.value);}}>
            <option>Plymouth</option>
            <option>Exeter</option>
            <option>Bristol</option>
          </select>
          <br />
          <h3>Drop-off location:  {dropOff}  </h3>
          <select onChange={(event) => {setDropOff(event.target.value);}}>
            <option>Plymouth</option>
            <option>Exeter</option>
            <option>Bristol</option>
          </select>
          <br />
          <h3>Status:  {status}  </h3>
          <select onChange={(event) => {setStatus(event.target.value);}}>
            <option>Ready</option>
            <option>Not Ready</option>
          </select>
          <br />
          <br />
          <button className="btn btn-contact" onClick={prepare}>Update Preparation</button>
          </div>      
      <div style={{marginTop: "15px"}}>
    <h3>The Reservation: </h3>
    <table className="styled-table">
        <thead>
            <tr>
                <th style={{textAlign: "center"}}>No.</th>
                <th style={{textAlign: "center"}}>Reservation Number:</th>
                <th style={{textAlign: "center"}}>Start Date:</th>
                <th style={{textAlign: "center"}}>End Date:</th>
                <th style={{textAlign: "center"}}>Vehicle:</th>
                <th style={{textAlign: "center"}}>Pick Up Location:</th>
                <th style={{textAlign: "center"}}>Drop Off Location:</th>
                <th style={{textAlign: "center"}}>Cost:</th>

            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => {
                return (
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{item.RentingID}</td>
                        <td>{item.StartDate}</td>
                        <td>{item.EndDate}</td>
                        <td><Link to={{ pathname: `/vehicle/${item.VehicleRegPlate}`}}>Click Here</Link></td>
                        <td>{item.PickUp}</td>
                        <td>{item.DropOff}</td>
                        <td>£{item.Cost}</td>
                    </tr>
                );
            })}
        </tbody>
    </table>
</div>
<h2 style={{marginTop: "50px"}}>Preparation log for the reservation: </h2>
<div style={{marginTop: "25px"}}>
    <table className="styled-table">
        <thead>
            <tr>
                <th style={{textAlign: "center"}}>No.</th>
                <th style={{textAlign: "center"}}>Reservation Number:</th>
                <th style={{textAlign: "center"}}>Needs to be ready by:</th>
                <th style={{textAlign: "center"}}>Status</th>
                <th style={{textAlign: "center"}}>Current Location:</th>
            </tr>
        </thead>
        <tbody>
            {preparation.map((item, index) => {
                return (
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{item.RentalRentingID}</td>
                        <td>{item.VehicleReadyDate}</td>
                        <td>{item.Status}</td>
                        <td>{item.PickUp}</td>
                    </tr>
                );
            })}
        </tbody>
    </table>
</div>
    
    </div>
    
  )
}

export default Preparation;