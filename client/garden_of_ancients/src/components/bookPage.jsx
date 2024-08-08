import React, {useState} from 'react'
import { Navbar } from './Navbar'
import { Booking } from './Booking'
import { Heading } from './Heading'
import { Hero } from './Hero'
import imageURL from '../assets/bedroom.jpeg'
import { Footer } from './Footer'
import '../assets/css/bookPage.css';
import {ArrowRight} from 'react-bootstrap-icons';
import { Pricemodal } from './priceModal'
import differenceInDays from 'date-fns/differenceInDays'
import { Bookmodal } from './bookModal'

export const Bookpage = () => {

    const [showCart, setShowCart] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [bookingData, setBookingData] = useState({
        cart : [],
        totalPrice : 0
    });
    const [formData, setFormData] = useState({
        accommodation : '',
        adultCount : '',
        childCount : '',
        startDate : '',
        endDate : ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const calcDate = ({formData}) => {
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        const period = differenceInDays(end, start);
        return period;
    }

    
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setShowModal(true);
        formData.adultCount = parseInt(formData.adultCount);
        formData.childCount = parseInt(formData.childCount);
        formData.period = calcDate({formData});
        console.log(JSON.stringify(formData));

        const response = await fetch('http://localhost:5500/api/getPrices', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
        });
    const price = await response.json();
        if(!response.ok){
            console.log('submission failed!');
        }
        console.log(price);
        setFormData({
            ...formData,
            price
        })
      
    } 
    const handleClose = async() => {
        const updatedData = {...formData};
        delete updatedData.startDate;
        delete updatedData.endDate;
        const response = await fetch('http://localhost:5500/api/postCart', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(updatedData),
            credentials : 'include'
        });
        if(!response.ok){
            console.log("Couldn't get the cart!");
        }
        const data = await response.json();
        console.log(data);
        setShowModal(false);
    }

    const handleCart = async() => {
        setShowCart(true);
        const response = await fetch('http://localhost:5500/api/viewCart', {
            method : 'GET',
            credentials : 'include'
        });
        if(!response.ok){
            console.log("Could not view cart");
        }
        const data = await response.json();
        setBookingData(data);
        console.log(bookingData);
    }

    return(
        <>
        <Hero backgroundImage={imageURL}>
            <Navbar/>
            <div className='book-form'>
                <form onSubmit={handleSubmit} className='booking-form'>
                    <select name="accommodation" className='dropdown' value={formData.accommodation} onChange={handleChange} required>
                        <option value=""></option>
                        <option value="Room">Room</option>
                        <option value="Conference">Conference</option>
                    </select>
                    <div className='people-count'>
                        <label htmlFor="adult-count" className='people-pos'>ADULT</label>
                        <input type="number"  id='adult-count' className='people-pos' name='adultCount' value={formData.adultCount} onChange={handleChange} min='0' max='5' required/>
                    </div>
                    <div className='people-count'>
                        <label htmlFor="child-count" className='people-pos'>CHILDREN</label>
                        <input type="number" id='child-count' className='people-pos' name='childCount' value={formData.childCount} onChange={handleChange} min='0' max='5' required/>
                    </div>
                    <div className='date-count'>
                        <label htmlFor="start-date"></label>
                        <input type="date" id='start-date' value={formData.startDate} onChange={handleChange} name='startDate' required/>
                    </div>
                    <div className='date-count'>
                        <label htmlFor="end-date"></label>
                        <input type="date" id='end-date' value={formData.endDate} onChange={handleChange} name='endDate' required/>
                    </div>
                    <button type='submit' className='submit-btn' onClick={handleSubmit}>
                        <ArrowRight/>
                    </button>
                </form>
                {showModal && <Pricemodal isOpen={showModal} onClose={handleClose} formData={formData} priceData={formData.price}/>}
            </div>
            {showCart && <Bookmodal isOpen={showModal} bookingData={bookingData}/>}
            <button className='cartbtn' onClick={handleCart}>VIEW CART</button>
        </Hero>
        <div>

        </div>
        <Footer/>
        </>
    )
}