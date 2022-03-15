import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import dbConnection from './utils/dbConnection.js';
import productRouter from './routers/productRouter.js';

const app = express();

dotenv.config();
dbConnection();

//middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//routes
app.use('/api/product', productRouter);

//port setting and app listen
const Port = process.env.PORT || 5000;
app.listen(Port, () => console.log(`Server running on port ${Port}`));
