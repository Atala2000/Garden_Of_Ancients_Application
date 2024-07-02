import express from 'express';
import { router } from './routes/expressRoutes.js';


const app = express();
app.use(express.json());



const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log("Port "+PORT+" is doing just fine!!");
});