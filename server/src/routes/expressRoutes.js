import express from "express";
import { Login, Logout, SignUp, calcPrice, captureOrderController, createOrderController } from "../controllers/controller.js";

const router = express.Router();

router.post('/getPrices', calcPrice);
router.post('/signup', SignUp);
router.post('/login', Login);
router.get('/logout', Logout);
app.post('/create-order', createOrderController);
app.post('/capture-order', captureOrderController);

export default router;