import React from "react"
import '../assets/css/priceModal.css'

export const Pricemodal = ({isOpen, onClose, formData, priceData, accommodation, isConference, isEducation}) => { 
    

const dayCheck = () => {
    if(formData.period > 1){
        return 'days';
    }
    else if(formData.period === 1){
        return 'day';
    }
}

const hourCheck = () => {
    if(formData.periodTime > 1){
        return 'hours';
    }
    else if(formData.periodTime === 1){
        return 'hour';
    }
}

    return(
        <div className="modal">
            <p>ACCOMODATION : {formData.accommodation}</p>
            {isConference && <p>EVENT TYPE : {formData.eventType}</p>}
            {isEducation && <p>TOUR TYPE : {formData.tourType}</p>}
            <p>ADULT COUNT : {formData.adultCount}</p>
            {!isConference && <p>CHILD COUNT : {formData.childCount}</p>}
            {isConference && <p>START TIME : {formData.startTime}</p>}
            {isConference && <p>END TIME : {formData.endTime}</p>}
            <p>START DATE : {formData.startDate}</p>
            <p>END DATE : {formData.endDate}</p>
            <p>PERIOD : {formData.period} {dayCheck()}</p>
            {isConference && <p>TIME ALLOCATED : {formData.periodTime} {hourCheck()}</p>}
            <p className="modal-price">PRICE : {priceData} Ksh</p>
            <button onClick={onClose} className="modal-btn">ADD TO CART</button>
        </div>
    )
}

