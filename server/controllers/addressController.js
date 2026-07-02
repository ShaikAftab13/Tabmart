import Address from "../models/addressModel.js";

// GET /api/addresses  Get user addresses
export const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({ userId: req.user.id }).sort({ createdAt: 1 });
        res.json({ addresses });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/addresses Add address
export const addAddress = async (req, res) => {
    try {
        const { label, address, city, state, zip, isDefault, lat, lng } = req.body;

        if (lat == null || lng == null) {
            return res.status(400).json({ message: "Location coordinates are required. Please allow location access." });
        }

        const currentAddresses = await Address.find({ userId: req.user.id });

        let makeDefault = isDefault;

        if (currentAddresses.length === 0) {
            makeDefault = true;
        }

        if (makeDefault) {
            await Address.updateMany({ userId: req.user.id }, { $set: { isDefault: false } });
        }

        await Address.create({
            userId: req.user.id,
            label,
            address,
            city,
            state,
            zip,
            isDefault: makeDefault,
            lat: Number(lat),
            lng: Number(lng)
        });

        const addresses = await Address.find({ userId: req.user.id }).sort({ createdAt: 1 });
        res.status(201).json({ addresses })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT /api/addresses/:id  update address
export const updateAddress = async (req, res) => {
    try {
        const { label, address, city, state, zip, isDefault, lat, lng } = req.body;

        if (lat == null || lng == null) {
            return res.status(400).json({ message: "Location coordinates are required. Please allow location access." });
        }

        if (isDefault) {
            await Address.updateMany({ userId: req.user.id }, { $set: { isDefault: false } });
        }

        const data = {};

        if (label) data.label = label;
        if (address) data.address = address;
        if (city) data.city = city;
        if (state) data.state = state;
        if (zip) data.zip = zip;
        if (isDefault !== undefined) data.isDefault = isDefault;
        if (lat != null) data.lat = Number(lat);
        if (lng != null) data.lng = Number(lng);

        const updatedAddress = await Address.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            data,
            { new: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({ message: "Address not found" });
        }

        res.json({ updatedAddress });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// DELETE /api/addresses/:id delete address
export const deleteAddress = async (req, res) => {
    try {
        await Address.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

        const addresses = await Address.find({userId: req.user.id}).sort({ createdAt: 1 });

        res.json({ addresses });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};