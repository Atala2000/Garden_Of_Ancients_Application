import { calculatePrice} from '../services/calc.services.js';
import { Rooms, Conference} from '../models/models.js';
import Joi from 'joi';


export const calcPrice = async (req, res) => {
    let { accommodation, adultCount, childCount, startDate, endDate, period } = req.body;

    const booking = {
        accommodation,
        adultCount,
        childCount,
        period
    }

    const schema = Joi.object({
        accommodation: Joi.string().required(),
        adultCount: Joi.number().required(),
        childCount: Joi.number(),
        period: Joi.number().required()
    });

    const result = schema.validate(booking);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    const adultPriceValue = await Rooms.findAll({
        attributes: ['adult_price']
    });
    const adultPrice = adultPriceValue[0].adult_price;
    const childPriceValue = await Rooms.findAll({
        attributes: ['child_price']
    });
    const childPrice = childPriceValue[0].child_price;
    const conferencePriceValue = await Conference.findAll({
        attributes: ['conference_price']
    });
    const conferencePrice = conferencePriceValue[0].conference_price;

    const totalPrice = calculatePrice(accommodation, adultCount, childCount, adultPrice, childPrice, conferencePrice, period);
    console.log(totalPrice);
    res.status(200).json(totalPrice);
}


