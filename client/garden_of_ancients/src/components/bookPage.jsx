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
import differenceInDays from 'date-fns/differenceInDays';
import differenceInHours from 'date-fns/differenceInHours';
import { Bookmodal } from './bookModal'
import {format} from 'date-fns';
import { DateCalendar } from './Calendar'

export const Bookpage = () => {
    const todayDate = () => {
        return format(new Date(), 'yyyy-MM-dd');
    }

    const [showCart, setShowCart] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showEndCalender, setShowEndCalendar] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [bookingData, setBookingData] = useState({
        cart : [],
        totalPrice : 0
    });
    const [formData, setFormData] = useState({
        accommodation : '',
        eventType : '',
        tourType : '',
        adultCount : 0,
        childCount : 0,
        startDate : '',
        endDate : '',
        startTime : '',
        endTime : ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const calcDate = ({formData}) => {
        let start, end;
       
            start = new Date(formData.startDate);
            end = new Date(formData.endDate);
            const period = differenceInDays(end, start);
            return period;
        
    }

    const calcTime = () => {
        let start, end;
        start = new Date(`${formData.startDate}T${formData.startTime}`);
        end = new Date(`${formData.startDate}T${formData.endTime}`);
        const periodTime = differenceInHours(end ,start);
        return periodTime;
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setShowModal(true);
        formData.adultCount = parseInt(formData.adultCount);
        formData.childCount = parseInt(formData.childCount);
        formData.period = calcDate({formData});
        formData.periodTime = calcTime({formData});
        const updatedData = {...formData};
        if(formData.accommodation === 'Conference'){
            delete updatedData.tourType;
        }
        else if(formData.accommodation === 'Education'){
            delete updatedData.eventType;
        }
        console.log(JSON.stringify(updatedData));

        const response = await fetch('http://localhost:5500/api/getPrices', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(updatedData)
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
            body : JSON.stringify(formData),
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

    const isConference = formData.accommodation === 'Conference';
    const isEducation = formData.accommodation === 'Education';

    return(
        <>
        <Hero backgroundImage={imageURL}>
            <Navbar/>
            <div className='book-form'>
                <form onSubmit={handleSubmit} className='booking-form'>
                    <select name="accommodation" className='dropdown' value={formData.accommodation} onChange={handleChange} required>
                        <option value="" disabled>SERVICE</option>
                        <option value="Education">EDUCATIONAL TOUR</option>
                        <option value="Room">ROOM</option>
                        <option value="Conference">CONFERENCE</option>
                    </select>
                    <div className='people-count'>
                        <label htmlFor="adult-count" className='people-pos'>ADULT</label>
                        <input type="number"  id='adult-count' className='people-pos' name='adultCount' value={formData.adultCount} onChange={handleChange} min='0' max='15' required/>
                    </div>
                    {isConference && <select name="eventType" className='event-drop' value={formData.eventType} onChange={handleChange} required>
                        <option value="" disabled>TYPE</option>
                        <option value="Meeting">MEETING</option>
                        <option value="Photography">PHOTOGRAPHY</option>
                        <option value="Videography">VIDEOGRAPHY</option>
                        <option value="Wedding">WEDDING</option>
                    </select>}
                    {isEducation && <select name="tourType" className='tour-drop' value={formData.tourType} onChange={handleChange} required>
                        <option value="" disabled>TYPE</option>
                        <option value="spiceEnclave">SPICE ENCLAVE</option>
                        <option value="beeGarden">BEE GARDEN</option>
                        <option value="fullTour">FULL TOUR</option>
                    </select>}
                    {isConference || isEducation ? <div className='date-count'>
                        <label htmlFor="start-date"></label>
                        <input type="text" id='start-date' readOnly placeholder='Select Start Date' value={formData.startDate} onChange={handleChange} name='startDate' onClick={() => setShowCalendar(!showCalendar)} required/><br/>
                        {showCalendar && <DateCalendar onChange={(date) => {setFormData({...formData, startDate : format(date, 'yyyy-MM-dd')}); setShowCalendar(false)}}/>}
                    </div>: <div className='people-count'>
                        <label htmlFor="child-count" className='people-pos'>CHILDREN</label>
                        <input type="number" id='child-count' className='people-pos' name='childCount' value={formData.childCount} onChange={handleChange} min='0' max='15' required/>
                    </div>}
                    {(isConference || isEducation) && (<div className='date-count'>
<label htmlFor="end-date"></label>
<input type="text" id='end-date' value={formData.endDate} onChange={handleChange} placeholder='Select End Date' onClick={() => setShowEndCalendar(!showEndCalender)} readOnly name='endDate' required/><br/>
{showEndCalender && <DateCalendar onChange={(date) => {setFormData({...formData, endDate : format(date, 'yyyy-MM-dd')}); setShowEndCalendar(false)}}/>}
</div>)}
                    {isConference || isEducation ? <div className='date-count'>
<label htmlFor="start-time"></label>
<input type="time" id='start-time' value={formData.startTime} onChange={handleChange} name='startTime' required/>
</div> : <div className='date-count'>
<label htmlFor="start-date"></label>
<input type="date" id='start-date' value={formData.startDate} onChange={handleChange} name='startDate' required/>
</div>}
                    {isConference || isEducation ? <div className='date-count'>
<label htmlFor="end-time"></label>
<input type="time" id='end-time' value={formData.endTime} onChange={handleChange} name='endTime' required/>
</div> : <div className='date-count'>
<label htmlFor="end-date"></label>
<input type="date" id='end-date' value={formData.endDate} onChange={handleChange} name='endDate' required/>
</div>}
                    <button type='submit' className='submit-btn' onClick={handleSubmit}>
                        <ArrowRight/>
                    </button>
                </form>
                {showModal && <Pricemodal isOpen={showModal} accommodation={formData.accommodation} onClose={handleClose} formData={formData} priceData={formData.price} isConference={isConference} isEducation={isEducation}/>}
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



