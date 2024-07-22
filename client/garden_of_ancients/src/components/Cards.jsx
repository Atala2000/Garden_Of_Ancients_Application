import react from 'react';
import imageUrl from '../assets/plague.jpg';
import '../assets/css/Cards.css';

export const Cards = ({cardHead, cardPar}) => {
    return(
        <div className='card-style'>
            <div className='card-pic'></div>
            <div className='card-text'>
                <h4 className='card-head'>{cardHead}</h4>
                <p className='card-par'>{cardPar}</p>
            </div>
        </div>
    )
}