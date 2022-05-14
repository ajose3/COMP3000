import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AgentLogin from "./pages/AgentLogin";
import AgentHome from "./pages/AgentHome";
import AgentViewAgents from './pages/AgentViewAgents';
import RegisterAgent from "./pages/RegisterAgent";
import AgentViewCars from "./pages/AgentViewCars";
import AllReservations from './pages/AllReservations';
import PageNotFound from './pages/PageNotFound';
import Vehicle from './pages/Vehicle';
import AgentAddVehicle from './pages/AgentAddVehicle';
import ChangePassword from './pages/ChangePassword';
import Feedback from './pages/Feedback';
import Preparation from './pages/Preparation';
import { AuthContext } from "./helpers/AuthContext";

function App() {

  const [authState, setAuthState] = useState({
    Username: "",
    AgentID: 0,
    status: false,
  });

  useEffect(() => {
    axios.get("http://localhost:5001/agents/auth", { 
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({
          Username: response.data.Username,
          AgentID: response.data.AgentID,
          status: true,
        });
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({Username: "", AgentID: 0,status: false,});
  };

  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
      <div className="navbar">
          <h1> Admin Rentals </h1>
          <Link to="/agentHome">Home</Link>
          {!authState.status ? (
            <>
            <Link to="/"> Login </Link>
            </>
          ) : (
            <>
            <button onClick={logout}> Logout</button>
            <p className='welcome'>welcome back {authState.Username}</p>
            </>
          )}


      </div>
        
        <Routes>
          <Route path="/" element={<AgentLogin />} exact />
          <Route path="/agentHome" element={<AgentHome />} exact />
          <Route path="/registerAgent" element={<RegisterAgent />} exact />
          <Route path="/agentViewAgents" element={<AgentViewAgents />} exact />
          <Route path="/agentViewCars" element={<AgentViewCars />} exact />
          <Route path="/allReservations" element={<AllReservations />} exact />
          <Route path="/vehicle/:RegPlate" element={<Vehicle />} exact />
          <Route path="/agentAddVehicle" element={<AgentAddVehicle />} exact />
          <Route path="/changepassword" element={<ChangePassword />} exact />
          <Route path="/feedback" element={<Feedback />} exact />
          <Route path="/preparation/:RentingID" element={<Preparation />} exact />
          
          <Route path="*" element={<PageNotFound />} exact /> 

        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
