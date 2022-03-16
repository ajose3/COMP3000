import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
    
    
    return (
        <div className="sign-up">
            <form>
                <h2>Create account:</h2>
                <label>Email Address:</label>
                <input type="text" 
                required
                />
                <label>Password:</label>
                <input type="password" 
                required
                />
                <label>Type Password Again to Confirm:</label>
                <input type="password" 
                required
                />
                <button>Sign up</button>
                <Link to="/Login">Back to Login</Link>
            </form>
        </div>
    );
}
 
export default SignUp;