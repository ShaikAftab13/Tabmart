import { CheckIcon, TruckIcon } from "lucide-react";

export default function CheckoutReview({
    address,
    items,
    handlePlaceOrder,
    loading,
    total,
}) {
    return (
        <div className="bg-white rounded-2xl border border-app-border shadow-sm p-6 animate-fade-in">

            <h2 className="text-lg font-semibold text-app-green mb-5 flex items-center gap-2">
                <CheckIcon className="size-5" />
                Review Your Order
            </h2>

            {/* Delivery Info */}
            <div className="mb-6 p-4 bg-app-cream border border-app-border rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                    <TruckIcon className="size-4 text-app-green" />
                    <span className="text-sm font-semibold text-app-green">
                        Delivery Address
                    </span>
                </div>

                <p className="font-medium text-app-green">
                    {address.label}
                </p>

                <p className="text-sm text-app-text-light mt-1">
                    {address.address}
                </p>

                <p className="text-sm text-app-text-light">
                    {address.city}, {address.state} {address.zip}
                </p>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-6">
                {items.map((item) => (
                    <div
                        key={item.product._id}
                        className="flex items-center gap-3 p-3 rounded-xl border border-app-border hover:bg-app-cream/50 transition-colors"
                    >
                        <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="size-14 rounded-lg object-cover border border-app-border"
                        />

                        <div className="flex-1">
                            <p className="text-sm font-semibold text-app-green">
                                {item.product.name}
                            </p>

                            <p className="text-xs text-app-text-light mt-1">
                                Qty: {item.quantity}
                            </p>
                        </div>

                        <span className="text-sm font-bold text-app-green">
                            ₹{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-5 py-3 border-t border-app-border">
                <span className="font-semibold text-app-green">
                    Total
                </span>

                <span className="text-lg font-bold text-app-green">
                    ₹{total.toFixed(2)}
                </span>
            </div>

            <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-app-green to-app-forest text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] disabled:opacity-60"
            >
                {loading
                    ? "Placing Order..."
                    : `Place Order — ₹${total.toFixed(2)}`}
            </button>
        </div>
    );
}