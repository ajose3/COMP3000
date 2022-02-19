import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1> Rentals </h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/create">New Cars</Link>
                <Link to="/payment">Payment</Link>
                <Link to="/sign-up">Sign Up</Link>
            </div>
        </nav>
    );
}

export default Navbar;