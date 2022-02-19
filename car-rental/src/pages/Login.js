import { Link } from 'react-router-dom';

const Login = () => {
    
    
    return (
        <div className="login">
            <form>
                <h2>Enter credentials to login:</h2>
                <label>Username:</label>
                <input type="text" 
                required
                />
                <label>Password:</label>
                <input type="password" 
                required
                />
                <button>Login</button>
                <br /><br />
                <br /><br />
                <label className="newAccount">Don't have an account? Create one following the link below</label>
                <Link to="sign-up">Sign Up</Link>
            </form>
        </div>
    );
}
 
export default Login;