import { Link } from 'react-router-dom';
import "./AddEditCar.css";

const AddEditCar = () => {
       
    return (
        <div className="create">
            <h2>Add a new car</h2>
            <form>
                <label>Car:</label>
                <input 
                    type="text"/>
                <label>Number of seats:</label>
                <textarea></textarea>
                <label>Status:</label>
                <select>
                    <option value="available">available</option>
                    <option value="unavailable">unavailable</option>
                </select>
            </form>
        </div>
    );
}
 
export default AddEditCar;