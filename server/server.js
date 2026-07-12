import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';

import authRouter from './routes/authRouter.js';
import productRouter from './routes/productRouter.js';
import uploadRouter from './routes/uploadRouter.js';
import orderRouter from './routes/orderRouter.js';

import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import addressRouter from './routes/addressRouter.js';
import adminRouter from './routes/adminRouter.js';
import deliveryPartnerRouter from './routes/deliveryPartnerRouter.js';
import cartRouter from './routes/cartRouter.js';

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://tabmart.vercel.app',
    ],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/orders', orderRouter);
app.use('/api/addresses', addressRouter);
app.use('/api/admin', adminRouter);
app.use('/api/delivery', deliveryPartnerRouter);
app.use('/api/cart', cartRouter);


app.use((err, req, res, next) => {
    console.error("Error: ", err);
    res.status(500).json({
        message: err.message || "Internal Server Error"
    });
});

export default app;