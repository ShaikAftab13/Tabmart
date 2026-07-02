import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import DeliveryPartner from "../models/deliveryPartnerModel.js";
import bcrypt from "bcrypt";

// GET /api/admin -get admin dashboard data
export const getAdminStats = async (req, res) => {
    const [totalOrders, totalUsers, totalProducts, outOfStock, totalPartners, recentOrders] = await Promise.all([
        Order.countDocuments({
            $nor: [{ paymentMethod: "card", isPaid: false }]
        }),

        User.countDocuments(),

        Product.countDocuments(),

        Product.countDocuments({
            stock: 0
        }),

        DeliveryPartner.countDocuments(),

        Order.find({ $nor: [{ paymentMethod: "card", isPaid: false }] }).sort({ createdAt: -1 }).limit(8)
            .populate("userId", "name email")
            .populate("deliveryPartnerId", "name phone")
    ]);
    res.json({ totalOrders, totalUsers, totalProducts, outOfStock, totalPartners, recentOrders })
}

// delivery partners list for admin
export const getDeliveryPartners = async (req, res) => {
    const partners = await DeliveryPartner.find().sort({ createdAt: -1 });
    res.json({ partners });
}

// create delivery partner profile
export const createDeliveryPartner = async (req, res) => {
    const { name, email, password, phone, vehicleType } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const partner = await DeliveryPartner.create({
        name, email: email.trim().toLowerCase(), password: hashedPassword, phone, vehicleType
    })

    res.status(201).json({ partner });
}

// update delivery partner profile
export const updateDeliveryPartner = async (req, res) => {
    try {
        const { name, phone, vehicleType, isActive } = req.body;

        const data = {};

        if (name) data.name = name;
        if (phone) data.phone = phone;
        if (vehicleType) data.vehicleType = vehicleType;
        if (isActive !== undefined) {
            data.isActive = isActive;
        }

        const partner = await DeliveryPartner.findByIdAndUpdate(
            req.params.id,
            data,
            { new: true }
        );

        if (!partner) {
            return res.status(404).json({ message: "Delivery Partner not found" });
        }

        return res.json({ partner });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// assign delivery partner for order
export const assignDeliveryPartner = async (req, res) => {
    try {
        const { partnerId } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const partner = await DeliveryPartner.findById(partnerId);

        if (!partner) {
            return res.status(404).json({ message: "Delivery partner not found" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        let status = order.status;

        const history = Array.isArray(order.statusHistory)
            ? order.statusHistory
            : [];

        if (order.status === "Placed" || order.status === "Confirmed") {
            status = "Assigned";

            history.push({
                status: "Assigned",
                note: `Assigned to ${partner.name}`,
                timestamp: new Date()
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            order._id,
            {
                deliveryPartnerId: partner._id,
                deliveryOtp: otp,
                status,
                statusHistory: history
            },
            { new: true }
        );

        return res.json({ order: updatedOrder });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};