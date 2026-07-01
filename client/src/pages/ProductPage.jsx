import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { dummyProducts } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowLeftIcon, HomeIcon, LeafIcon, Star, Trash2Icon, ShoppingCart, ShieldCheck, Truck } from "lucide-react";
import DummyReviewsSection from "../assets/DummyReviewsSection";

function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { items, addToCart, updateQuantity, removeFromCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [relatedProduct, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [localQuantity, setLocalQuantity] = useState(1);

    useEffect(() => {
        setLoading(true);
        setLocalQuantity(1);

        window.scrollTo({ top: 0, behavior: "smooth" });

        const product = dummyProducts.find(prod => prod._id === id);

        setProduct(product);
        if(product) setRelatedProducts(dummyProducts.filter(prod => prod._id !== id && prod.category === product.category));

        setLoading(false);
    }, [id])

    if (loading) return <Loading />;
    if (!product) return null;

    const cartItem = items.find(item => item.product._id === product._id);
    const inCart = !!cartItem;
    const displayQuantity = inCart ? cartItem.quantity : localQuantity;
    const categoryLabel = product.category.replace(/-/g, " ");

    const handleMinus = () => {
        if (inCart) {
            if (cartItem.quantity < product.stock) updateQuantity(product._id, cartItem.quantity - 1);
            else {
                removeFromCart(product._id);
                setLocalQuantity(1);
            }
        } else {
            setLocalQuantity(Math.max(1, localQuantity - 1))
        }
    }

    const handleAdd = () => {
        if (inCart) {
            updateQuantity(product._id, cartItem.quantity + 1);
        } else {
            setLocalQuantity(localQuantity + 1)
        }
    }

    return (
        <div className="min-h-screen bg-app-cream text-app-forest antialiased">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Breadcrumb */}
                <nav className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium text-app-forest/70">
                    <Link
                        to="/"
                        className="flex items-center text-app-forest hover:text-app-green transition-colors"
                    >
                        <HomeIcon size={16} />
                    </Link>

                    <span className="text-app-leaf/40">/</span>

                    <Link
                        to="/products"
                        className="text-app-forest hover:text-app-green transition-colors"
                    >
                        Products
                    </Link>

                    <span className="text-app-leaf/40">/</span>

                    <Link
                        to={`/products?category=${product.category}`}
                        className="capitalize text-app-forest hover:text-app-green transition-colors"
                    >
                        {categoryLabel}
                    </Link>

                    <span className="text-app-leaf/40">/</span>

                    <span className="font-semibold text-app-green capitalize max-w-[180px] sm:max-w-none truncate">
                        {product.name}
                    </span>
                </nav>

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-white border border-app-leaf/20 shadow-sm px-4 py-2 text-sm font-medium text-app-forest transition-all duration-200 hover:bg-white/80"
                >
                    <ArrowLeftIcon
                        size={16}
                        className="transition-transform duration-200 group-hover:-translate-x-1"
                    />
                    Back
                </button>

                {/* Product */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">

                    {/* Image */}
                    <div className="lg:col-span-5 bg-white rounded-3xl border border-app-leaf/20 shadow-sm overflow-hidden lg:sticky lg:top-8">
                        <div className="bg-app-cream/40 aspect-square flex items-center justify-center p-8 sm:p-12">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full max-w-sm h-auto object-contain transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-7 bg-white rounded-3xl border border-app-leaf/20 shadow-sm p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-full">
                        <div>
                            {/* Badges */}
                            <div className="flex flex-wrap gap-2">
                                <span className="rounded-full bg-app-leaf/10 px-3 py-1 text-xs font-semibold tracking-wide uppercase text-app-forest">
                                    {categoryLabel}
                                </span>

                                {product.isOrganic && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-100">
                                        <LeafIcon size={12} className="fill-green-600/10" />
                                        Organic
                                    </span>
                                )}

                                {product.discount > 0 && (
                                    <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 border border-red-100">
                                        {product.discount}% OFF
                                    </span>
                                )}
                            </div>

                            {/* Name */}
                            <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-app-forest">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="mt-4 flex items-center gap-3 border-b border-app-cream pb-5">
                                <div className="flex items-center gap-0.5 text-yellow-500">
                                    {product.rating > 0 &&
                                        [1, 2, 3, 4, 5].map(star => (
                                            <Star
                                                key={star}
                                                size={16}
                                                className={
                                                    star <= Math.round(product.rating)
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-200"
                                                }
                                            />
                                        ))}
                                </div>
                                <span className="h-4 w-px bg-app-leaf/20"></span>
                                <span className="text-sm text-gray-500">
                                    Premium Quality Product
                                </span>
                            </div>

                            {/* Price */}
                            <div className="mt-5 flex flex-wrap items-baseline gap-3">
                                <span className="text-3xl sm:text-4xl font-bold text-app-green">
                                    ₹{product.price}
                                </span>

                                {product.originalPrice && (
                                    <span className="text-lg line-through text-gray-400">
                                        ₹{product.originalPrice}
                                    </span>
                                )}

                                {product.discount > 0 && (
                                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                                        Save {product.discount}%
                                    </span>
                                )}
                            </div>

                            {/* Availability */}
                            <div className="mt-4">
                                <span
                                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${product.stock > 0
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {product.stock > 0
                                        ? `In Stock (${product.stock} available)`
                                        : "Out of Stock"}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="mt-6">
                                <h3 className="font-semibold text-app-forest text-base">
                                    Description
                                </h3>
                                <p className="mt-2 text-sm sm:text-base leading-relaxed text-gray-600 max-w-2xl">
                                    {product.description}
                                </p>
                            </div>

                            {/* Product Info */}
                            <div className="mt-6 rounded-2xl bg-app-cream p-4 sm:p-5 max-w-md border border-app-leaf/10">
                                <h3 className="font-semibold text-app-forest text-sm mb-3">
                                    Product Information
                                </h3>
                                <div className="space-y-2.5 text-sm">
                                    <div className="flex justify-between items-center py-1 border-b border-app-leaf/10">
                                        <span className="text-gray-500">Category</span>
                                        <span className="capitalize font-medium text-app-forest">{categoryLabel}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-app-leaf/10">
                                        <span className="text-gray-500">Organic Status</span>
                                        <span className="font-medium text-app-forest">{product.isOrganic ? "Yes" : "No"}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-500">Quantity</span>
                                        <span className="font-medium text-app-forest">{displayQuantity}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cart Area */}
                        <div>
                            <div className="mt-8 flex flex-col sm:flex-row gap-3 items-stretch max-w-xl">
                                <div className="flex items-center justify-between border border-app-leaf/20 bg-white rounded-xl shadow-sm overflow-hidden h-12 w-full sm:w-32 shrink-0">
                                    <button
                                        disabled={product.stock === 0}
                                        onClick={handleMinus}
                                        className="w-10 h-full hover:bg-app-cream text-lg font-semibold flex items-center justify-center transition-colors text-app-forest active:bg-app-leaf/20"
                                    >
                                        -
                                    </button>
                                    <span className="font-semibold text-app-forest tabular-nums">
                                        {displayQuantity}
                                    </span>
                                    <button
                                        disabled={product.stock === 0}
                                        onClick={handleAdd}
                                        className="w-10 h-full hover:bg-app-cream text-lg font-semibold flex items-center justify-center transition-colors text-app-forest active:bg-app-leaf/20"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    disabled={product.stock === 0 || inCart}
                                    onClick={() => {
                                        if (!inCart) addToCart(product, localQuantity)
                                    }}
                                    className={`h-12 w-full sm:flex-grow rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${inCart
                                        ? "bg-green-100 text-green-700 border border-green-300 cursor-default"
                                        : "bg-app-green text-white hover:bg-app-forest active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
                                        }`}
                                >
                                    {inCart ? "✓ Added to Cart" : (
                                        <>
                                            <ShoppingCart size={16} />
                                            Add to Cart
                                        </>
                                    )}
                                </button>

                                {inCart && (
                                    <button
                                        onClick={() => {
                                            removeFromCart(product._id)
                                            setLocalQuantity(1)
                                        }}
                                        className="h-12 w-full sm:w-12 rounded-xl border-2 border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center justify-center gap-2 shrink-0 shadow-sm"
                                        title="Remove from cart"
                                    >
                                        <Trash2Icon className="w-4 h-4" />
                                        <span className="sm:hidden text-sm font-semibold">Remove From Cart</span>
                                    </button>
                                )}
                            </div>

                            {/* Trust Badges Minimal */}
                            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-app-cream pt-5 max-w-md">
                                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                    <ShieldCheck size={16} className="text-app-green" /> Secure Checkout
                                </div>
                                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                    <Truck size={16} className="text-app-green" /> Fast Delivery
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {product.reviewCount > 0 && <DummyReviewsSection product={product} />}

                {/* Related Products */}
                {relatedProduct.length > 0 && (
                    <section className="mt-20">
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <p className="text-app-green uppercase tracking-[0.25em] text-xs font-semibold">
                                    Explore More
                                </p>

                                <h2 className="font-serif text-3xl text-app-forest mt-2">
                                    You may also like
                                </h2>
                            </div>

                            <span className="hidden sm:block text-sm text-gray-500">
                                Swipe →
                            </span>
                        </div>

                        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
                            {relatedProduct.slice(0, 10).map((item) => (
                                <Link
                                    key={item._id}
                                    to={`/products/${item._id}`}
                                    className="group min-w-[240px] sm:min-w-[270px] bg-white rounded-3xl overflow-hidden border border-app-leaf/20 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                                >
                                    {/* Image */}
                                    <div className="relative bg-gradient-to-br from-app-cream via-white to-app-leaf/20 h-60 flex items-center justify-center overflow-hidden">

                                        {item.discount > 0 && (
                                            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                {item.discount}% OFF
                                            </span>
                                        )}

                                        {item.isOrganic && (
                                            <span className="absolute top-4 right-4 bg-green-100 text-green-700 rounded-full p-2">
                                                <LeafIcon size={15} />
                                            </span>
                                        )}

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-40 object-contain transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">

                                        <div className="flex items-center gap-1 mb-2">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <Star
                                                    key={star}
                                                    size={14}
                                                    className={
                                                        star <= Math.round(item.rating)
                                                            ? "fill-yellow-400 text-yellow-400"
                                                            : "text-gray-300"
                                                    }
                                                />
                                            ))}

                                            <span className="text-xs text-gray-500 ml-1">
                                                {item.rating}
                                            </span>
                                        </div>

                                        <h3 className="font-semibold text-app-forest line-clamp-2 min-h-[52px]">
                                            {item.name}
                                        </h3>

                                        <div className="flex items-center gap-2 mt-3">
                                            <span className="text-2xl font-bold text-app-green">
                                                ₹{item.price}
                                            </span>

                                            {item.originalPrice && (
                                                <span className="text-sm line-through text-gray-400">
                                                    ₹{item.originalPrice}
                                                </span>
                                            )}
                                        </div>

                                        <button
                                            className="mt-5 w-full rounded-xl bg-app-green hover:bg-app-forest text-white py-3 font-medium transition-colors"
                                        >
                                            View Product
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default ProductPage;