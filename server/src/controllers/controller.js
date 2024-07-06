import {calculatePrice} from '../services/calc.services.js';
import { User, Rooms, Conference, PaymentHistory } from '../models/models.js';
import Joi from 'joi';
import { error } from 'console';

export const calcPrice = async (req, res) => {
let { accomodation, adultCount, childCount, period } = req.body;

const booking = {
    accomodation,
    adultCount,
    childCount,
    period
}

const schema = Joi.object({
    accomodation : Joi.string().required(),
    adultCount : Joi.number().required(),
    childCount : Joi.number(),
    period: Joi.number().required()
});

const result = schema.validate(booking);
if(result.error){
    return res.status(400).send(result.error.details[0].message);
}

const adultPriceValue = await Rooms.findAll({
    attributes : ['adult_price']
});
const adultPrice = adultPriceValue[0].adult_price;
const childPriceValue = await Rooms.findAll({
    attributes : ['child_price']
});
const childPrice = childPriceValue[0].child_price;
const conferencePriceValue = await Conference.findAll({
    attributes : ['conference_price']
});
const conferencePrice = conferencePriceValue[0].conference_price;

const totalPrice = calculatePrice(accomodation, adultCount, childCount, adultPrice, childPrice, conferencePrice, period);
console.log(totalPrice);
res.status(200).json(totalPrice);
}

export const SignUp = async (req, res) => {
    const {useremail, userpassword, phone_number} = req.body;

    const userInfo = {
        useremail,
        userpassword,
        phone_number
    }

    const schema = Joi.object({
        useremail : Joi.string().trim().email().required(),
        userpassword : Joi.string().min(8).required(),
        phone_number: Joi.string().min(10).max(10).required()
    });

    const result = schema.validate(userInfo);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(userpassword, salt);

    await User.create({
        email: useremail,
        phone_no: phone_number,
        password: hashedPassword
    });
    req.session.loggedin = true;
    req.session.useremail = useremail;
    if (!req.session.sessionCart) {
        req.session.sessionCart = {
            currentCart: [],
            totalPrice: calculateTotalPrice([]) // Pass an empty array initially
        };
    }
    res.status(200).json();

}

export const Login = async (req, res) => {
    const {useremail, userpassword} = req.body;

    const userInfo = {
        useremail,
        userpassword
    }

    const schema = Joi.object({
        useremail: Joi.string().trim().email().required(),
        userpassword: Joi.string().min(8).required()
    })     

    const result = schema.validate(userInfo);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }
    
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(userpassword, salt);

    await User.findOne({
        where: {
            email: useremail,
            password: hashedPassword
        }
    });
    req.session.loggedin = true;
    req.session.useremail = useremail;
    if (!req.session.sessionCart) {
        req.session.sessionCart = {
            currentCart: [],
            totalPrice: calculateTotalPrice([]) // Pass an empty array initially
        };
    }
    res.status(200).json({"message" : "User logged in successfully!"});

}

export const Logout = async (req, res) => {
    req.session.destroy((err) => {
        if(err){
            return res.status(400).json();
        }
        res.status(200).json({"message" : "User logged out successfully!"});
    });
}

export const createOrderController = async (req, res) => {
    const { amount } = req.body;
    try {
      const orderData = await createOrder(amount);
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
  
