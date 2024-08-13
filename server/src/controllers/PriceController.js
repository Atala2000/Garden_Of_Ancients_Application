import { calculatePrice} from '../services/calc.services.js';
import { Rooms, Conference} from '../models/models.js';
import Joi from 'joi';


export const calcPrice = async (req, res) => {
    let { accommodation, adultCount, childCount, startTime, endTime, startDate, endDate, period, periodTime, eventType } = req.body;

    const booking = {
        accommodation,
        eventType,
        adultCount,
        childCount,
        period,
        periodTime
    }



    const schema = Joi.object({
        accommodation: Joi.string().required(),
        eventType : Joi.string(),
        adultCount: Joi.number().required(),
        childCount: Joi.number(),
        period: Joi.number().required(),
        periodTime : Joi.number()
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
        attributes: ['conference_price', 'photography_price', 'videographu_price', 'wedding_price']
    });
    const conferencePrice = conferencePriceValue[0].conference_price;
    const photographyPrice = conferencePriceValue[0].photography_price;
    const videographyPrice = conferencePriceValue[0].videographu_price;
    const weddingPrice = conferencePriceValue[0].wedding_price;

    const totalPrice = calculatePrice(accommodation, eventType, adultCount, childCount, adultPrice, childPrice, photographyPrice, videographyPrice, weddingPrice, conferencePrice, period, periodTime);
    console.log(totalPrice);
    res.status(200).json(totalPrice);
}


