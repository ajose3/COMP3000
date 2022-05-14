import React from 'react';
import { Link } from "react-router-dom";
import "./AgentHome.css";

function AgentHome() {
  return (
    <div className='container'>
        <label>To add a new admin: </label>
        <Link to="/registerAgent">Register a new agent</Link>
        <label>To view agents: </label>
        <Link to="/agentViewAgents">View agents</Link>
        <label>To view fleet: </label>
        <Link to="/agentViewCars">All Vehicles</Link>
        <label>To view Reservations: </label>
        <Link to="/allReservations">View All Reservations</Link>
        <label>ChangePassword: </label>
        <Link to="/changepassword">Change Your Password</Link>
        <label>View Feedback from customers: </label>
        <Link to="/feedback">View feedback</Link>
    </div>
  )
}

export default AgentHome;