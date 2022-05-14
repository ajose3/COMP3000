import React from 'react';
import { Link } from "react-router-dom";
import "./AdminMenu.css";

const AdminMenu = () => {

  return (
    <div className='container'>
        <label>To add a new admin: </label>
        <Link to="/adminRegister"> Register a new Admin </Link>
        <b></b>
        <label>To view admins: </label>
        <Link to="/adminViewAdmins"> View Admins </Link>
        <label>To view fleet: </label>
        <Link to="/adminViewCars"> View Fleet </Link>
        <label>To add a new Agent: </label>
        <Link to="/adminRegisterAgent"> View Fleet </Link>
    </div>
  )
};

export default AdminMenu;