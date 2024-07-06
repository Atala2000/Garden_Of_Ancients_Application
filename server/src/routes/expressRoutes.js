import express from "express";
import { Login, Logout, SignUp, calcPrice, createOrderController, captureOrderController, SessionCart } from "../controllers/controller.js";

const router = express.Router();

router.post('/getPrices', calcPrice);
router.post('/signup', SignUp);
router.post('/login', Login);
router.get('/logout', Logout);
router.post('/postCart', SessionCart);
router.post('/createOrder', createOrderController);
router.post('/captureOrder', captureOrderController);

export default router;