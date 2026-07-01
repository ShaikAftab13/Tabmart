import User from "../models/userModel.js";

const admin = async (req, res, next) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',').map(e => e.trim().toLowerCase()) : [];
        if (adminEmails.includes(user.email.toLowerCase())) {
            if (req.user) req.user.isAdmin = true;
            next();
        } else {
            return res.status(403).json("Admin access require");
        }

    } catch (err) {
        return res.status(500).json({ message: 'Admin verification failed', error: err.message });
    }
}

export default admin;