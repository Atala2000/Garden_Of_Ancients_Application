import react, { startTransition } from 'react';
import '../assets/css/Hero.css';

export const Hero = ({children, backgroundImage, style}) => {

    const combinedStyle = {
        ...style,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : style?.backgroundImage,
    }

return(
<div className='myHero' style={combinedStyle}>{children}</div>
)
}