import express from 'express';
import { createOrder,verifyPayment, getAllOrders, getOrder, getOrderLocation, getUserOrders, updateOrderStatus } from '../controllers/orderController.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const orderRouter = express.Router();

orderRouter.post('/',auth, createOrder);
orderRouter.post("/verify-payment", auth, verifyPayment);
orderRouter.get('/',auth, getUserOrders);
orderRouter.get('/all',auth,admin, getAllOrders);
orderRouter.get('/:id',auth, getOrder);
orderRouter.put('/:id/status',auth, updateOrderStatus);
orderRouter.get('/:id/location',auth, getOrderLocation);

export default orderRouter;