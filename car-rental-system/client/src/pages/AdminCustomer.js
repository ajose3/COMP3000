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
    <Link to="/adminAddEditCustomer">
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
            {data.map((item, index) => {
                return (
                    <tr key={item.CustomerID}>
                        <th scope="row">{index+1}</th>
                        <td>{item.FirstName}</td>
                        <td>{item.LastName}</td>
                        <td>{item.EmailAddress}</td>
                        <td>
                            <Link to={` /updatecustomer/${item.CustomerID}`}>
                                <button className="btn btn-edit">Edit</button>
                            </Link>
                            <button className="btn btn-delete" onClick={() => deleteCustomer(item.CustomerID)}>Delete</button>
                            <Link to={` /adminViewCustomer/${item.CustomerID}`}>
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