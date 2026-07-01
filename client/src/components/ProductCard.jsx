import { ShoppingCartIcon, StarIcon } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {

    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    return (
        <div
            onClick={() => navigate(`/products/${product._id}`)}
            className="group flex flex-col bg-white rounded-2xl border border-green-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >

            <div className="relative aspect-square bg-green-50/40 flex items-center justify-center p-4">

                <img
                    src={Array.isArray(product.image) ? product.image[0] : product.image}
                    alt={product.name}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />

                {product.price > 99 && (
                    <span className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md text-app-green text-[11px] font-semibold px-2 py-1 rounded-full border border-green-100 shadow-sm">
                        Free Delivery
                    </span>
                )}

                {product.discount > 0 && (
                    <span className="absolute top-3 left-3 bg-app-green text-white text-xs px-2 py-1 rounded-full shadow">
                        {product.discount}% OFF
                    </span>
                )}

                {product.rating > 0 && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white px-2 py-1 rounded-full text-xs font-semibold text-app-green shadow">
                        <StarIcon size={12} fill="currentColor" />
                        {product.rating.toFixed(1)}
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col flex-1">

                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-10">
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

                <div className="my-3 border-t border-gray-100"></div>

                <button
                    onClick={e => {
                        e.stopPropagation();
                        addToCart(product)
                    }}
                    className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-app-green text-white text-sm font-medium hover:bg-app-green-light transition-all"
                >
                    <ShoppingCartIcon size={16} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;