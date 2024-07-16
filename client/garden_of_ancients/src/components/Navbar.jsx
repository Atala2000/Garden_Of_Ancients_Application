import react from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Navbar.css';

export const Navbar = () => <div className='navbar'>
        <Link to="/About Us">ABOUT US</Link>
        <Link to="/Bedrooms">BEDROOMS</Link>
        <Link to="/Conferences">CONFERENCES</Link>
        <Link to="/Herbarium">HERBARIUM</Link>
        <Link to="/Hives">BEE HIVES</Link>
    
</div>
