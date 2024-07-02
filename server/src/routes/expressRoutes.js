import express from "express";
import { calcPrice } from "../controllers/controller.js";

const router = express.Router();

router.post('/getPrices', calcPrice);

export default router;