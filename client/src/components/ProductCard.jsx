import { ShoppingCartIcon, StarIcon } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const image =
        Array.isArray(product.image)
            ? product.image[0]
            : product.image || "/placeholder.png";

    return (
        <div
            onClick={() => navigate(`/products/${product._id}`)}
            className="group flex flex-col bg-white rounded-2xl border border-green-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
            {/* IMAGE */}
            <div className="relative w-full h-48 bg-green-50 overflow-hidden">

                <img
                    src={image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Free Delivery */}
                {product.price > 99 && (
                    <span className="absolute bottom-2 left-2 bg-white/90 text-app-green text-[11px] font-semibold px-2 py-1 rounded-full">
                        Free Delivery
                    </span>
                )}

                {/* Discount */}
                {product.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-app-green text-white text-xs px-2 py-1 rounded-full">
                        {product.discount}% OFF
                    </span>
                )}

                {/* Rating */}
                {product.rating > 0 && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-white px-2 py-1 rounded-full text-xs font-semibold text-app-green shadow">
                        <StarIcon size={12} fill="currentColor" />
                        {product.rating.toFixed(1)}
                    </div>
                )}
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-10">
                    {product.name}
                </h3>

                <div className="mt-3 flex items-end gap-2">
                    <span className="text-xl font-bold text-app-green">
                        ₹{product.price}
                    </span>

                    {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                            ₹{product.originalPrice}
                        </span>
                    )}
                </div>

                {product.discount > 0 && (
                    <p className="text-xs text-green-600 font-medium mt-1">
                        You save {product.discount}% 🎉
                    </p>
                )}

                <div className="mt-auto pt-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-app-green text-white text-sm font-medium hover:bg-app-green-light transition-all"
                    >
                        <ShoppingCartIcon size={16} />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;