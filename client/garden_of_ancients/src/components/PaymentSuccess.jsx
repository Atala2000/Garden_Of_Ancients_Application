import React, { useEffect, useState } from 'react';

export const Success = () => {
    const [status, setStatus] = useState('loading'); // 'loading', 'success', or 'error'

    useEffect(() => {
        const checkPaymentStatus = async () => {
            try {
                const response = await fetch('https://192.168.100.10:5500/api/getHistory', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (response.status === 202) {
                    setStatus('success');
                } else {
                    setStatus('error');
                }
            } catch (error) {
                console.error('Error:', error);
                setStatus('error');
            }
        };

        checkPaymentStatus();
    }, []);

    return (
        <div className="order-status">
            {status === 'loading' && <div>Loading...</div>}
            {status === 'success' && (
                <div className="order-success">
                    <h1>Payment Successful</h1>
                    <p>Thank you for your payment. Please check your email for a confirmation message.</p>
                </div>
            )}
            {status === 'error' && (
                <div className="order-error">
                    <h1>Payment Failed</h1>
                    <p>Sorry, there was an issue with your payment. Please try again later.</p>
                </div>
            )}
        </div>
    );
};
