import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import { inngest } from "../inngest/index.js";
import crypto from "crypto";
import razorpay from "../config/razorpay.js";

// POST /api/orders - Create Order
export const createOrder = async (req, res) => {
    try {
        const { items, shippingAddress, paymentMethod } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "No order items",
            });
        }

        const productIds = items.map(item => item.product);

        const products = await Product.find({
            _id: { $in: productIds },
        });

        const productMap = {};

        products.forEach(product => {
            productMap[product._id.toString()] = product;
        });

        // Validate stock
        for (const item of items) {
            const product = productMap[item.product.toString()];

            if (!product) {
                return res.status(404).json({
                    message: `Product ${item.product} not found`,
                });
            }

            if ((product.stock ?? 0) < item.quantity) {
                return res.status(400).json({
                    message: `${product.name} is out of stock`,
                });
            }
        }

        // Create order items
        const orderItems = items.map(item => {
            const dbProduct = productMap[item.product.toString()];

            return {
                product: dbProduct._id,
                name: dbProduct.name,
                image: dbProduct.image,
                price: dbProduct.price,
                quantity: item.quantity,
                unit: dbProduct.unit,
            };
        });

        // Calculate prices
        const subtotal = orderItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const deliveryFee = subtotal > 99 ? 0 : 30;

        const tax = Math.round(subtotal * 0.08 * 100) / 100;

        const total = Math.round((subtotal + deliveryFee + tax) * 100) / 100;

        // Create order
        const order = await Order.create({
            userId: req.user.id,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            subtotal,
            deliveryFee,
            tax,
            total,
            statusHistory: [
                {
                    status: "Placed",
                    note: "Order placed successfully",
                    timestamp: new Date(),
                },
            ],
        });

        // Card Payment
        if (paymentMethod === "card") {

            const razorpayOrder = await razorpay.orders.create({
                amount: Math.round(total * 100),
                currency: "INR",
                receipt: order._id.toString(),
                notes: {
                    orderId: order._id.toString(),
                    userId: req.user.id,
                },
            });

            order.razorpayOrderId = razorpayOrder.id;
            await order.save();

            return res.status(201).json({
                message: "Razorpay order created",
                order,
                razorpayOrder,
            });
        }

        // COD -> Reduce stock immediately
        for (const item of orderItems) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: {
                    stock: -item.quantity,
                },
            });
        }

        for (const item of orderItems) {
            await inngest.send({
                name: "inventory/stock.updated",
                data: {
                    productId: item.product,
                },
            });
        }

        await inngest.send({
            name: "order/placed",
            data: {
                orderId: order._id,
            },
        });

        return res.status(201).json({
            message: "Order placed successfully",
            order,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message,
        });
    }
};

export const verifyPayment = async (req, res) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        const order = await Order.findOne({
            razorpayOrderId: razorpay_order_id,
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(
                razorpay_order_id + "|" + razorpay_payment_id
            )
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {

            order.paymentStatus = "Failed";
            await order.save();

            return res.status(400).json({
                message: "Payment verification failed",
            });
        }

        // Payment Success
        order.isPaid = true;
        order.paymentStatus = "Paid";
        order.razorpayPaymentId = razorpay_payment_id;
        order.paidAt = new Date();

        await order.save();

        // Reduce stock now
        for (const item of order.items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: {
                    stock: -item.quantity,
                },
            });
        }

        // Inngest events
        for (const item of order.items) {
            await inngest.send({
                name: "inventory/stock.updated",
                data: {
                    productId: item.product,
                },
            });
        }

        await inngest.send({
            name: "order/placed",
            data: {
                orderId: order._id,
            },
        });

        return res.status(200).json({
            message: "Payment verified successfully",
            order,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Users orders - GET /api/orders
export const getUserOrders = async (req, res) => {
    try {
        const { status } = req.query;

        const filter = {
            userId: req.user.id,

            $nor: [
                {
                    paymentMethod: "card",
                    isPaid: false
                }
            ]
        };

        if (status && status !== "all") {
            filter.status = status;
        }

        const orders = await Order.find(filter)
            .populate("deliveryPartnerId", "name phone");

        res.json({ orders });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get single order - GET /api/orders/:id
export const getOrder = async (req, res) => {
    try {

        const order = await Order.findOne({
            _id: req.params.id,
            userId: req.user.id
        }).populate(
            "deliveryPartnerId",
            "name phone avatar vehicleType"
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ order });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update order - PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
    try {

        const { status, note } = req.body;

        // Find the order
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Get existing history
        const history = Array.isArray(order.statusHistory)
            ? order.statusHistory
            : [];

        // Add new status
        history.push({
            status,
            note: note || `Order ${status.toLowerCase()}`,
            timestamp: new Date()
        });

        // Update order
        order.status = status;
        order.statusHistory = history;

        await order.save();

        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all orders(admin) GET /api/orders/all
export const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            $nor: [
                {
                    paymentMethod: "card",
                    isPaid: false
                }
            ]
        })
            .populate("userId", "name email")
            .populate("deliveryPartnerId", "name phone email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            orders
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get Order Location - GET /api/orders/:id/location
export const getOrderLocation = async (req, res) => {
    try {

        const order = await Order.findOne({
            _id: req.params.id,
            userId: req.user.id
        }).select("liveLocation status");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            liveLocation: order.liveLocation,
            status: order.status
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};