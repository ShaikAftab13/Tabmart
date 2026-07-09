import React, { useContext } from "react";
import {
    CheckCircle2,
    Home,
    Building2,
    MapPinned,
    Pencil,
    Trash2,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import api from "../config/api";

function AddressCard({ addr, onEditHandler, setAddresses }) {

    const { updateUser } = useContext(AuthContext);

    const handleDelete = async (id) => {
        try {
            const isConfirmed = window.confirm("Are you sure you want to delete this address?");
            if (!isConfirmed) return;
            const { data } = await api.delete(`/addresses/${id}`);
            setAddresses(data.addresses);
            updateUser({ addresses: data.addresses });
            toast.success("Address removed");
        } catch (err) {
            toast.error(err.response?.data?.message || err?.message);
        }
    };

    const getIcon = () => {
        switch (addr.label?.toLowerCase()) {
            case "home":
                return <Home className="w-5 h-5" />;
            case "office":
            case "work":
                return <Building2 className="w-5 h-5" />;
            default:
                return <MapPinned className="w-5 h-5" />;
        }
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-app-green/40 hover:shadow-md">

            {/* Top */}

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-app-green/10 text-app-green">
                        {getIcon()}
                    </div>

                    <div>

                        <div className="flex items-center gap-2">

                            <h3 className="text-lg font-semibold capitalize text-app-forest">
                                {addr.label}
                            </h3>

                            {addr.isDefault && (
                                <span className="flex items-center gap-1 rounded-full bg-app-green/10 px-2 py-1 text-xs font-medium text-app-green">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Default
                                </span>
                            )}

                        </div>

                        <p className="mt-1 text-sm text-gray-500">
                            Delivery Address
                        </p>

                    </div>

                </div>

            </div>

            {/* Address */}

            <div className="mt-5 border-t border-gray-100 pt-5">

                <p className="text-sm leading-7 text-gray-600">
                    {addr.address}
                    <br />
                    {addr.city}, {addr.state}
                    <br />
                    {addr.zip}
                </p>

            </div>

            {/* Buttons */}

            <div className="mt-5 flex gap-3">

                <button
                    onClick={() => onEditHandler(addr)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-app-green text-app-green py-2.5 font-medium transition hover:bg-app-green hover:text-white"
                >
                    <Pencil className="w-4 h-4" />
                    Edit
                </button>

                <button
                    onClick={() => handleDelete(addr._id)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-red-200 text-red-500 py-2.5 font-medium transition hover:bg-red-500 hover:text-white"
                >
                    <Trash2 className="w-4 h-4" />
                    Delete
                </button>

            </div>

        </div>
    );
}

export default AddressCard;