import React from "react"
import '../assets/css/priceModal.css'

export const Pricemodal = ({isOpen, onClose, formData, priceData}) => { 
    return(
        <div className="modal">
            <p>ACCOMODATION : {formData.accommodation}</p>
            <p>ADULT COUNT : {formData.adultCount}</p>
            <p>CHILD COUNT : {formData.childCount}</p>
            <p>START DATE : {formData.startDate}</p>
            <p>END DATE : {formData.endDate}</p>
            <p>PERIOD : {formData.period} days</p>
            <p className="modal-price">PRICE : {priceData} Ksh</p>
            <button onClick={onClose} className="modal-btn">ADD TO CART</button>
        </div>
    )
}

