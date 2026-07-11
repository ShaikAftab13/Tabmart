import DeliveryPartner from "../models/deliveryPartnerModel.js";
import Order from "../models/orderModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const generateToken = (id) => {
    return jwt.sign(
        {
            id,
            role: "Delivery"
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    );
};

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    partitioned: true,
    maxAge: 30 * 24 * 60 * 60 * 1000
};

export const getPartnerUser = async (req, res) => {
    try {
        res.status(200).json({ partner: req.partner });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/delivery/login Login Delivery Partner
export const loginPartner = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    const partner = await DeliveryPartner.findOne({ email: email.toLowerCase() });

    if (!partner) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!partner.isActive) {
        return res.status(403).json({ message: "Your account has been deactivated" });
    }

    const isMatch = await bcrypt.compare(password, partner.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(partner._id);
    res.cookie('deliveryToken', token, cookieOptions);

    const partnerData = partner.toObject();
    delete partnerData.password;

    return res.json({ partner: partnerData });
}

export const logoutPartner = async (req, res) => {
    try {
        res.clearCookie('deliveryToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.status(200).json({ message: "Delivery Partner Logged Out" });
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

// GET /api/delivery/my-deliveries Get assigned deliveries

export const getMyDeliveries = async (req, res) => {
    const { status } = req.query;

    const filter = { deliveryPartnerId: req.partner.id };

    if (status === "active") {
        filter.status = {
            $in: ["Assigned", "Packed", "Out for Delivery"]
        };
    } else if (status === "completed") {
        filter.status = {
            $in: ["Delivered", "Cancelled"]
        };
    }

    const orders = await Order.find(filter)
        .populate("userId", "name email phone")
        .sort({ createdAt: -1 });

    return res.json({ orders });
};

// GET /api/delivery/my-deliveries/:id Get single delivery detail
export const getDeliveryDetail = async (req, res) => {
    const order = await Order.findOne({
        _id: req.params.id,
        deliveryPartnerId: req.partner.id
    }).populate("userId", "name email phone");

    if (!order) {
        return res.status(404).json({ message: "Delivery not found" });
    }

    res.json({ order });
};

// PUT /api/delivery/my-deliveries/:id/complete Complete delivery with OTP
export const completeDelivery = async (req, res) => {
    const { otp } = req.body;

    const order = await Order.findOne({ _id: req.params.id, deliveryPartnerId: req.partner.id });

    if (!order || order.status === "Cancelled" || order.status === "Delivered") {
        return res.status(400).json({ message: "Invalid Request" });
    }

    if (order.deliveryOtp !== otp) {
        return res.status(500).json({ message: "Invalid OTP" });
    }

    const history = order.statusHistory;

    history.push({
        status: "Delivered",
        note: "Delivered by partner",
        timeStamp: new Date()
    });

    order.status = "Delivered";
    order.statusHistory = history;
    order.deliveryOtp = "";

    await order.save();

    res.json({ message: "Delivery completed successfully", order });
};

// PUT /api/delivery/my-deliveries/:id/cancel cancel delivery
export const cancelDelivery = async (req, res) => {
    const { reason } = req.body;

    const order = await Order.findOne({ _id: req.params.id, deliveryPartnerId: req.partner.id });

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "Delivered") {
        return res.status(400).json({ message: "Cannot cancel a delivered order" });
    }

    const history = order.statusHistory;

    history.push({
        status: "Cancelled",
        note: reason || "",
        timestamp: new Date()
    });

    order.status = "Cancelled";
    order.statusHistory = history;

    await order.save();

    res.json({ order, message: "Delivery cancelled successfully" });
};


// PUT /api/delivery/my-deliveries/:id/status update order status
export const updateDeliveryStatus = async (req, res) => {
    const { status } = req.body;
    const allowedStatus = ["Packed", "Out for Delivery"];

    if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status update" });
    }

    const order = await Order.findOne({ _id: req.params.id, deliveryPartnerId: req.partner.id });

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    const history = order.statusHistory;

    history.push({
        status,
        note: `Status updated to ${status}`,
        timestamp: new Date()
    })

    const updatedOrder = await Order.findByIdAndUpdate(
        order._id,
        {
            status,
            $push: {
                statusHistory: {
                    status,
                    note: `Status updated to ${status}`,
                    timestamp: new Date()
                }
            }
        },
        { returnDocument: "after" }
    );

    res.json({ order: updatedOrder });
}

// PUT /api/delivery/my-deliveries/:id/location update live location

export const updateLocation = async (req, res) => {
    const { lat, lng } = req.body;

    const order = await Order.findOne({
        _id: req.params.id,
        deliveryPartnerId: req.partner.id,
        status: {
            $in: ["Assigned", "Packed", "Out for Delivery"]
        }
    });

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
        order._id,
        {
            liveLocation: {
                lat,
                lng,
                updatedAt: new Date()
            }
        },
        { returnDocument: "after" }
    );

    res.json({
        success: true,
        order: updatedOrder
    });
}