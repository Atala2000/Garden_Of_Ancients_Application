import React, { useRef, useState } from 'react';
import '../assets/css/Bookmodal.css';

export const Bookmodal = ({ isOpen, isClosed, bookingData }) => {
  const modalRef = useRef(null);
  const [isMpesaModalOpen, setIsMpesaModalOpen] = useState(false); // State for M-Pesa modal
  const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number input
  
  const params = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=-1000,top=-1000";

  const handlePayPalPayment = async () => {
    try {
      const response = await fetch('http://localhost:5500/api/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include session data
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await response.json();

      if (orderData) {
        window.open(orderData, '_blank', params);
      } else {
        throw new Error('Invalid order data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  // Handle Mpesa payment
  const handleMpesaPayment = async () => {
    if (!phoneNumber) {
      alert('Please enter a valid phone number');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5500/api/MpesaPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ phone_no: phoneNumber }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
  
      // Handle the response data if necessary
      console.log('Payment response:', responseData);
  
      // Optionally, you can provide feedback to the user
      alert('Payment request has been sent successfully.');
  
      // Close the M-Pesa modal
      setIsMpesaModalOpen(false);
    } catch (error) {
      console.error('Error during M-Pesa payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <>
      {/* Main Booking Modal */}
      <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => {
          if (modalRef.current && !modalRef.current.contains(e.target)) {
            isClosed();
          }
        }}>
        <div className="book-cart" ref={modalRef} onClick={(e) => e.stopPropagation()}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Email</th>
                <th>Accommodation</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Period</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.cart.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.user}</td>
                  <td>{booking.accommodation}</td>
                  <td>{booking.startDate}</td>
                  <td>{booking.endDate}</td>
                  <td>{booking.period}</td>
                  <td>{booking.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total-price">PRICE : {bookingData.totalPrice} Ksh</p>
          <div className="payment__options">
            <button className="btn btn-primary" onClick={handlePayPalPayment}>PayPal</button>
            <button className="btn btn-danger" onClick={() => setIsMpesaModalOpen(true)}>Mpesa</button>
          </div>
        </div>
      </div>

      {/* Mpesa Modal */}
      {isMpesaModalOpen && (
        <div className="modal-overlay open" onClick={() => setIsMpesaModalOpen(false)}>
          <div className="mpesa-modal" onClick={(e) => e.stopPropagation()}>
            <h2>M-Pesa Payment</h2>
            <p>Please enter your phone number to proceed with the payment.</p>
            <input 
              type="text" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              placeholder="Enter phone number" 
              required
            />
            <div className="modal-buttons">
              <button className="btn btn-success" onClick={handleMpesaPayment}>Submit</button>
              <button className="btn btn-secondary" onClick={() => setIsMpesaModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
