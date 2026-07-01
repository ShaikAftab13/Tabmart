import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './config/db.js';
import authRouter from './routes/authRouter.js';
import cookieParser from "cookie-parser";
import productRouter from './routes/productRouter.js';
import uploadRouter from './routes/uploadRouter.js';
import orderRouter from './routes/orderRouter.js';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app = express();

const allowedOrigins = [
    'http://localhost:5173'
]

app.use(cors({origin: allowedOrigins,credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/orders', orderRouter);

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({message: err.message});
})

const PORT = process.env.PORT || 3000;
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is live at http://localhost:${PORT}`);
    });
};

startServer();