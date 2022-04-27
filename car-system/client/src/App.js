import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AllVehicles from './pages/AllVehicles';
import Vehicle from './pages/Vehicle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Registration from './pages/Registration';
import Login from './pages/Login';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  // *TO RUN Application, TYPE "cd client" in terminal, then "npm start"*

  const [authState, setAuthState] = useState({
    Email: "", 
    CustomerID: 0, 
    status: false,
  });

  useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", { 
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({
          Email: response.data.Email, 
          CustomerID: response.data.CustomerID, 
          status: true,
        });
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ Email: "", CustomerID: 0, status: false });
  };

  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <div className="navbar">
          <h1> Rentals </h1>
          <Link to="/"> Home Page</Link>
          {!authState.status ? (
            <>
          <Link to="/login"> Login</Link>
          <Link to="/registration"> Registration</Link>
          </>
          ) : (
            <button onClick={logout}> Logout</button>
          )}

          <p className='welcome'>{authState.Email}</p>

        </div>
        <Routes>
          <Route path="/" element={<AllVehicles />} exact />
          <Route path="/vehicle/:RegPlate" element={<Vehicle />} exact />
          <Route path="/registration" element={<Registration />} exact />
          <Route path="/login" element={<Login />} exact /> 
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
