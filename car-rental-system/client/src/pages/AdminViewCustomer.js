import React, {useState, useEffect} from 'react';
import {useParams, Link} from "react-router-dom";
import axios from 'axios';
import "./AdminViewCustomer.css";

const AdminViewCustomer = () => {

    const [customer, setCustomer] = useState({});

    const {CustomerID} = useParams();
    
    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/getcustomer/${CustomerID}`)
          .then((resp) => setCustomer({...resp.data[0] }));
    }, [CustomerID]);

    return (
        <div style={{marginTop: "150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>User Contact Detail</p>
                </div>
                <div className="container">
                    <strong>ID: </strong>
                    <span>{CustomerID}</span>
                    <br />
                    <br />
                    <strong>Name: </strong>
                    <span>{customer.FirstName}</span>
                    <br />
                    <br />
                    <strong>Email: </strong>
                    <span>{customer.EmailAddress}</span>
                    <br />
                    <br />
                    <strong>Contact: </strong>
                    <span>{customer.PhoneNumber}</span>
                    <br />
                    <br />
                    <Link to="/admincustomer">
                    <div className="btn btn-edit">Go Back</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminViewCustomer;