import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import "./AdminCustomer.css";
import {toast} from "react-toastify";
import axios from "axios";

const AdminCustomer = () => {
    
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/getcustomer");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteCustomer = (CustomerID) => {
        if(
            window.confirm("Are you sure you want to delete this customer?")
        ) {
            axios.delete(`http://localhost:5000/api/admindeletecustomer/${CustomerID}`);
            toast.success("Customer Deleted Successfully");
            setTimeout(() => loadData(), 500);
        }
    };
 
  return (
    <div style={{marginTop: "150px"}}>
    <Link to="/adminAddCustomer">
        <button className="btn btn-contact">Add Customer</button>
    </Link>
    <table className="styled-table">
        <thead>
            <tr>
                <th style={{textAlign: "center"}}>No.</th>
                <th style={{textAlign: "center"}}>FirstName</th>
                <th style={{textAlign: "center"}}>LastName</th>
                <th style={{textAlign: "center"}}>EmailAddress</th>
                <th style={{textAlign: "center"}}>Action</th>
            </tr>
        </thead>
        <tbody>
            {data.map((customer, index) => {
                return (
                    <tr key={customer.CustomerID}>
                        <th scope="row">{index+1}</th>
                        <td>{customer.FirstName}</td>
                        <td>{customer.LastName}</td>
                        <td>{customer.EmailAddress}</td>
                        <td>
                            <Link to={`/adminUpdateCustomer/${customer.CustomerID}`}>
                                <button className="btn btn-edit">Edit</button>
                            </Link>
                            <button className="btn btn-delete" onClick={() => deleteCustomer(customer.CustomerID)}>Delete</button>
                            <Link to={`/adminViewCustomer/${customer.CustomerID}`}>
                                <button className="btn btn-view">View</button>
                            </Link>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
</div>
);
};

export default AdminCustomer;