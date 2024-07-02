import express from "express";
import { calcPrice } from "../controllers/controller.js";

const router = express.Router();

router.get('/getPrices', calcPrice);

export { router }