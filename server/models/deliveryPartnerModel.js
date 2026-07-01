import mongoose from "mongoose";

const deliveryPartnerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },

        avatar: {
            type: String,
            default: "",
        },

        vehicleType: {
            type: String,
            default: "bike",
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const deliveryPartnerModel = mongoose.model("DeliveryPartner", deliveryPartnerSchema);
export default deliveryPartnerModel;