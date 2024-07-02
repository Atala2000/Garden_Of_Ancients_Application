import express from "express";
import { calcPrice } from "../controllers/controller";

const router = express.Router();

router.get('/getPrices', calcPrice);

export default router;