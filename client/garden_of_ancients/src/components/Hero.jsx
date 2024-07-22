import react from 'react';
import '../assets/css/Hero.css';

export const Hero = ({children, backgroundImage}) => <div className='myHero' style={{backgroundImage: `url(${backgroundImage})`}}>{children}</div>