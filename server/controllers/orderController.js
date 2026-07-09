import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import { inngest } from "../inngest/index.js";

// POST /api/orders - Create Order
export const createOrder = async (req, res) => {
    try {
        const { items, shippingAddress, paymentMethod } = req.body;

        // Check if order items exist
        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "No order items"
            });
        }

        // Get all product IDs
        const productIds = items.map(item => item.product);

        // Fetch all products in one query
        const products = await Product.find({
            _id: { $in: productIds }
        });

        // Create lookup object
        const productMap = {};

        products.forEach(product => {
            productMap[product._id.toString()] = product;
        });

        // Validate stock
        for (const item of items) {
            const product = productMap[item.product.toString()];

            if (!product) {
                return res.status(404).json({
                    message: `Product ${item.product} not found`
                });
            }

            if ((product.stock ?? 0) < item.quantity) {
                return res.status(400).json({
                    message: `${product.name} is out of stock`
                });
            }
        }

        // Create order items using database values
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
        const subTotal = orderItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const deliveryFee = subTotal > 99 ? 0 : 30;

        const tax = Math.round(subTotal * 0.08 * 100) / 100;

        const total =
            Math.round((subTotal + deliveryFee + tax) * 100) / 100;

        // Create order
        const order = await Order.create({
            userId: req.user.id,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            subtotal: subTotal,
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

        // Reduce stock
        for (const item of orderItems) {
            await Product.findByIdAndUpdate(
                item.product,
                {
                    $inc: {
                        stock: -item.quantity,
                    },
                }
            );
        }

        for(const item of orderItems) {
            await inngest.send({
                name: "inventory/stock.updated",
                data: {
                    productId: item.product
                }
            })
        }

        await inngest.send({
            name: "order/placed",
            data: {
                orderId: order._id
            }
        })

        if (paymentMethod === "card") {
            // Create Stripe Payment Intent
        }

        return res.status(201).json({ message: "Order placed successfully", order });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
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