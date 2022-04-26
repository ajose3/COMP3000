import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AllVehicles from './pages/AllVehicles';
import Vehicle from './pages/Vehicle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Registration from './pages/Registration';
import Login from './pages/Login';

function App() {

  // *TO RUN Application, TYPE "cd client" in terminal, then "npm start"*

  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Router>
        <div className="navbar">
          <h1> Rentals </h1>
          <Link to="/"> Home Page</Link>
          <Link to="/login"> Login</Link>
          <Link to="/registration"> Registration</Link>
        </div>
        <Routes>
          <Route path="/" element={<AllVehicles />} exact />
          <Route path="/vehicle/:RegPlate" element={<Vehicle />} exact />
          <Route path="/registration" element={<Registration />} exact />
          <Route path="/login" element={<Login />} exact /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
