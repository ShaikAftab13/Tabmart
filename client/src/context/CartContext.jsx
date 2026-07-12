import { createContext, useContext, useEffect, useState } from "react";
import api from "../config/api";
import { AuthContext } from "./AuthContext";
import { toast } from "react-hot-toast";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

    const { user } = useContext(AuthContext);

    const [items, setItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const fetchCart = async () => {
        try {
            const { data } = await api.get("/cart");
            setItems(data);
        } catch (err) {
            console.error("Failed to fetch cart:", err);
            setItems([]);
        }
    };

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setItems([]);
        }
    }, [user]);

    const addToCart = async (product, quantity = 1) => {
        try {
            const { data } = await api.post("/cart/add", {
                productId: product._id,
                quantity,
            });

            setItems(data);
            setIsCartOpen(true);
        } catch (err) {
            toast.info("Please log in to add items to your cart.");
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const { data } = await api.delete("/cart/remove", {
                data: { productId },
            });

            setItems(data);
        } catch (err) {
            toast.info("Please log in to manage your cart.");
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            if (quantity <= 0) {
                await removeFromCart(productId);
                return;
            }

            const { data } = await api.put("/cart/update", {
                productId,
                quantity,
            });

            setItems(data);

        } catch (err) {
            toast.info("Please log in to manage your cart.");
        }
    };

    const clearCart = async () => {
        try {
            await api.delete("/cart/clear");
            setItems([]);
            setIsCartOpen(false);
        } catch (err) {
            toast.info("Please log in to manage your cart.");
        }
    };

    const cartCount = items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const cartTotal = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const value = {
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        fetchCart,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;