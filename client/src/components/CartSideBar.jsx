import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, MinusIcon, PlusIcon, ShoppingBagIcon, Trash2Icon, XIcon } from "lucide-react";

function CartSideBar() {

    const { items, updateQuantity, removeFromCart, cartTotal, isCartOpen, setIsCartOpen } = useContext(CartContext);
    const navigate = useNavigate();

    if (!isCartOpen) return null;

    const deliveryFee = cartTotal > 99 ? 0 : 30;
    const grandTotal = cartTotal + deliveryFee;

    return (
        <>
            {/* Overlay */}
            <div
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            >
                {/* Sidebar */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-2xl flex flex-col"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <ShoppingBagIcon className="w-6 h-6 text-app-green" />

                            <div>
                                <h2 className="font-serif text-xl text-app-green">
                                    Your Cart
                                </h2>

                                <span className="text-sm text-gray-500">
                                    {items.length} items
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-2 rounded-full hover:bg-gray-100 transition"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Items */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <ShoppingBagIcon className="w-14 h-14 text-gray-300 mb-4" />

                                <h2 className="text-lg font-medium text-gray-700">
                                    Your cart is empty
                                </h2>

                                <p className="text-sm text-gray-500 mt-2">
                                    Add some products to get started.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={item.product._id}
                                        className="flex gap-3 p-3 border border-gray-200 rounded-xl"
                                    >
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-20 h-20 rounded-lg object-cover border"
                                        />

                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-800 line-clamp-2">
                                                {item.product.name}
                                            </h4>

                                            <p className="text-sm text-gray-500 mt-1">
                                                ₹{item.product.price} / {item.product.unit}
                                            </p>

                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.product._id,
                                                                item.quantity - 1
                                                            )
                                                        }
                                                        className="p-1 hover:bg-gray-100 rounded"
                                                    >
                                                        <MinusIcon size={16} />
                                                    </button>

                                                    <span className="w-6 text-center">
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.product._id,
                                                                item.quantity + 1
                                                            )
                                                        }
                                                        className="p-1 hover:bg-gray-100 rounded"
                                                    >
                                                        <PlusIcon size={16} />
                                                    </button>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <span className="font-semibold text-app-green">
                                                        ₹
                                                        {(
                                                            item.product.price *
                                                            item.quantity
                                                        ).toFixed(2)}
                                                    </span>

                                                    <button
                                                        onClick={() =>
                                                            removeFromCart(
                                                                item.product._id
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-600"
                                                    >
                                                        <Trash2Icon size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t border-gray-200 p-4 bg-white space-y-3">
                            <div className="flex justify-between text-sm">
                                <span>Sub Total</span>
                                <span>₹{cartTotal.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span>Delivery</span>
                                <span>
                                    {deliveryFee === 0
                                        ? "Free Delivery"
                                        : `₹${deliveryFee.toFixed(2)}`}
                                </span>
                            </div>

                            {deliveryFee > 0 && (
                                <div className="bg-app-green/10 text-app-green rounded-lg p-3 text-sm">
                                    <p>Free delivery on orders above ₹99</p>
                                    <p>
                                        Add ₹{(99 - cartTotal).toFixed(2)} more
                                        for free delivery.
                                    </p>
                                </div>
                            )}

                            <div className="flex justify-between text-lg font-semibold border-t pt-3">
                                <span>Total</span>
                                <span>₹{grandTotal.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={() => {
                                    setIsCartOpen(false);
                                    navigate("/checkout");
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth"
                                    });
                                }}
                                className="w-full bg-app-green hover:bg-app-green-light text-white py-3 rounded-xl flex items-center justify-center gap-2 transition"
                            >
                                Proceed to Checkout
                                <ArrowRightIcon size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default CartSideBar;