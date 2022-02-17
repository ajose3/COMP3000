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
                <input type="text" 
                required
                />
                <button>Login</button>
            </form>
        </div>
    );
}
 
export default Login;