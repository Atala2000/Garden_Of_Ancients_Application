import express from "express";
import { Login, Logout, SessionCart, SignUp, calcPrice } from "../controllers/controller.js";

const router = express.Router();

router.post('/getPrices', calcPrice);
router.post('/signup', SignUp);
router.post('/login', Login);
router.get('/logout', Logout);
router.post('/getCart', SessionCart);

export default router;