import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from "react";
import Axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import Navbar from './Navbar';
import Login from "./pages/Login";
import SignUp from './pages/SignUp';
import Payment from './pages/Payment';
import AddEditCar from './AddEditCar';
import Register from './pages/Register';
import AdminCustomer from './pages/AdminCustomer';

// To run front end, first "cd client", then "npm start"

function App() {
  return (
    // <Router>
    //   <div className="App">
    //     <Login />
    //   </div>
    // </Router>

    
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/addContact" component={AddEdit} />
          <Route exact path="/update/:id" component={AddEdit} />
          <Route exact path="/view/:id" component={View} />

          <Route exact path="/Login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/create" component={AddEditCar}/>
          <Route exact path="/registercustomer" component={Register} />
          <Route exact path="/admincustomer" component={AdminCustomer} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
