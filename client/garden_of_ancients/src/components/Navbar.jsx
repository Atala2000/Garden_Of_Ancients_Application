import react from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Navbar.css';

export const Navbar = () => <div className='navbar'>
        <Link to="/">HOME</Link>
        <Link to="/About Us">ABOUT US</Link>
        <Link to="/Bedrooms">RECREATION</Link>
        <Link to="/Conferences">EVENTS</Link>
        <Link to="/Herbarium">HERBARIUM</Link>
        <Link to="/Hives">BEE GARDEN</Link>
    
</div>
