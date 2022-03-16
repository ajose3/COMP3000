import { Link } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
    return(
        <div className="payment">
            <form>
                <h2>Final reservation details:</h2>
                <select>
                    <option value="Mr">Mr</option>
                    <option value="Ms">Ms</option>
                    <option value="Mrs">Mrs</option>
                </select>
                <label>First Name:</label>
                <input type="text" placeholder="Enter your first name" 
                required
                />
                <label>Last Name:</label>
                <input type="text" placeholder="Enter your last name" 
                required
                />
                <label>Email Address:</label>
                <input type="text" placeholder="Enter your email address"
                required
                />
                <label>Age:</label>
                <input type="number" placeholder="Enter your age"
                required
                />
                <label>Phone Number:</label>
                <input type="text" placeholder="Enter your phone number"
                required
                />
                <label>Driving License Number:</label>
                <input type="text" placeholder="Enter your driving license number"
                required
                />
                <label>Address:</label>
                <input type="text" placeholder="Enter your address" 
                required
                />
                <label>Dates you have selected for hire:</label>
                <label>02/03/2022 - 10/03/2022</label>
                <label>Card details:</label>
                <label>Card number:</label>
                <input type="text" placeholder="Enter card number"
                required
                />
                <label>Expiry date:</label>
                <input type="text" placeholder="Enter expiry date"
                required
                />
                <label>CVV:</label>
                <input type="text" placeholder="Enter expiry date"
                required
                />
                
            </form>
        </div>
    );
}

export default Payment;