import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },

        shippingAddress: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },

        paymentMethod: {
            type: String,
            default: "card",
        },

        subtotal: {
            type: Number,
            required: true,
        },

        deliveryFee: {
            type: Number,
            default: 0,
        },

        tax: {
            type: Number,
            default: 0,
        },

        total: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            default: "Placed",
        },

        statusHistory: {
            type: mongoose.Schema.Types.Mixed,
            default: [],
        },

        deliveryPartnerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DeliveryPartner",
            default: null,
        },

        deliveryOtp: {
            type: String,
            default: "",
        },

        liveLocation: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
        },

        isPaid: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;