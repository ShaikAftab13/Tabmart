import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            default: "",
        },

        avatar: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;