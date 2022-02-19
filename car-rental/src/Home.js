import React, { useState } from 'react';
import BlogList from './BlogList';
import useFetch from './useFetch';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Home = () => {

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const { data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs');

    return (
        <div className="home">
            
            <a>Start date:</a>
            <DatePicker 
            selected={selectedStartDate} 
            onChange={startDate => setSelectedStartDate(startDate)} 
            dateFormat='dd/MM/yyyy'
            minDate={new Date()}
            isClearable
            />

            <br /> <br />

            <a>End date:</a>
            <DatePicker 
            selected={selectedEndDate}
            onChange={endDate => setSelectedEndDate(endDate)}
            dateFormat='dd/MM/yyyy'
            minDate={new Date()}
            is isClearable
            />
            
            <br /> <br />
            
            <a>Number of seats:</a><br /> <br />
            <input type="checkbox" /><span>    4    </span>
            <input type="checkbox" /><span>    5    </span>
            <input type="checkbox" /><span>    7    </span>
            <input type="checkbox" /><span>    9    </span>

            <button>Apply Filter</button>

            <br /> <br />

            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            {blogs && < BlogList blogs={blogs} title="All cars!" />} 
        </div>
    );
}
 
export default Home;