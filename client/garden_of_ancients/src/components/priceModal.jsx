import React, {useRef} from "react"
import '../assets/css/priceModal.css'

export const Pricemodal = ({isOpen, onClose, isClosed, formData, priceData, accommodation, isConference, isEducation}) => { 
    
    const modalRef = useRef(null);

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

const periodCheck = () => {
if(formData.accommodation !== 'Room'){
    return formData.period + 1;
}
else{
    return formData.period;
}
}

    return(
        <div className="price-overlay" onClick={isClosed}>
        <div className="modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
            <p>ACCOMODATION : {formData.accommodation}</p>
            {isConference && <p>EVENT TYPE : {formData.eventType}</p>}
            {isEducation && <p>TOUR TYPE : {formData.tourType}</p>}
            <p>ADULT COUNT : {formData.adultCount}</p>
            {!isConference && <p>CHILD COUNT : {formData.childCount}</p>}
            {isConference && <p>START TIME : {formData.startTime}</p>}
            {isConference && <p>END TIME : {formData.endTime}</p>}
            <p>START DATE : {formData.startDate}</p>
            <p>END DATE : {formData.endDate}</p>
            <p>PERIOD : {periodCheck()} {dayCheck()}</p>
            {isConference && <p>TIME ALLOCATED : {formData.periodTime} {hourCheck()}</p>}
            <p className="modal-price">PRICE : {priceData} Ksh</p>
            <button onClick={onClose} className="modal-btn">ADD TO CART</button>
        </div>
        </div>
    )
}

