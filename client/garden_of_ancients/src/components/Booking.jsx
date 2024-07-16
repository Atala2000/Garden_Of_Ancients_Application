import react from 'react';
import '../assets/css/Booking.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Booking = () => {
    const navigate = useNavigate();
    const navigateToBooking = () => {
        navigate('/bookPage');
    }
return(
<button className='bookbtn' onClick={navigateToBooking}>BOOK NOW</button>
)
}