import React, { useState, useEffect } from 'react';
import "./AgentViewAgents.css";
import {toast} from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

function AgentViewAgents() {

     // // Defining variables
     const [listOfAgents, setListOfAgents] = useState([]);
     let navigate = useNavigate();
 
     const loadData = async () => {
         const response = await axios.get("http://localhost:5001/agents");
         setListOfAgents(response.data);
     };
 
     // Calling API Routes
   useEffect(() => {
     loadData();
   }, []);

   const deleteAgent = (Username) => {
    if(window.confirm("Are you sure that you wanted to delete that Admin ?")) {
        axios.delete(`http://localhost:5001/agents/${Username}`);
        toast.success("Contact Deleted Successfully");
        setTimeout(() => loadData(), 500);
    }
    }

  return (
    <div>
        <h1>Our Current Agents: </h1>
    <div style={{marginTop: "15px"}}>
    <Link to="/registerAgent">
        <button className="btn btn-contact">Add Agent</button>
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
            {listOfAgents.map((item, index) => {
                return (
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{item.Username}</td>
                        <td>
                            <button className="btn btn-delete" onClick={() => deleteAgent(item.Username)} >Delete</button>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
    <Link to={"/agentHome"}>
    <button className="btn btn-view">Back to menu</button>
    </Link>
</div>
</div>
  )
}

export default AgentViewAgents;