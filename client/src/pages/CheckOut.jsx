import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext";
import { dummyAddressData } from "../assets/assets";
import { MapPinIcon, CheckIcon, CreditCardIcon, ArrowLeftIcon, ChevronRightIcon } from "lucide-react";
import CheckoutAddress from "../components/Checkout/CheckoutAddress";
import CheckoutPayment from "../components/Checkout/CheckoutPayment";
import CheckoutReview from "../components/Checkout/CheckoutReview";


function CheckOut() {

    const navigate = useNavigate();
    const { items, cartTotal } = useContext(CartContext);

    const { user } = { user: { addresses: dummyAddressData } };

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
        navigate('/orders');
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

    if (items.length == 0)
        return (
            <div>
                <div>
                    <h2>Your cart is empty</h2>
                    <p>Add some products to checkout</p>
                    <button onClick={() => navigate('/products')}>Browse Products</button>
                </div>
            </div>
        )

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