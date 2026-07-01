import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        label: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },

        city: {
            type: String,
            required: true,
        },

        state: {
            type: String,
            required: true,
        },

        zip: {
            type: String,
            required: true,
        },

        isDefault: {
            type: Boolean,
            default: false,
        },

        lat: {
            type: Number,
            required: true,
        },

        lng: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const addressModel = mongoose.model("Address", addressSchema);
export default addressModel