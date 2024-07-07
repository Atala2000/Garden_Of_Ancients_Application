import express from "express";
import { calcPrice } from "../controllers/PriceController";
import { Login, Logout, SessionCart, SignUp } from "../controllers/UserController";
import { captureOrderController, createOrderController } from "../controllers/PaymentContoller";



const router = express.Router();

router.post('/getPrices', calcPrice);
router.post('/signup', SignUp);
router.post('/login', Login);
router.get('/logout', Logout);
router.post('/postCart', SessionCart);
router.post('/createOrder', createOrderController);
router.post('/captureOrder', captureOrderController);

export default router;