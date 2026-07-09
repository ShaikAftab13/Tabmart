import Cart from "../models/cartModel.js";

// GET /api/cart
export const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

        if (!cart) {
            cart = await Cart.create({ user: req.user.id, items: [] });
        }

        res.json(cart.items);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// POST /api/cart/add
export const addCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = await Cart.create({ user: req.user.id, items: [] });
        }

        const existing = cart.items.find(item => item.product.toString() === productId);

        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity
            })
        }

        await cart.save();
        await cart.populate("items.product");
        res.json(cart.items);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// PUT /api/cart/update
export const updateQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(item => item.product.toString() === productId);

        if (!item) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        if (quantity <= 0) {
            cart.items = cart.items.filter(item => item.product.toString() !== productId);
        } else {
            item.quantity = quantity;
        }

        await cart.save();

        await cart.populate("items.product");

        res.json(cart.items);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// DELETE /api/cart/remove
export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        await cart.save();

        await cart.populate("items.product");

        res.json(cart.items)
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// DELETE /api/cart/clear
export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.json([]);
        }

        cart.items = [];

        await cart.save();

        res.json(cart.items);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};