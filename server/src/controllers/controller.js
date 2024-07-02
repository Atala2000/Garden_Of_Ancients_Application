import {calculatePrice} from '../services/calc.services.js';
import { User, Rooms, Conference, PaymentHistory } from '../models/models.js';
import Joi from 'joi';

export const calcPrice = async (req, res) => {
let { accomodation, adultCount, childCount, period } = req.body;

const booking = {
    accomodation,
    adultCount,
    childCount,
    period
}

const schema = Joi.object({
    accomodation : Joi.string.requried(),
    adultCount : Joi.number.required(),
    childCount : Joi.number(),
    period: Joi.number()
});

const result = schema.validate(booking);
if(result.error){
    return res.status(400).send(result.error.details[0].message);
}

const adultPrice = await Rooms.findAll({
    attributes : ['adult_price']
});
const childPrice = await Rooms.findAll({
    attributes : ['child_price']
});
const conferencePrice = await Conference.findAll({
    attributes : ['conference_price']
});

const totalPrice = calculatePrice(accomodation, adultCount, childCount, adultPrice, childPrice, conferencePrice, period);
console.log(totalPrice);
res.status(200).send(totalPrice);
}


