const CLIENT_ID = 'Your-PayPal-Client-ID';
const CLIENT_SECRET = 'Your-PayPal-Client-Secret';
const PAYPAL_API = 'https://api-m.sandbox.paypal.com';

const getAccessToken = async () => {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await fetch('https://api.sandbox.paypal.com/v1/oauth2/token', {
        method: "POST",
        headers: {
            "Authorization": `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
    });

    const data = await response.json();
    return data.access_token;
};

const createOrder = async (req, res) => {
    const accessToken = await getAccessToken();
    const { amount } = req.body
    try {
        const orderResponse = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'KES',
                        value: amount
                    },
                }],
            }),
        });

        const orderData = await orderResponse.json();
        res.json(orderData)
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating order')
    }
};

const captureOrder = async (req, res) => {
    const { orderID } = req.body;
    const accessToken = await getAccessToken();

    try {
        const captureResponse = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        const captureData = await captureResponse.json();
        res.json(captureData);
    } catch (err) {
        console.error('Error capturing order: '.err);
        res.status(500).send('Error capturing order')
    }
};

export { captureOrder, createOrder };