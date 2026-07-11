import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext";
import { MapPinIcon, CheckIcon, CreditCardIcon, ArrowLeftIcon, ChevronRightIcon } from "lucide-react";
import CheckoutAddress from "../components/Checkout/CheckoutAddress";
import CheckoutPayment from "../components/Checkout/CheckoutPayment";
import CheckoutReview from "../components/Checkout/CheckoutReview";
import api from "../config/api";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";


function CheckOut() {

    const navigate = useNavigate();
    const { items, cartTotal, clearCart } = useContext(CartContext);

    const { user } = useContext(AuthContext);

    const [step, setStep] = useState("address");
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState({
        _id: "",
        label: "Home",
        address: "",
        city: "",
        state: "",
        zip: "",
        isDefault: false,
        lat: 0,
        lng: 0
    });

    const [paymentMethod, setPaymentMethod] = useState('card');

    const deliveryFee = cartTotal > 99 ? 0 : 30;
    const tax = cartTotal * 0.08;
    const total = cartTotal + deliveryFee + tax;

    const steps = [
        { key: "address", label: "Address", icon: <MapPinIcon /> },
        { key: "payment", label: "Payment", icon: <CreditCardIcon /> },
        { key: "review", label: "Review", icon: <CheckIcon /> },
    ]

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const orderData = {
                items: items.map((item) => ({
                    product: item.product._id,
                    quantity: item.quantity,
                })),
                shippingAddress: address,
                paymentMethod
            }

            const { data } = await api.post("/orders", orderData);

            if (paymentMethod === "card") {

                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID,

                    amount: data.razorpayOrder.amount,

                    currency: data.razorpayOrder.currency,

                    order_id: data.razorpayOrder.id,

                    name: "TabMart",

                    description: "Order Payment",

                    handler: async function (response) {
                        try {

                            await api.post("/orders/verify-payment", {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            });

                            clearCart();
                            toast.success("Payment Successful");
                            navigate(`/orders/${data.order._id}`);
                        } catch (err) {
                            toast.error(err.response?.data?.message || "Payment verification failed");
                        }
                    },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
                return;

            } else {

                clearCart();

                toast.success("Order placed successfully");

                navigate(`/orders/${data.order._id}`);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err?.message);
        } finally {
            setLoading(false);
            window.scrollTo({ top: 0, behavior: "auto" });
        }
    }

    useEffect(() => {
        if (user?.addresses?.length) {
            const defaultAddr = user.addresses.find(a => a.isDefault) || user.addresses[0];
            setAddress({
                _id: defaultAddr?._id,
                label: defaultAddr?.label,
                address: defaultAddr?.address,
                city: defaultAddr?.city,
                state: defaultAddr?.state,
                zip: defaultAddr?.zip,
                isDefault: defaultAddr?.isDefault,
                lat: defaultAddr?.lat,
                lng: defaultAddr?.lng,
            })
        }
    }, [])

    if (items.length === 0)
        return (
            <div className="min-h-screen bg-gradient-to-br from-app-cream via-white to-app-leaf/10 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-app-border p-10 text-center">

                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-app-green/10">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-app-green"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1 5h12m-9 0a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2"
                            />
                        </svg>
                    </div>

                    <h2 className="mt-6 text-3xl font-bold text-app-forest">
                        Your Cart is Empty
                    </h2>

                    <p className="mt-3 text-gray-600">
                        Looks like you haven't added any fresh groceries yet.
                        Browse our products and fill your cart.
                    </p>

                    <button
                        onClick={() => navigate("/products")}
                        className="mt-8 w-full rounded-xl bg-app-green px-6 py-3 font-semibold text-white shadow-lg shadow-app-green/25 transition-all duration-300 hover:bg-app-forest hover:-translate-y-0.5"
                    >
                        Browse Products
                    </button>
                </div>
            </div>
        );
    return (
        <div className="min-h-screen bg-app-cream py-6 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-app-green hover:text-app-forest font-medium text-sm mb-5 transition-colors"
                >
                    <ArrowLeftIcon className="size-4" />
                    Back
                </button>

                {/* Heading */}
                <h1 className="text-2xl font-bold text-app-green mb-6">
                    Checkout
                </h1>

                {/* Steps */}
                <div className="flex items-center justify-between bg-white border border-app-border rounded-xl p-3 shadow-sm mb-6 overflow-x-auto">

                    {steps.map((item, idx) => (
                        <div
                            key={item.key}
                            className="flex items-center flex-1"
                        >
                            <button
                                className={`flex items-center gap-2 text-sm font-medium transition-colors ${step === item.key
                                    ? "text-app-green"
                                    : "text-app-text-light"
                                    }`}
                            >
                                <span
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${step === item.key
                                        ? "bg-app-green text-white"
                                        : "bg-app-cream text-app-green border border-app-border"
                                        }`}
                                >
                                    {item.icon}
                                </span>

                                <span className="hidden sm:block">
                                    {item.label}
                                </span>
                            </button>

                            {idx < steps.length - 1 && (
                                <ChevronRightIcon className="mx-auto size-4 text-app-border" />
                            )}
                        </div>
                    ))}

                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5">

                    {/* Left */}
                    <div>

                        {step === "address" && (
                            <CheckoutAddress
                                user={user}
                                address={address}
                                setAddress={setAddress}
                                setStep={setStep}
                            />
                        )}

                        {step === "payment" && (
                            <CheckoutPayment
                                setStep={setStep}
                                paymentMethod={paymentMethod}
                                setPaymentMethod={setPaymentMethod}
                            />
                        )}

                        {step === "review" && (
                            <CheckoutReview
                                address={address}
                                items={items}
                                handlePlaceOrder={handlePlaceOrder}
                                loading={loading}
                                total={total}
                            />
                        )}

                    </div>

                    {/* Order Summary */}
                    <div className="bg-white border border-app-border rounded-xl shadow-sm p-4 h-fit sticky top-20">

                        <h2 className="text-lg font-semibold text-app-green mb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-3">

                            <div className="flex justify-between text-sm">
                                <span className="text-app-text-light">
                                    Subtotal
                                </span>

                                <span className="font-medium">
                                    ₹{cartTotal.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-app-text-light">
                                    Delivery
                                </span>

                                {deliveryFee === 0 ? (
                                    <span className="font-medium text-app-green">
                                        FREE
                                    </span>
                                ) : (
                                    <span>
                                        ₹{deliveryFee.toFixed(2)}
                                    </span>
                                )}
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-app-text-light">
                                    Tax
                                </span>

                                <span>
                                    ₹{tax.toFixed(2)}
                                </span>
                            </div>

                            <div className="border-t border-app-border pt-3 flex justify-between items-center">

                                <span className="font-semibold text-app-green">
                                    Total
                                </span>

                                <span className="text-xl font-bold text-app-green">
                                    ₹{total.toFixed(2)}
                                </span>

                            </div>

                        </div>

                        <div className="mt-5 bg-app-cream rounded-lg p-3 text-xs text-app-text-light">
                            <p>✔ Secure checkout</p>
                            <p>✔ Fresh products guarantee</p>
                            <p>✔ Fast doorstep delivery</p>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );

}

export default CheckOut