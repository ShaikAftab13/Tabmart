import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { ArrowLeftIcon, Dot, MapPinIcon, PhoneIcon } from "lucide-react";
import OrderOTP from "../components/OrderTracking/OrderOTP";
import LiveMap from "../components/OrderTracking/LiveMap";
import OrderTimeLine from "../components/OrderTracking/OrderTimeLine";
import api from "../config/api"

function OrderTracking() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liveLocation, setLiveLocation] = useState(null);

    useEffect(() => {
        const fetchOrderTracking = async () => {
            try {
                const { data } = await api.get(`/orders/${id}`);
                setOrder(data.order);
            } catch (err) {
                navigate("/orders");
            } finally {
                setLoading(false);
            }
        }
        fetchOrderTracking();
    }, [id])

    //live location every 10sec
    useEffect(() => {
        if (!order || ["Delivered", "Cancelled", "Placed"].includes(order.status)) return;

        const fetchLocation = async () => {
            try {
                const { data } = await api.get(`/orders/${id}/location`);
                if (data.liveLocation?.lat && data.liveLocation?.lng && data.liveLocation.updatedAt) {
                    setLiveLocation({
                        lat: data.liveLocation.lat,
                        lng: data.liveLocation.lng
                    })
                }
                if (data.status && data.status != order.status) {
                    setOrder(prev => prev ? {...prev, status: data.status} : prev)
                }
            } catch {

            }
        }
        fetchLocation();
        const interval = setInterval(fetchLocation, 10000);
        return () => clearInterval(interval);
    }, [id, order?.status]);

    if (loading) return <Loading />;
    if (!order) return null;

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'placed':
                return 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-600/10';
            case 'out for delivery':
                return 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-600/10';
            case 'delivered':
                return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/10';
            case 'cancelled':
                return 'bg-red-50 text-red-700 border border-red-200 ring-1 ring-red-600/10';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200 ring-gray-600/10';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 text-gray-800 antialiased">
            <div className="space-y-6">
                <button
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    onClick={() => navigate('/orders')}
                >
                    <ArrowLeftIcon className="w-4 h-4" /> Back to Orders
                </button>

                {/* order id, date, status */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-100">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                month: "long",
                                year: "numeric",
                                day: "numeric"
                            })}
                        </p>
                    </div>
                    <div>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border uppercase tracking-wider ${getStatusStyles(order.status)}`}>
                            {order.status}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* left - Map Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* OTP card */}
                        <OrderOTP order={order} />

                        {/* Live map tracking */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <LiveMap order={order} liveLocation={liveLocation} />
                        </div>
                        {/* Progress */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <OrderTimeLine order={order} />
                        </div>

                        {/* Delivery Person */}
                        {order.deliveryPartner && order.status !== "Delivered" && order.status !== "Cancelled" && (
                            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                                        <span>
                                            {order.deliveryPartner?.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{order.deliveryPartner.name}</p>
                                        <p className="text-xs text-gray-500 capitalize">{order.deliveryPartner.vehicleType}  Delivery Partner</p>
                                    </div>
                                </div>
                                <a
                                    href={`tel:${order.deliveryPartner.phone}`}
                                    className="p-3 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors shadow-sm"
                                >
                                    <PhoneIcon className="w-5 h-5 fill-current" />
                                </a>
                            </div>
                        )}
                    </div>

                    {/* right - Order details */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
                                <MapPinIcon className="w-5 h-5 text-gray-400" />Delivery Address
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed pl-7">
                                <span className="font-medium text-gray-900 block mb-1">{order.shippingAddress.label}</span>
                                {order.shippingAddress.address}
                                <br />
                                {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.zip}
                            </p>
                        </div>

                        {/* Items */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <h3 className="text-base font-semibold text-gray-900 px-6 py-4 border-b border-gray-100">
                                Items: ({order.items.length})
                            </h3>
                            <div className="divide-y divide-gray-100 px-6 max-h-80 overflow-y-auto">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="py-4 flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg border border-gray-100 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">x {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gray-50 p-6 border-t border-gray-100 space-y-3 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Sub Total:</span>
                                    <span className="font-medium text-gray-900">₹{order.subtotal.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Delivery:</span>
                                    <span className={`font-medium ${order.deliveryFee === 0 ? "text-emerald-600 font-semibold" : "text-gray-900"}`}>
                                        {order.deliveryFee === 0 ? "Free" : `₹${order.deliveryFee.toFixed(2)}`}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Tax:</span>
                                    <span className="font-medium text-gray-900">₹{order.tax.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-200 pt-3 mt-2">
                                    <span>Grand Total:</span>
                                    <span>₹{order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderTracking;