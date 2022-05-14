import React from 'react';
import { Link } from "react-router-dom";
import "./AgentMenu.css";

function AgentMenu() {
  return (
    <div className='container'>
        <label>To add a new admin: </label>
        <Link to="/adminRegister"> Register a new Admin </Link>
        <label>To view all Bookings: </label>
        <Link to="/allReservations"> All Reservations </Link>
    </div>
  )
}

export default AgentMenu;