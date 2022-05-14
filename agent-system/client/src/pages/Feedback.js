import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./Feedback.css";

function Feedback() {

    let navigate = useNavigate();

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5001/feedback");
        setData(response.data);
    };

    // Calling API Routes
    useEffect(() => {
        loadData();
      }, []);

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
            <th style={{textAlign: "center"}}>Vehicle:</th>
            <th style={{textAlign: "center"}}>Feedback:</th>
        </tr>
    </thead>
    <tbody>
        {data.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td><Link to={{ pathname: `/vehicle/${item.VehicleRegPlate}`}}>{item.VehicleRegPlate}</Link></td>
                    <td>{item.FeedBack}</td>
                </tr>
            );
        })}
    </tbody>
</table>
</div>   
  )
}

export default Feedback;