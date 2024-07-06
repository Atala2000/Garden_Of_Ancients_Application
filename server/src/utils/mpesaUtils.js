import process from 'process';
import { Buffer } from 'buffer';

const getAccessToken = async () => {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    try {
        const response = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
            method: "GET",
            headers: {
                "Authorization": `Basic ${credentials}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error);
    }
};

// Usage
getAccessToken().then(token => {
    console.log('Access Token:', token);
});


const processPayment = async (phone, amount) => {
    const accessToken = await getAccessToken();
    const shortCode = process.env.MPESA_SHORTCODE;
    const passKey = process.env.MPESA_PASSKEY;
    const timeStamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${shortCode}${passKey}${timeStamp}`).toString('base64');

    const payload = {
        "BusinessShortCode": shortCode,
        "Password": password,
        "Timestamp": timeStamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": shortCode,
        "PhoneNumber": phone,
        "CallBackURL": "https://webhook.site/9c7a1c7b-5b1e-4e5c-9d7a-4e9c1b5e7c9a",
        "AccountReference": "Goa",
        "TransactionDesc": "Payment for booking"
    };

    try {
        const response = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error processing payment:', error);
    }
}

export {getAccessToken, processPayment}
