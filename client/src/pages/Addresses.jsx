import { useEffect, useState } from "react"
import { dummyAddressData } from "../assets/assets";
import { MapPinIcon, PlusIcon } from "lucide-react";
import Loading from "../components/Loading";
import AddressCard from "../components/AddressCard";
import AddressFrom from "../components/AddressFrom";


function Addresses() {

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ label: "", address: "", city: "", state: "", zip: "", isDefault: false });

    const resetForm = () => {
        setForm({ label: "", address: "", city: "", state: "", zip: "", isDefault: false });
        setShowForm(false);
        setEditingId(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // edit
        if (editingId) {
            setAddresses(prev => prev.map(addr => addr._id === editingId ? { ...addr, ...form } : addr));
            setShowForm(false);
        }
        // add
        else {
            setAddresses(prev => [...prev, { _id: Date.now().toString(), ...form }]);
            setShowForm(false)
        }
    }

    const onEditHandler = (address) => {
        setForm({ label: address.label, address: address.address, city: address.city, state: address.state, zip: address.zip, isDefault: address.isDefault });
        setEditingId(address._id);
        setShowForm(true);
    }

    useEffect(() => {
        setAddresses(dummyAddressData);
        setLoading(false);
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-app-cream via-white to-app-leaf/10 py-8 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-app-green/10 px-3 py-1 text-xs font-semibold text-app-green uppercase tracking-wider">
                            <MapPinIcon className="w-3.5 h-3.5" />
                            Delivery
                        </span>

                        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-app-forest">
                            My Addresses
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Manage your saved delivery locations for faster checkout.
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                        }}
                        className="flex items-center justify-center gap-2 rounded-2xl bg-app-green hover:bg-app-forest px-6 py-3 font-medium text-white shadow-lg shadow-app-green/25 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Add Address
                    </button>

                </div>

                {/* Form Modal */}
                {showForm && <AddressFrom resetForm={resetForm} handleSubmit={handleSubmit} form={form} setForm={setForm} editingId={editingId} />}

                {loading ? (
                    <Loading />
                ) : addresses.length === 0 ? (

                    <div className="rounded-3xl border border-app-green/15 bg-white p-14 text-center shadow-sm">

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-app-green/10">

                            <MapPinIcon className="h-10 w-10 text-app-green" />

                        </div>

                        <h2 className="mt-6 text-2xl font-semibold text-app-forest">
                            No Saved Addresses
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-gray-500">
                            Add your home, office or any other delivery location to
                            enjoy a faster checkout experience.
                        </p>

                        <button
                            onClick={() => {
                                resetForm();
                                setShowForm(true);
                            }}
                            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-app-green px-5 py-3 text-white font-medium transition hover:bg-app-forest"
                        >
                            <PlusIcon className="w-5 h-5" />
                            Add First Address
                        </button>

                    </div>

                ) : (

                    <div className="grid gap-6 md:grid-cols-2">

                        {addresses.map((addr) => (

                            <AddressCard
                                key={addr._id}
                                addr={addr}
                                onEditHandler={onEditHandler}
                                setAddresses={setAddresses}
                            />

                        ))}

                    </div>

                )}

            </div>
        </div>
    );
}

export default Addresses