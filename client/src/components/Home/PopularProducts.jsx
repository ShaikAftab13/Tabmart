import { useEffect, useState } from "react";
import { dummyProducts } from "../../assets/assets";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";

function PopularProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(dummyProducts.slice(0, 10));
    }, []);

    return (
        <section className="py-20 bg-gradient-to-b from-[#faf8f2] via-white to-[#faf8f2] mb-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
                    <div>

                        <h2 className="font-serif text-4xl md:text-5xl text-app-green leading-tight">
                            Popular Products
                        </h2>

                        <p className="mt-4 text-gray-600 text-lg max-w-2xl">
                            Handpicked products crafted for quality, elegance, and everyday excellence.
                        </p>
                    </div>

                    <Link
                        to="/products"
                        onClick={() => window.scroll({ top: 0, behavior: "smooth" })}
                        className="group mt-6 md:mt-0 inline-flex items-center gap-3 px-6 py-3 border-2 border-app-green text-app-green rounded-full font-medium hover:bg-app-green hover:text-white transition-all duration-300"
                    >
                        View All Products
                        <span className="group-hover:translate-x-1 transition-transform">
                            →
                        </span>
                    </Link>
                </div>

                <div onClick={() => window.scroll({ top: 0, behavior: "smooth" })} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {products.map(product => (
                        <ProductCard product={product} key={product._id} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default PopularProducts;