import { XIcon } from "lucide-react";
import React from "react";

function AddressFrom({
    resetForm,
    handleSubmit,
    form,
    setForm,
    editingId,
}) {
    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />

            {/* Modal */}
            <div
                onClick={resetForm}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
                <form
                    onClick={(e) => e.stopPropagation()}
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                        <h2 className="text-xl font-semibold text-app-forest">
                            {editingId ? "Edit Address" : "Add New Address"}
                        </h2>

                        <button
                            type="button"
                            onClick={resetForm}
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4 p-5">

                        {/* Label */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                Label
                            </label>

                            <input
                                type="text"
                                placeholder="Home, Office..."
                                value={form.label}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        label: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-app-green"
                                required
                            />
                        </div>

                        {/* Street Address */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                Street Address
                            </label>

                            <input
                                type="text"
                                placeholder="Street Address"
                                value={form.address}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        address: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-app-green"
                                required
                            />
                        </div>

                        {/* City & State */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    City
                                </label>

                                <input
                                    type="text"
                                    value={form.city}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            city: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-app-green"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    State
                                </label>

                                <input
                                    type="text"
                                    value={form.state}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            state: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-app-green"
                                    required
                                />
                            </div>

                        </div>

                        {/* ZIP & Default */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    ZIP Code
                                </label>

                                <input
                                    type="text"
                                    value={form.zip}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            zip: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-app-green"
                                    required
                                />
                            </div>

                            <label className="flex items-center gap-3 pb-2 cursor-pointer">

                                <input
                                    type="checkbox"
                                    checked={form.isDefault}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            isDefault: e.target.checked,
                                        })
                                    }
                                    className="h-4 w-4 accent-app-green"
                                />

                                <span className="text-sm text-gray-700">
                                    Set as Default
                                </span>

                            </label>

                        </div>

                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 border-t border-gray-100 px-5 py-4">

                        <button
                            type="button"
                            onClick={resetForm}
                            className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-app-green px-5 py-2 text-sm font-medium text-white transition hover:bg-app-forest"
                        >
                            {editingId ? "Update" : "Add Address"}
                        </button>

                    </div>
                </form>
            </div>
        </>
    );
}

export default AddressFrom;