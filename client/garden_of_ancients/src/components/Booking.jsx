import react from 'react';
import '../assets/css/Booking.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Authprovider';

export const Booking = () => {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const navigateToBooking = () => {
        if(isAuthenticated){
        navigate('/bookPage');
        }
        else{
            navigate('/')
        }
    }
return(
<button className='bookbtn' onClick={navigateToBooking}>BOOK NOW</button>
)
}