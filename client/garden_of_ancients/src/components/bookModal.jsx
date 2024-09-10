import react, {useRef} from 'react';
import '../assets/css/Bookmodal.css';

export const Bookmodal = ({ isOpen, isClosed, bookingData }) => {

    const modalRef = useRef(null);
    
    const params = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=-1000,top=-1000";

    const handlePayPalPayment = async () => {
        try {
            const response = await fetch('http://localhost:5500/api/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // This is important to include session data
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

    return (
        <div className='modal-overlay' onClick={(e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
              isClosed();
            }
          }}>
        <div className={`book-cart table-responsive ${isOpen ? 'open' : ''}`} id='book-cart' ref={modalRef} onClick={(e) => e.stopPropagation}>
            <table className='table table-striped'>
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
            <span className="payment__options">
                <button className="btn btn-primary" onClick={handlePayPalPayment}>PayPal</button>
                <button className="btn btn-danger" onClick={isClosed}>Mpesa</button>
            </span>
        </div>
        </div>
    )
}