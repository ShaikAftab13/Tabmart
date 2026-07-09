import { useEffect, useRef, useState } from "react";
import { PackageIcon, NavigationIcon } from "lucide-react";
import OtpModal from "../../components/Delivery/OtpModal";
import CancelModal from "../../components/Delivery/CancelModal";
import DeliveryOrderCard from "../../components/Delivery/DeliveryOrderCard";
import Loading from "../../components/Loading";
import { dummyDashboardOrdersData } from "../../assets/assets";
import toast from "react-hot-toast";
import api from "../../config/api";

export default function DeliveryDashboard() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState("active");
    const [tracking, setTracking] = useState(false);

    // OTP modal
    const [otpModal, setOtpModal] = useState(null);
    const [otp, setOtp] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Cancel modal
    const [cancelModal, setCancelModal] = useState(null);
    const [cancelReason, setCancelReason] = useState("");

    const watchIdRef = useRef(null);
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(
                `/delivery/my-deliveries?status=${tab}`
            );

            setOrders(data.orders);
        } catch (err) {
            toast.error(err.response?.data?.message || err?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [tab]);

    useEffect(() => {
        const activeOrders = orders.filter(o =>
            ["Assigned", "Packed", "Out for Delivery"].includes(o.status)
        );
        if (activeOrders.length == 0 || !tracking) {
            if (watchIdRef.current != null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
                watchIdRef.current = null;
            }
            return;
        }

        const sendLocation = (pos) => {
            const { latitude: lat, longitude: lng } = pos.coords;
            activeOrders.forEach(o => {
                api.put(`delivery/my-deliveries/${o._id}/location`, { lat, lng }).catch(() => { })
            })
        }

        watchIdRef.current = navigator.geolocation.watchPosition(
            sendLocation, () => { }, {
            enableHighAccuracy: true,
            maximumAge: 10000
        }
        )

        const interval = setInterval(() => {
            navigator.geolocation.getCurrentPosition(sendLocation, () => { }, { enableHighAccuracy: true })
        }, 10000);

        return () => {
            if (watchIdRef.current != null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
                watchIdRef.current = null;
            }
        }
    }, [orders, tracking]);

    const handleUpdateStatus = async (orderId, status) => {
        try {
            await api.put(`/delivery/my-deliveries/${orderId}/status`, { status });
            toast.success(`Status updated to ${status}`);
            fetchOrders();
        } catch (err) {
            toast.error(err.response?.data?.message || err?.message);
        }
    };

    const handleComplete = async () => {
        if (!otpModal || !otp) return;
        setSubmitting(true);
        try {
            await api.put(`/delivery/my-deliveries/${otpModal}/complete`, { otp });
            toast.success(`Delivery Completed`);
            setOtpModal(null);
            setOtp("");
            fetchOrders();
        } catch (err) {
            toast.error(err.response?.data?.message || err?.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = async () => {
        if (!cancelModal) return;
        setSubmitting(true);
        try {
            await api.put(`/delivery/my-deliveries/${cancelModal}/cancel`, { reason: cancelReason});
            toast.success(`Delivery Cancelled`);
            setCancelModal(null);
            setCancelReason("");
            fetchOrders();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="space-y-6">
            {/* Tabs + Tracking toggle */}
            <div className="flex items-center gap-2 flex-wrap">
                {(["active", "completed"]).map((t) => (
                    <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${tab === t ? "bg-app-green text-white" : "bg-white text-zinc-600 hover:bg-app-cream border border-app-border"}`}>
                        {t === "active" ? "Active" : "Completed"}
                    </button>
                ))}
                <div className="ml-auto">
                    <button onClick={() => setTracking((prev) => !prev)} className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors flex items-center gap-1.5 ${tracking ? "bg-green-600 text-white" : "bg-white text-zinc-600 border border-app-border hover:bg-app-cream"}`}>
                        <NavigationIcon className={`w-3.5 h-3.5 ${tracking ? "animate-pulse" : ""}`} />
                        {tracking ? "Sharing Location" : "Share Location"}
                    </button>
                </div>
            </div>

            {/* Orders */}
            {loading ? (
                <Loading />
            ) : orders.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-app-border">
                    <PackageIcon className="size-12 text-app-border mx-auto mb-3" />
                    <p className="text-lg font-semibold text-zinc-900 mb-1">No {tab} deliveries</p>
                    <p className="text-sm text-zinc-500">{tab === "active" ? "You'll see new assignments here" : "Completed deliveries will appear here"}</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => <DeliveryOrderCard key={order._id} order={order} tab={tab} handleUpdateStatus={handleUpdateStatus} setOtpModal={setOtpModal} setCancelModal={setCancelModal} />)}
                </div>
            )}

            {/* OTP Modal */}
            {otpModal && <OtpModal setOtpModal={setOtpModal} otp={otp} setOtp={setOtp} handleComplete={handleComplete} submitting={submitting} />}
            {/* Cancel Modal */}
            {cancelModal && <CancelModal setCancelModal={setCancelModal} cancelReason={cancelReason} setCancelReason={setCancelReason} handleCancel={handleCancel} submitting={submitting} />}
        </div>
    );
}
