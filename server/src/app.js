
import express from 'express';
import process from 'process';
import calcPriceRouter from './routes/expressRoutes.js';
import session from 'express-session';
import cors from 'cors';


console.log(process.env.PAYPAL_API);
const app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(express.json());
app.use(cors());
app.use('/api', calcPriceRouter);



const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log("Port "+PORT+" is doing just fine!!");
});