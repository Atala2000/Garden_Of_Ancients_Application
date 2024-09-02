import express from "express";
import { calcPrice } from "../controllers/PriceController.js";
import { Login, Logout, SessionCart, SignUp, viewSession, CheckSession, Viewcart, GetDates, History } from "../controllers/UserController.js";
import { captureOrderController, createOrderController, getPaymentHistory } from "../controllers/PaymentController.js";
import { UploadExcel, upload, DownloadExcel } from "../controllers/Excelcontroller.js";



const router = express.Router();

router.post('/getPrices', calcPrice);
router.post('/signup', SignUp);
router.post('/login', Login);
router.get('/logout', Logout);
router.get('/checkSession', CheckSession);
router.get('/viewCart', Viewcart);
router.get('/session', viewSession);
router.post('/postCart', SessionCart);
router.post('/createOrder', createOrderController);
router.post('/captureOrder', captureOrderController);
router.get('/getPaymentHistory', getPaymentHistory);
router.get('/getHistory', History);
router.post('/uploadExcel', upload.single('file'), UploadExcel);
router.get('/downloadExcel', DownloadExcel);
router.get('/getDates', GetDates);


export default router;