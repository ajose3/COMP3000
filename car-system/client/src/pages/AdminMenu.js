import React from 'react';
import { Link } from "react-router-dom";

const AdminMenu = () => {

  return (
    <div>
        <label>To add a new admin</label>
        <Link to="/adminRegister"> Register a new Admin </Link>
    </div>
  )
};

export default AdminMenu;