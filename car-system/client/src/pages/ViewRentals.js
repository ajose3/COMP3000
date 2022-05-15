import React, { useEffect, useState, useContext } from 'react';
import "./ViewRentals.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import { toast } from 'react-toastify';

function ViewRentals() {

    let { CustomerID, RegPlate } = useParams(); 
    // // Defining variables
    const [data, setData] = useState([]);
    //let CustomerID = useParams();


    const { authState } = useContext(AuthContext);

    let navigate = useNavigate();

    const loadData = async () => {
        const response = await axios.get(`http://localhost:3001/rentals/${CustomerID}`);
        setData(response.data);
    };


    // Calling API Routes
  useEffect(() => {
    loadData();
  }, []);

  const cancelReservation = (RentingID) =>{
      if (window.confirm("Are you sure that you want to cancel your reservation?")) {
          axios.delete(`http://localhost:3001/rentals/${RentingID}`);
          toast.success("Reservation has been deleted");
          setTimeout(() => loadData(), 500);
      }
  }

  return (
    <div style={{marginTop: "150px"}}>
        <h1>Your reservations: </h1>
        <Link to={{ pathname: `/profile/${authState.CustomerID}`}}>
            <button>Back to Profile</button>
        </Link>
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
                <th style={{textAlign: "center"}}>Cancel:</th>
                <th style={{textAlign: "center"}}>Feedback:</th>
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
                        <td>
                            <button className="btn btn-delete" onClick={() => cancelReservation(item.RentingID)}>Cancel Rent</button>
                        </td>
                        <td>
                            <button className='btn btn-edit' onClick={() => {navigate(`/feedback/${item.VehicleRegPlate}`)}}>Write feeback about our services</button>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
</div>
  )
}

export default ViewRentals;