import jwt from "jsonwebtoken";

const deliveryAuth = (req, res, next) => {
    try {
        const token = req.cookies.deliveryToken;

        if (!token) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "Delivery") {
            return res.status(403).json({ message: "Access denied.Delivery Partner only" });
        }

        const partner = await DeliveryPartner.findById(decoded.id);

        if (!partner || !partner.isActive) {
            return res.status(403).json({message: "Account is deactivated"});
        }

        req.partner = partner;

        next();
    } catch (err) {
        return res.status(401).json({ message: "Token not verified" });
    }
};

export default deliveryAuth;