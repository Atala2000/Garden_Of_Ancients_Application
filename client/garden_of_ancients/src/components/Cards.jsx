import react from 'react';
import '../assets/css/Cards.css';

export const Cards = ({cardHead, cardPar, cardImage, cardLink}) => {
    return(
        <div className='card-style'>
            <div className='card-pic' style={{backgroundImage : `url(${cardImage})`}}></div>
            <div className='card-text'>
                <h4 className='card-head'>{cardHead}</h4>
                <p className='card-par'>{cardPar}</p><span onClick={cardLink} className='card-link'>Read More</span>
            </div>
        </div>
    )
}