import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./ViewBillings.css";

function ViewBillings() {

    let navigate = useNavigate();

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5001/billing");
        setData(response.data);
    };

    // Calling API Routes
    useEffect(() => {
        loadData();
      }, []);

  return (
    <div style={{marginTop: "150px"}}>
    <h1>All Income: </h1>
    <Link to="/agentHome">
        <button className='btn btn-edit'>Back to Dashboard</button>
    </Link>
<table className="styled-table">
    <thead>
        <tr>
            <th style={{textAlign: "center"}}>No.</th>
            <th style={{textAlign: "center"}}>Income:</th>
            <th style={{textAlign: "center"}}>Date:</th>
        </tr>
    </thead>
    <tbody>
        {data.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{item.Cost}</td>
                    <td>{item.createdAt}</td>
                </tr>
            );
        })}
    </tbody>
</table>
</div>
  )
}

export default ViewBillings;