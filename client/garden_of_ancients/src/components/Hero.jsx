import react, { startTransition, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, X} from 'react-bootstrap-icons';
import '../assets/css/Hero.css';

export const Hero = ({children, backgroundImage, style}) => {
    const [navDisplay, setNavDisplay] = useState(false);
    const navigate = useNavigate();

    const combinedStyle = {
        ...style,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : style?.backgroundImage,
    }

    let navStyle = {};
    if(navDisplay){
        navStyle = {top : '0'}
    }
    else{
        navStyle = {top : '-150%'}
    }

return(
<div className='myHero' style={combinedStyle}>
    {window.innerWidth <= 450 && <div style={navStyle} className='navDropdown'>
        <div onClick={() => {setNavDisplay(false)}} className='navdrop-close'><X size={40}/></div>
        <ul className='navdrop-style'>
            <li onClick={() => {navigate('/')}} className='navdrop-item'>HOME</li>
            <li onClick={() => {navigate('/About Us')}} className='navdrop-item'>ABOUT US</li>
            <li onClick={() => {navigate('/Bedrooms')}} className='navdrop-item'>RECREATION</li>
            <li onClick={() => {navigate('/Conferences')}} className='navdrop-item'>EVENTS</li>
            <li onClick={() => {navigate('/Herbarium')}} className='navdrop-item'>SPICE ENCLAVE</li>
            <li onClick={() => {navigate('/Hives')}} className='navdrop-item'>BEE GARDEN</li>
        </ul>
    </div>}
<div onClick={() => {setNavDisplay(true)}} className="navbar-burger">
                <List size={30}/>
                </div>
    {children}
    </div>
)
}