import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            default: "",
        },

        price: {
            type: Number,
            required: true,
        },

        originalPrice: {
            type: Number,
            default: 0,
        },

        image: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        unit: {
            type: String,
            default: "piece",
        },

        stock: {
            type: Number,
            default: 0,
        },

        isOrganic: {
            type: Boolean,
            default: false,
        },

        rating: {
            type: Number,
            default: 0,
        },

        reviewCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const productModel =  mongoose.model("Product", productSchema);
export default productModel;