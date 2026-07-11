import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        console.log("Cookies:", req.cookies);

        const token = req.cookies.token;

        if (!token) return res.status(401).json({ message: "No token provided, authorization denied" });

        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { id: tokenDecoded.id };

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token not verified' });
    }
}

export default auth;