import express from 'express';
import calcPriceRouter from './routes/expressRoutes.js';


const app = express();
app.use(express.json());
app.use('/api', calcPriceRouter);



const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log("Port "+PORT+" is doing just fine!!");
});