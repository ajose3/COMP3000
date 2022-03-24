import React, {useState, useEffect} from 'react';
import {useHistory, useParams, Link} from "react-router-dom";
import "./AdminAddEditCustomer.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  FirstName: "",
  LastName: "",
  Age: "",
  DrivingLicenseNumber: "",
  Address: "",
  PhoneNumber: "",
  EmailAddress: "",
  Password: "",
};

const AdminAddEditCustomer = () => {

  const [state, setState] = useState(initialState);

  const {FirstName, LastName, Age, DrivingLicenseNumber, Address, PhoneNumber, EmailAddress, Password} = state;

  const history = useHistory();

  const {CustomerID} = useParams(); 

  useEffect(() => {
    axios
    .get(`http://localhost:5000/api/admingetcustomerupdate/${CustomerID}`)
    .then((resp => setState({...resp.data[0] })))
  }, [CustomerID]); // Only runs when we have the id so the edit runs here

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!FirstName || !LastName || !Age || !DrivingLicenseNumber || !Address || !PhoneNumber || !EmailAddress || !Password) {
      toast.error("Please provide values into each input field")
    } else {
      if(!CustomerID) {
        axios
        .post("http://localhost:5000/api/adminaddcustomer", {
        FirstName,
        LastName,
        Age,
        DrivingLicenseNumber,
        Address,
        PhoneNumber,
        EmailAddress,
        Password,
      }).then(() => {
        setState({FirstName: "", LastName: "", Age: "", DrivingLicenseNumber: "", Address: "", PhoneNumber: "", EmailAddress: "", Password: ""});
      })
      .catch((err) => toast.error(err.response.data));
      toast.success("Customer Added Successfully");
      } else {
        axios
        .put(`http://localhost:5000/api/adminUpdateCustomer/${CustomerID}`, {
        FirstName,
        LastName,
        Age,
        DrivingLicenseNumber,
        Address,
        PhoneNumber,
        EmailAddress,
        Password,
      }).then(() => {
        setState({FirstName: "", LastName: "", Age: "", DrivingLicenseNumber: "", Address: "", PhoneNumber: "", EmailAddress: "", Password: ""});
      })
      .catch((err) => toast.error(err.response.data));
      toast.success("Customer Updated Successfully");

      }

      setTimeout(() => history.push("/admincustomer"), 500);
    }
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({ ...state, [name]: value });
  };
 
  return (
    <div style={{marginTop: "100px"}}>
        <form style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",

        }}
        onSubmit={handleSubmit}
        >
          <label htmlFor="FirstName">First Name</label>
          <input 
          type="text"
          id="FirstName"
          name="FirstName"
          placeholder="Your First Name ..."
          value={FirstName || ""} 
          onChange={handleInputChange}
          />
          <label htmlFor="LastName">Last Name</label>
          <input 
          type="text"
          id="LastName"
          name="LastName"
          placeholder="Your Last Name ..."
          value={LastName || ""}
          onChange={handleInputChange}
          />
          <label htmlFor="Age">Age</label>
          <input 
          type="number"
          id="Age"
          name="Age"
          placeholder="Your Age ..."
          value={Age || ""}
          onChange={handleInputChange}
          />
          <label htmlFor="DrivingLicenseNumber">Driving License Number</label>
          <input 
          type="text"
          id="DrivingLicenseNumber"
          name="DrivingLicenseNumber"
          placeholder="Your Driving License Number ..."
          value={DrivingLicenseNumber || ""}
          onChange={handleInputChange}
          />
          <label htmlFor="Address">Address</label>
          <input 
          type="text"
          id="Address"
          name="Address"
          placeholder="Your Address ..."
          value={Address || ""}
          onChange={handleInputChange}
          />
          <label htmlFor="PhoneNumber">Phone Number</label>
          <input 
          type="text"
          id="PhoneNumber"
          name="PhoneNumber"
          placeholder="Your Phone Number ..."
          value={PhoneNumber || ""}
          onChange={handleInputChange}
          />
          <label htmlFor="EmailAddress">Email Address</label>
          <input 
          type="email"
          id="EmailAddress"
          name="EmailAddress"
          placeholder="Your Email Address ..."
          value={EmailAddress || ""}
          onChange={handleInputChange}
          />
          <label htmlFor="Password">Password</label>
          <input 
          type="password"
          id="Password"
          name="Password"
          placeholder="Your Password ..."
          value={Password || ""}
          onChange={handleInputChange}
          />
          <input type="submit" value={CustomerID ? "Update" : "Save"} /> 
          <Link to="/admincustomer">
            <input type="button" value="Go Back" />
          </Link>
        </form>
    </div>
  );
};

export default AdminAddEditCustomer;