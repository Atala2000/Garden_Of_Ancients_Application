import bcrypt from 'bcrypt';
import Joi from "joi";
import { calculateTotalPrice } from '../services/calc.services.js';
import { PaymentHistory, User } from '../models/models.js';
import path from 'path';
import { fileURLToPath } from 'url';
import xlsx from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

    const excelPath = path.join(__dirname, '../../data/data.xlsx');
    const workbook = xlsx.readFile(excelPath);
    
    
   const userData = await User.findAll({
    attributes : ['id', 'email', 'phone_no', 'password', 'admin']
   });

   const userJson = userData.map(user => ({
    id : user.id,
    email : user.email,
    phone_no : user.phone_no,
    password : user.password,
    admin : user.admin
   }));

   const worksheet =xlsx.utils.json_to_sheet(userJson);

    workbook.Sheets['User'] = worksheet;
    xlsx.writeFile(workbook, excelPath);

    res.status(200).json({ 'message': 'User registered successfully', useremail : req.session });

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
    res.status(200).json({ "message": "User logged in successfully!", useremail : req.session });

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

export const CheckSession = async (req, res) => {
    console.log(req.session)

    if(req.session && req.session.useremail){
        const user = await User.findOne({
            where : {
                email : req.session.useremail
            },
            attributes : ['admin']
        });

        if(user && user.admin){
            res.json({isAuthenticated : true, isAdmin : true, useremail : req.session.useremail})
        }
        else{
        res.json({ isAuthenticated : true, isAdmin : false, useremail : req.session.useremail})
        }
    }
    else{
        res.json({isAuthenticated : false})
    }
}

/**
 * Adds a cart to the session.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object.
 */
export const SessionCart = (req, res) => {
    const user = req.session.useremail;
    const { accommodation, adultCount, childCount, conDate, startDate, endDate, period, price } = req.body;

    const bookings = {
        user,
        accommodation,
        adultCount,
        childCount,
        conDate,
        startDate,
        endDate,
        period,
        price
    }

    console.log(bookings);

    const schema = Joi.object({
        user: Joi.string().trim().email().required(),
        accommodation: Joi.string().required(),
        adultCount: Joi.number().required(),
        childCount: Joi.number(),
        conDate : Joi.date(),
        startDate : Joi.date(),
        endDate : Joi.date(),
        period: Joi.number().required(),
        price: Joi.number().required()
    });

    const result = schema.validate(bookings);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    req.session.sessionCart.currentCart.push(bookings);
    const totalPrice = calculateTotalPrice(req.session.sessionCart.currentCart);
    req.session.sessionCart.totalPrice = totalPrice;
    console.log(req.session.sessionCart.currentCart);
    res.status(200).json({
        cart: req.session.sessionCart.currentCart,
        totalPrice
    });
}

export const Viewcart = (req, res) => {
    const totalPrice = calculateTotalPrice(req.session.sessionCart.currentCart);
    res.status(200).json({
        cart: req.session.sessionCart.currentCart,
        totalPrice
    });
}

export const viewSession = (req, res) => {
    res.status(200).send(req.session)
}

export const GetDates = async(req, res) => {
    console.log("started");
    const memb = req.session.useremail;
    const dates = await PaymentHistory.findAll({
        where : {
            email : memb
        },
        attributes : ['startDate', 'endDate']
    });
    if(dates.length === 0){
        console.log("no dates found");
        return res.status(200).json({message : 'No dates found'});
    }
    
    const formattedDates = dates.map(date => ({
        startDate : date.startDate,
        endDate : date.endDate
    }));
    console.log(formattedDates);

    res.status(200).json(formattedDates);
}

export const History = async(req, res) => {
    const paymentEntry = req.session.sessionCart.currentCart;

    for(const item of paymentEntry){
        await PaymentHistory.create({
            email : item.user,
            amount : item.price,
            startDate : item.startDate,
            endDate : item.endDate,
            startTime : item.startTime,
            endTime : item.endTime,
            period : item.period
        });
    }

    paymentEntry = [];
    res.status(202).json({
        response : 'Payment History Updated'
    });

}