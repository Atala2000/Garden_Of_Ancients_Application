import { captureOrder, createOrder } from "../utils/paypalUtils.js";
import { PaymentHistory } from "../models/models.js";

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

        const email = captureData.payment_source.paypal.email_address;
        const amount = captureData.purchase_units[0].payments.captures[0].amount.value;
        const time = captureData.purchase_units[0].payments.captures[0].create_time;

        await PaymentHistory.create({
            email: email,
            amount: amount,
            time: time
        })
        req.session.paypalEmail = email;

        res.json(captureData);
    } catch (error) {
        console.error('Error capturing order:', error);
        res.status(500).send('Error capturing order');
    }
};

export const getPaymentHistory = async (req, res) => {
    const paypalemail = req.session.paypalEmail;

    const userPayments = await PaymentHistory.findAll({
        where : {
            email : paypalemail
        }
    });
    console.log(userPayments);

    res.status(200).json(userPayments);
}