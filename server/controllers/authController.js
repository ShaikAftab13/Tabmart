import User from '../models/userModel.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { registerEmail } from '../services/emailService.js';
import Address from "../models/addressModel.js";
import { inngest } from '../inngest/index.js';

// generate token
const generateToken = (id) => {
    return jwt.sign(
        {
            id
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

// Checking whether user is admin or not
const getAdminStatus = (email) => {
    if (!email) return false;

    const adminEmails = process.env.ADMIN_EMAILS
        ? process.env.ADMIN_EMAILS.split(',').map(e => e.trim().toLowerCase())
        : [];

    return adminEmails.includes(email.toLowerCase());
};


export const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user.id)
        .select("-password");

    const addresses = await Address.find({
        userId: req.user.id
    });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const adminEmails = process.env.ADMIN_EMAILS
        ? process.env.ADMIN_EMAILS.split(",").map(e => e.trim().toLowerCase())
        : [];

    const isAdmin = adminEmails.includes(user.email.toLowerCase());

    res.json({
        user: { ...user.toObject(), addresses, isAdmin }
    });
};

// Register - POST /api/auth/register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Required details are missing. Please provide all fields"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword
        });

        const token = generateToken(user._id);

        res.cookie("token", token, cookieOptions);

        const userData = user.toObject();
        delete userData.password;
        userData.isAdmin = getAdminStatus(userData.email);

        await inngest.send({
            name: "user/registered",
            data: {
                userId: user._id.toString()
            }
        })

        return res.status(201).json({
            message: "User registered successfully",
            user: userData
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// Login - POST /api/auth/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail
        })

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user._id);

        res.cookie("token", token, cookieOptions);

        const userData = user.toObject();
        delete userData.password;
        userData.isAdmin = getAdminStatus(userData.email);

        return res.status(200).json({
            message: "Login successful",
            user: userData
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            partitioned: true
        })

        return res.status(200).json({ message: "Logged Out" });
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}