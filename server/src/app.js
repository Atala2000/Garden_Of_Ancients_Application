
import express from 'express';
import process from 'process';
import calcPriceRouter from './routes/expressRoutes.js';
import session from 'express-session';
import cors from 'cors';
import cookieparser from 'cookie-parser'
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = {
    key : fs.readFileSync('./cert/localhost-key.pem'),
    cert : fs.readFileSync('./cert/localhost.pem')
}

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

const port = process.env.PORT || 5500;
app.listen(port, () => {
    console.log("Port "+port+" is doing just fine!")
})