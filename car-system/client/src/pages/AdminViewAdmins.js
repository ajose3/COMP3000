import React, { useState, useEffect } from 'react';
import "./AdminViewAdmins.css";
import {Link} from "react-router-dom";
import "./AdminViewAdmins.css";
import {toast} from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AdminViewAdmins = () => {

    // // Defining variables
    const [listOfAdmins, setListOfAdmins] = useState([]);
    let navigate = useNavigate();

    const loadData = async () => {
        const response = await axios.get("http://localhost:3001/admins");
        setListOfAdmins(response.data);
    };

    // Calling API Routes
  useEffect(() => {
    loadData();
  }, []);

  const deleteAdmin = (Username) => {
    if(window.confirm("Are you sure that you wanted to delete that Admin ?")) {
        axios.delete(`http://localhost:3001/admins/${Username}`);
        toast.success("Contact Deleted Successfully");
        setTimeout(() => loadData(), 500);
    }
    }
  
    return (
    <div style={{marginTop: "150px"}}>
    <Link to="/adminRegister">
        <button className="btn btn-contact">Add Admin</button>
    </Link>
    <table className="styled-table">
        <thead>
            <tr>
                <th style={{textAlign: "center"}}>No.</th>
                <th style={{textAlign: "center"}}>Username</th>
                <th style={{textAlign: "center"}}>Action</th>
            </tr>
        </thead>
        <tbody>
            {listOfAdmins.map((item, index) => {
                return (
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{item.Username}</td>
                        <td>
                            <button className="btn btn-delete" onClick={() => deleteAdmin(item.Username)}>Delete</button>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
    <Link to={"/adminMenu"}>
    <button>Back to menu</button>
    </Link>
</div>
  );
}

export default AdminViewAdmins;