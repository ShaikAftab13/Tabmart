import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { dummyDashboardOrdersData } from "../assets/assets";
import Loading from '../components/Loading';
import { CalendarIcon, ChevronRightIcon, Package2Icon, PackageIcon } from "lucide-react";

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [searchParams, setSearchParams] = useSearchParams();

    const tabs = ["all", "Placed", "Out for delivery", "Delivered"];
    const { clearCart } = useContext(CartContext);

    const fetchOrders = async () => {
        setOrders(dummyDashboardOrdersData);
        setLoading(false);
    }

    useEffect(() => {
        if (searchParams.get("clearCart")) {
            clearCart();
            setSearchParams([]);
        }
        fetchOrders();
    }, [activeTab]);

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'placed':
                return 'bg-blue-50 text-blue-700 border-blue-100 ring-blue-600/10';
            case 'out for delivery':
                return 'bg-amber-50 text-amber-700 border-amber-100 ring-amber-600/10';
            case 'delivered':
                return 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-600/10';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-100 ring-gray-600/10';
        }
    };

    return (
        <div className="min-h-screen bg-[#faf9f6] px-4 sm:px-6 lg:px-8 py-12 selection:bg-app-green/20">
            <div className="max-w-4xl mx-auto">

                {/* Header section */}
                <div className="mb-10 text-center sm:text-left">
                    <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-app-forest">
                        My Orders
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Check the status of your recent orders and manage your purchases.
                    </p>
                </div>

                {/* Tabs navigation */}
                <div className="flex items-center overflow-x-auto no-scrollbar gap-2 pb-3 mb-8 border-b border-gray-200/60">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                            }}
                            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 relative ${activeTab === tab
                                    ? "bg-app-forest text-white shadow-sm shadow-app-forest/10"
                                    : "bg-white/60 text-gray-600 border border-gray-200/80 hover:bg-white hover:text-app-forest hover:border-gray-300"
                                }`}
                        >
                            {tab === "all" ? "All Orders" : tab}
                        </button>
                    ))}
                </div>

                {/* Orders container */}
                {loading ? <Loading /> : (
                    orders.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm px-4">
                            <div className="flex justify-center mb-5">
                                <div className="p-4 bg-app-green/5 rounded-full border border-app-green/10 animate-pulse">
                                    <PackageIcon size={40} className="text-app-green" />
                                </div>
                            </div>

                            <h3 className="font-serif text-2xl text-app-forest mb-2">
                                No Orders Yet
                            </h3>

                            <p className="text-gray-500 max-w-sm mx-auto text-sm leading-relaxed">
                                You haven't placed any orders yet. Start exploring our boutique products and place your first order today.
                            </p>

                            <Link
                                to="/products"
                                className="inline-flex items-center mt-8 px-6 py-3 bg-app-green text-white text-sm rounded-xl font-medium hover:bg-app-forest transition-all duration-300 shadow-md shadow-app-green/10 hover:shadow-lg hover:-translate-y-0.5"
                            >
                                Explore Products
                            </Link>
                        </div>
                    ) : (
                        <div onClick={() => window.scrollTo({top: 0,behavior: "smooth"})} className="space-y-5">
                            {orders.map(order => (
                                <Link
                                    key={order._id}
                                    to={`/orders/${order._id}`}
                                    className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-app-green/20 hover:-translate-y-0.5 transition-all duration-300 p-5 sm:p-6"
                                >
                                    {/* Order Meta Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-50/80">
                                        <div>
                                            <p className="text-base font-semibold tracking-wide text-app-forest group-hover:text-app-green transition-colors duration-200">
                                                Order #{order._id.slice(-6).toUpperCase()}
                                            </p>

                                            <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                                                <CalendarIcon size={14} className="text-gray-400" />
                                                <span>
                                                    {new Date(order.createdAt).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ring-1 ring-inset transition-colors duration-200 ${getStatusStyles(order.status)}`}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                                {order.status}
                                                <ChevronRightIcon size={12} className="opacity-70 group-hover:translate-x-0.5 transition-transform duration-200" />
                                            </span>
                                        </div>
                                    </div>

                                    {/* Items Visual Thumbnails */}
                                    <div className="flex flex-wrap gap-2 mt-5">
                                        {order.items.slice(0, 4).map((item, idx) => (
                                            <img
                                                src={item.image}
                                                key={idx}
                                                alt={item.name}
                                                className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl border border-app-green/10 shadow-sm"
                                            />
                                        ))}

                                        {order.items.length > 4 && (
                                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl text-app-green-light font-semibold flex items-center justify-center shadow-sm">
                                                +{order.items.length - 4} more
                                            </div>
                                        )}
                                    </div>

                                    {/* Card Footer Info */}
                                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                            <Package2Icon size={14} className="text-app-green" />
                                            <span>
                                                {order.items.length} Item
                                                {order.items.length > 1 ? "s" : ""}
                                            </span>
                                        </div>

                                        <div className="text-right">
                                            <span className="text-xs text-gray-400 block font-medium">Total Amount</span>
                                            <p className="text-xl font-bold tracking-tight text-app-forest mt-0.5">
                                                ₹{order.total.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default MyOrders;