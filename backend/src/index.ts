import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import shopsRouter from './routes/shops';
import productsRouter from './routes/products';
import ordersRouter from './routes/orders';

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/shops', shopsRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

app.get('/', (req, res) => res.send('Flower Delivery API (TS) running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
