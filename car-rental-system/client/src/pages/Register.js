import React, {useState, useEffect} from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import './Register.css';
import axios from "axios";
import { toast } from "react-toastify";

const intialState = {
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
};


const Register = () => {
    
    const [state, setState] = useState(intialState);

    const {firstName, lastName, age,  email, password} = state;

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!firstName || !lastName || !age || !email || !password) {
            toast.error("Please provide value into each input field");
        } else {
            axios.post("http://localhost:5000/api/postcustomer", {
                firstName,
                lastName,
                age,
                email,
                password
            }).then(() => {
                setState({firstName: "", lastName: "", age: "", email: "", password: ""});
            }).catch((err) =>  toast.error(err.response.data));
            toast.success("Customer Registered Successfully");
            setTimeout(() => history.push("/"), 500);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({... state, [name]: value });
    };


  return (
    <div className="registercustomer" onSubmit={handleSubmit}>
        <form>
            <h2>Create Account:</h2>
            <label htmlFor="firstName">First Name:</label>
            <input type="text"
            id="firstName"
            name="firstName"
            placeholder="Your First Name ..."
            value={firstName}
            onChange={handleInputChange} />
            <label htmlFor="lastName">Last Name:</label>
            <input type="text"
            id="lastName"
            name="lastName"
            placeholder="Your Last Name ..."
            value={lastName}
            onChange={handleInputChange} />
            <label htmlFor="age">Age:</label>
            <input type="number"
            id="age"
            name="age"
            placeholder="Your Age ..."
            value={age}
            onChange={handleInputChange} />
            <label htmlFor="email">Email Address:</label>
            <input type="text" 
            id="email"
            name="email"
            placeholder="Your Email Address ..."
            value={email}
            onChange={handleInputChange}/>
            <label htmlFor="password">Password:</label>
            <input type="password" 
            id="password"
            name="password"
            placeholder="Your Password ..."
            value={password}
            onChange={handleInputChange}/>
            <input type="submit" value="Save"  />
        </form>
    </div>
  )
}

export default Register;