import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AllVehicles from './pages/AllVehicles';
import Vehicle from './pages/Vehicle';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Registration from './pages/Registration';
import Login from './pages/Login';
import AgentLogin from './pages/AgentLogin';
import AgentMenu from './pages/AgentMenu';
import AllReservations from './pages/AllReservations';
import Profile from './pages/Profile';
import Feedback from './pages/Feedback';
import RentPage from './pages/RentPage';
import ChangePassword from './pages/ChangePassword';
import ViewRentals from './pages/ViewRentals';
import PageNotFound from './pages/PageNotFound';
import AdminLogin from './pages/AdminLogin';
import AdminMenu from './pages/AdminMenu';
import EditVehicle from './pages/EditVehicle';
import AdminRegister from './pages/AdminRegister';
import AdminViewAdmins from './pages/AdminViewAdmins';
import AdminViewCars from './pages/AdminViewCars';
import AddEditVehicle from './pages/AddEditVehicle';
import AdminRegisterAgent from './pages/AdminRegisterAgent';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  // *TO RUN Application, TYPE "cd client" in terminal, then "npm start"*

  const [authState, setAuthState] = useState({
    Email: "", 
    CustomerID: 0,
    FirstName: "", 
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
          FirstName: response.data.FirstName,
          status: true,
        });
      }
    });
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ Email: "", CustomerID: 0, FirstName: "", status: false });
    toast.success("Logged out successfully");
  };


  // Navbar and routes are declared here
  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <div className="navbar">
          <h1> Rentals </h1>
          <Link to="/"> Home Page </Link>
          {!authState.status ? (
            <>
          <Link to="/login"> Login</Link>
          <Link to="/registration"> Registration</Link>
          <Link to="/adminLogin"> Admin </Link>
          <Link to="/agentLogin"> Agent </Link>
          </>
          ) : (
            <>
            <button onClick={logout}> Logout</button>
            <Link to={{ pathname: `/profile/${authState.CustomerID}`}} >Profile</Link>
            </>
          )}

          <p className='welcome'>{authState.Email}</p>
          

        </div>
        <Routes>
          <Route path="/" element={<AllVehicles />} exact />
          <Route path="/vehicle/:RegPlate" element={<Vehicle />} exact />
          <Route path="/registration" element={<Registration />} exact />
          <Route path="/login" element={<Login />} exact /> 
          <Route path="/profile/:CustomerID" element={<Profile />} exact /> 
          <Route path="/changepassword" element={<ChangePassword />} exact /> 
          <Route path="/rentPage/:RegPlate" element={<RentPage />} exact />
          <Route path="/feedback/:RegPlate" element={<Feedback />} exact />
          <Route path="/viewRentals/:CustomerID" element={<ViewRentals />} exact />

          <Route path="*" element={<PageNotFound />} exact /> 

          <Route path="/agentLogin" element={<AgentLogin />} exact />
          <Route path="/agentMenu" element={<AgentMenu />} exact />
          <Route path="/allReservations" element={<AllReservations />} exact />

          <Route path="/adminLogin" element={<AdminLogin />} exact />
          <Route path="/adminMenu" element={<AdminMenu />} exact />
          <Route path="/adminRegister" element={<AdminRegister />} exact />
          <Route path="/adminViewAdmins" element={<AdminViewAdmins />} exact />
          <Route path="/adminViewCars" element={<AdminViewCars />} exact />
          <Route path="/addEditVehicle" element={<AddEditVehicle />} exact />
          <Route path="/editVehicle/:RegPlate" element={<EditVehicle />} exact />
          <Route path="/adminRegisterAgent" element={<AdminRegisterAgent />} exact />
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
