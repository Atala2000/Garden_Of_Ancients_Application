// utils/paypal.js
import fetch from 'node-fetch';
import { Buffer } from 'buffer';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_API = process.env.PAYPAL_API;


const getAccessToken = async () => {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  try {
    const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
  }
};

const createOrder = async (amount) => {
  const accessToken = await getAccessToken();
  try {
    const orderResponse = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: amount,
          },
        }],
      }),
    });
    const orderData = await orderResponse.json();
    return orderData;
  } catch (error) {
    console.error('Error creating order:', error);
  }
};

const captureOrder = async (orderID) => {
  const accessToken = await getAccessToken();
  try {
    const captureResponse = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    const captureData = await captureResponse.json();
    return captureData;
  } catch (error) {
    console.error('Error capturing order:', error);
  }
};

export { getAccessToken, createOrder, captureOrder };
