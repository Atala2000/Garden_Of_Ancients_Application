import { captureOrder, createOrder } from "../utils/paypalUtils.js";

export const createOrderController = async (req, res) => {
    try {
        const orderData = await createOrder(req.session.sessionCart.totalPrice, req.session.sessionCart.currentCart);
        res.json(orderData);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Error creating order');
    }
};

export const captureOrderController = async (req, res) => {
    const { orderID } = req.body;
    try {
        const captureData = await captureOrder(orderID);
        res.json(captureData);
    } catch (error) {
        console.error('Error capturing order:', error);
        res.status(500).send('Error capturing order');
    }
};
