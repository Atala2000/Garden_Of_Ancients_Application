import react from 'react';
import '../assets/css/Bookmodal.css';


export const Bookmodal = ({isOpen, isClosed, bookingData}) => {
    return(
        <div className='book-cart'>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Accommodation</th>
                        <th>Period</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingData.cart.map((booking, index) => (
                        <tr key={index}>
                            <td>{booking.user}</td>
                            <td>{booking.accommodation}</td>
                            <td>{booking.period}</td>
                            <td>{booking.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="total-price">PRICE : {bookingData.totalPrice} Ksh</p>
        </div>
    )
}