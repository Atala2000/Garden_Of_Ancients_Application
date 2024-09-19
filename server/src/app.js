
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
        secure: true, // set to true in production with HTTPS
        sameSite: 'none'
    }
}))
app.use(express.json());
app.use(cors({
    origin: 'https://192.168.100.10:5173',
    credentials: true
}));


app.use('/api', calcPriceRouter);





https.createServer(options, app).listen(5500, () => {
    console.log("Port 5500 is doing just fine!");
    console.log(path.resolve(__dirname, './cert/localhost-key.pem'));
console.log(path.resolve(__dirname, './cert/localhost.pem'));
})