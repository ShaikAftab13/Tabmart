import Product from '../models/productModel.js';

// GET /api/products/flash-deals
export const getFlashDeals = async (req, res) => {
    const products = await Product.find({ stock: { $gt: 0 } }).sort({ originalPrice: -1 });

    const productsWithDiscount = products.map(product => {
        const discount = product.originalPrice && product.price ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
        return { ...product.toObject(), discount };
    })

    return res.json({ products: productsWithDiscount.slice(0, 8) });
}

// GET /api/products

export const getProducts = async (req, res) => {
    const { category, search, minPrice, maxPrice, sort } = req.query;

    const filter = {};

    if (category && category !== "all") filter.category = category;
    if (search) filter.name = { $regex: search, $options: 'i' };
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) {
        filter.price.$gte = Number(minPrice)
    }
    if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
    }

    let sortOption = {};

    if (sort === 'price-low') {
        sortOption = { price: 1 };
    } else if (sort === 'price-high') {
        sortOption = { price: 1 };
    } else {
        sortOption = { createdAt: -1 };
    }

    const products = await Product.find(filter).sort(sortOption);

    const productsWithDiscount = products.map(product => {
        const discount = product.originalPrice && product.price ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
        return { ...product.toObject(), discount };
    })

    res.json({ products: productsWithDiscount });
}

// GET /api/products/:id

export const getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    const discount = product.originalPrice && product.price ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    res.json({ product: { ...product, discount } });
};

// POST /api/products
export const createProduct = async (req, res) => {
    const product = await Product.create(req.body);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(201).json({ message: "Product Created Successfully", product });
}

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product Updated Successfully", product });
}

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
}