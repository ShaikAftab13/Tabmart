import { createContext, useContext, useEffect, useState } from "react";
import api from "../config/api";
import { AuthContext } from "./AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
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
            if (!user) {
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? "animate-enter" : "animate-leave"
                            } w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden`}
                    >
                        <div className="h-1 bg-app-green"></div>

                        <div className="p-5">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-app-green/10 flex items-center justify-center text-2xl">
                                    🔒
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-app-green">
                                        Login Required
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Sign in to add products to your cart and continue to checkout.
                                    </p>

                                    <div className="flex justify-end gap-3 mt-5">
                                        <button
                                            onClick={() => toast.dismiss(t.id)}
                                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            onClick={() => {
                                                toast.dismiss(t.id);
                                                navigate("/login");
                                            }}
                                            className="px-5 py-2 rounded-lg bg-app-green text-white hover:bg-app-green-light transition"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ), {
                    duration: 5000,
                });
                return;
            }
            const { data } = await api.post("/cart/add", {
                productId: product._id,
                quantity,
            });

            setItems(data);
            setIsCartOpen(true);
        } catch (err) {
            console.error("Failed to add item:", err);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            if (!user) {
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? "animate-enter" : "animate-leave"
                            } w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden`}
                    >
                        {/* Top Green Bar */}
                        <div className="h-1 bg-app-green"></div>

                        <div className="p-5">
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className="w-12 h-12 rounded-full bg-app-green/10 flex items-center justify-center text-2xl">
                                    🔒
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-app-green">
                                        Login Required
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Sign in to manage your cart continue to checkout.
                                    </p>

                                    <div className="flex justify-end gap-3 mt-5">
                                        <button
                                            onClick={() => toast.dismiss(t.id)}
                                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            onClick={() => {
                                                toast.dismiss(t.id);
                                                navigate("/login");
                                            }}
                                            className="px-5 py-2 rounded-lg bg-app-green text-white hover:bg-app-green-light transition"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ), {
                    duration: 5000,
                });
                return;
            }

            const { data } = await api.delete("/cart/remove", {
                data: { productId },
            });

            setItems(data);
        } catch (err) {
            console.error("Failed to remove item:", err);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            if (!user) {
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? "animate-enter" : "animate-leave"
                            } w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden`}
                    >
                        {/* Top Green Bar */}
                        <div className="h-1 bg-app-green"></div>

                        <div className="p-5">
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className="w-12 h-12 rounded-full bg-app-green/10 flex items-center justify-center text-2xl">
                                    🔒
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-app-green">
                                        Login Required
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Sign in to manage your cart and continue to checkout.
                                    </p>

                                    <div className="flex justify-end gap-3 mt-5">
                                        <button
                                            onClick={() => toast.dismiss(t.id)}
                                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            onClick={() => {
                                                toast.dismiss(t.id);
                                                navigate("/login");
                                            }}
                                            className="px-5 py-2 rounded-lg bg-app-green text-white hover:bg-app-green-light transition"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ), {
                    duration: 5000,
                });
                return;
            }

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
            console.error("Failed to update quantity:", err);
        }
    };

    const clearCart = async () => {
        try {
            if (!user) {
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? "animate-enter" : "animate-leave"
                            } w-[360px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden`}
                    >
                        {/* Top Green Bar */}
                        <div className="h-1 bg-app-green"></div>

                        <div className="p-5">
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className="w-12 h-12 rounded-full bg-app-green/10 flex items-center justify-center text-2xl">
                                    🔒
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-app-green">
                                        Login Required
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Sign in to manage your cart and continue to checkout.
                                    </p>

                                    <div className="flex justify-end gap-3 mt-5">
                                        <button
                                            onClick={() => toast.dismiss(t.id)}
                                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            onClick={() => {
                                                toast.dismiss(t.id);
                                                navigate("/login");
                                            }}
                                            className="px-5 py-2 rounded-lg bg-app-green text-white hover:bg-app-green-light transition"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ), {
                    duration: 5000,
                });
                return;
            }

            await api.delete("/cart/clear");
            setItems([]);
            setIsCartOpen(false);
        } catch (err) {
            console.error("Failed to clear cart:", err);
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