import React from 'react';
import { Link } from "react-router-dom";
import "./AgentHome.css";

function AgentHome() {
  return (
    <div>
      <h1>Actions you can perform: </h1>
    <div className='container'>
        <br />
        <br />
        <label>To add a new admin: </label>
        <Link to="/registerAgent">Register a new agent</Link>
        <br />
        <br />
        <br />
        <br />
        <label>To view agents: </label>
        <Link to="/agentViewAgents">View Agents</Link>
        <br />
        <br />
        <br />
        <br />
        <label>To view fleet: </label>
        <Link to="/agentViewCars">All Vehicles</Link>
        <br />
        <br />
        <br />
        <br />
        <label>To view Reservations: </label>
        <Link to="/allReservations">View All Reservations</Link>
        <br />
        <br />
        <br />
        <br />
        <label>ChangePassword: </label>
        <Link to="/changepassword">Change Your Password</Link>
        <br />
        <br />
        <br />
        <br />
        <label>View Feedback from customers: </label>
        <Link to="/feedback">View feedback</Link>
        <br />
        <br />
        <br />
        <br />
        <label>View Profits: </label>
        <Link to="/viewBillings">View Revenue</Link>
        <br />
        <br />
        
    </div>
    </div>
  )
}

export default AgentHome;