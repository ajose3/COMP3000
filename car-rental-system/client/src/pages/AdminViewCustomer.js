import React, {useState, useEffect} from 'react';
import {useParams, Link} from "react-router-dom";
import axios from 'axios';
import "./AdminViewCustomer.css";

const AdminViewCustomer = () => {

    const [customer, setCustomer] = useState({});

    const { CustomerID } = useParams();

    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/adminviewcustomer/${CustomerID}`)
          .then((resp) => setCustomer({...resp.data[0] }));
    }, [CustomerID]);

  return (
    <div style={{marginTop: "150px"}}>
        <div className="card">
            <div className="card-header">
                <p>Customer Details</p>
            </div>
            <div className="container">
                <strong>ID: </strong>
                <span>{CustomerID}</span>
                <br />
                <br />
                <strong>First Name: </strong>
                <span>{customer.FirstName}</span>
                <br />
                <br />
                <strong>Last Name: </strong>
                <span>{customer.LastName}</span>
                <br />
                <br />
                <strong>Age: </strong>
                <span>{customer.Age}</span>
                <br />
                <br />
                <strong>Driving License Number: </strong>
                <span>{customer.DrivingLicenseNumber}</span>
                <br />
                <br />
                <strong>Address: </strong>
                <span>{customer.Address}</span>
                <br />
                <br />
                <strong>Phone Number: </strong>
                <span>{customer.PhoneNumber}</span>
                <br />
                <br />
                <strong>Email Address: </strong>
                <span>{customer.EmailAddress}</span>
                <br />
                <br />
                <Link to="/admincustomer">
                <div className='btn btn-edit'>Go Back</div>
                </Link>
            </div>
        </div>

    </div>
  );
}

export default AdminViewCustomer;