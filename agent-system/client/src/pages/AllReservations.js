import React, { useEffect, useState, useContext } from 'react';
import "./AllReservations.css";
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function AllReservations() {

    const [data, setData] = useState([]);
    let navigate = useNavigate();

    const loadData = async () => {
        const response = await axios.get("http://localhost:5001/rentals");
        setData(response.data);
    };
    
    useEffect(() => {
        loadData();
    }, []);

    const cancelReservation = (RentingID) =>{
        if (window.confirm("Are you sure that you want to cancel your reservation?")) {
            axios.delete(`http://localhost:5001/rentals/${RentingID}`);
            toast.success("Reservation has been deleted");
            setTimeout(() => loadData(), 500);
        }
    }


  return (
    <div style={{marginTop: "150px"}}>
    <h1>All reservations: </h1>
    <Link to="/agentHome">
        <button className='btn btn-edit'>Back to Dashboard</button>
    </Link>
<table className="styled-table">
    <thead>
        <tr>
            <th style={{textAlign: "center"}}>No.</th>
            <th style={{textAlign: "center"}}>Start Date:</th>
            <th style={{textAlign: "center"}}>End Date:</th>
            <th style={{textAlign: "center"}}>Vehicle:</th>
            <th style={{textAlign: "center"}}>Cost:</th>
            <th style={{textAlign: "center"}}>Email:</th>
            <th style={{textAlign: "center"}}>CustomerID:</th>
            <th style={{textAlign: "center"}}>Action</th>
        </tr>
    </thead>
    <tbody>
        {data.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{item.StartDate}</td>
                    <td>{item.EndDate}</td>
                    <td><Link to={{ pathname: `/vehicle/${item.VehicleRegPlate}`}}>{item.VehicleRegPlate}</Link></td>
                    <td>£{item.Cost}</td>
                    <td>{item.Email}</td>
                    <td>{item.CustomerCustomerID}</td>
                    <td>
                        <button className="btn btn-delete" onClick={() => cancelReservation(item.RentingID)}>Cancel Rent</button>
                        <button className="btn btn-view" onClick={() => {navigate(`/preparation/${item.RentingID}`)}}>Prepare</button>
                    </td>
                </tr>
            );
        })}
    </tbody>
</table>
</div>
  )
}

export default AllReservations;