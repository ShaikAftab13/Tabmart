import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Database Connection Error:", error.message);
        process.exit(1);
    }
};

export default connectDB;