import express from "express";
import { Login, Logout, SignUp, calcPrice } from "../controllers/controller.js";
import { captureOrder, createOrder } from "../utils/paypalUtils.js";

const router = express.Router();

router.post('/getPrices', calcPrice);
router.post('/signup', SignUp);
router.post('/login', Login);
router.get('/logout', Logout);
router.post('/create-order', createOrder)
router.post('/capture-order', captureOrder)

export default router;