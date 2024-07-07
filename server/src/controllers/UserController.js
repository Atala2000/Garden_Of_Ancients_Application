import bcrypt from 'bcrypt';
import Joi from "joi";
import { calculateTotalPrice } from '../services/calc.services.js';
import { User } from '../models/models.js';

/**
 * Sign up a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object.
 */
export const SignUp = async (req, res) => {
    const { useremail, userpassword, phone_number } = req.body;

    const userInfo = {
        useremail,
        userpassword,
        phone_number
    }

    const schema = Joi.object({
        useremail: Joi.string().trim().email().required(),
        userpassword: Joi.string().min(8).required(),
        phone_number: Joi.string().min(10).max(10).required()
    });

    const result = schema.validate(userInfo);
    if (result.error) {
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

/**
 * Logs in a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object.
 */
export const Login = async (req, res) => {
    const { useremail, userpassword } = req.body;

    const userInfo = {
        useremail,
        userpassword
    }

    const schema = Joi.object({
        useremail: Joi.string().trim().email().required(),
        userpassword: Joi.string().min(8).required()
    })

    const result = schema.validate(userInfo);
    if (result.error) {
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
    res.status(200).json({ "message": "User logged in successfully!" });

}


/**
 * Logs out a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object.
 */
export const Logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(400).json();
        }
        res.status(200).json({ "message": "User logged out successfully!" });
    });
}

/**
 * Adds a cart to the session.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object.
 */
export const SessionCart = (req, res) => {
    const user = req.session.useremail;
    const { accomodation, adultCount, childCount, period, price } = req.body;

    const bookings = {
        user,
        accomodation,
        adultCount,
        childCount,
        period,
        price
    }

    const schema = Joi.object({
        user: Joi.string().trim().email().required(),
        accomodation: Joi.string().required(),
        adultCount: Joi.number().required(),
        childCount: Joi.number(),
        period: Joi.number().required(),
        price: Joi.number().required()
    });

    const result = schema.validate(bookings);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    req.session.sessionCart.currentCart.push(bookings);
    const totalPrice = calculateTotalPrice(req.session.sessionCart.currentCart);

    res.status(200).json({
        cart: req.session.sessionCart.currentCart,
        totalPrice
    });
}