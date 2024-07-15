import express from "express";
import { calcPrice } from "../controllers/PriceController.js";
import { Login, Logout, SessionCart, SignUp, viewSession } from "../controllers/UserController.js";
import { captureOrderController, createOrderController, getPaymentHistory } from "../controllers/PaymentController.js";



const router = express.Router();

router.post('/getPrices', calcPrice);
router.post('/signup', SignUp);
router.post('/login', Login);
router.get('/logout', Logout);
router.get('/session', viewSession)
router.post('/postCart', SessionCart);
router.post('/createOrder', createOrderController);
router.post('/captureOrder', captureOrderController);
router.get('/getPaymentHistory', getPaymentHistory);


export default router;