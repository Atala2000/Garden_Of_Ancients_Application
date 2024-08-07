
import express from 'express';
import process from 'process';
import calcPriceRouter from './routes/expressRoutes.js';
import session from 'express-session';
import cors from 'cors';
import cookieparser from 'cookie-parser'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(process.env.PAYPAL_API);
const app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        httpOnly: true,
        secure: false, // set to true in production with HTTPS
        sameSite: 'lax'
    }
}))
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


app.use('/api', calcPriceRouter);





const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log("Port "+PORT+" is doing just fine!!");
});