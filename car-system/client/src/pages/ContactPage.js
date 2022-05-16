import React from 'react';
import { Link } from 'react-router-dom';
import "./ContactPage.css";

function ContactPage() {
  return (
    <div className='contact'>
        <h1>You can contact us via the following methods: </h1>
        <h2>Email Us: rentals@rentals.com</h2>
        <h2>Phone Number: 077777777777</h2>

        <label className="newAccount"><Link to="/registration">Sign Up with us by clicking here</Link></label>
    </div>
  )
}

export default ContactPage;