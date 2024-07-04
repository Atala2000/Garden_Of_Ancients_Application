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