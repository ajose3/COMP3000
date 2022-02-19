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
            </form>
        </div>
    );
}
 
export default SignUp;