import { useContext, useEffect, useState } from "react"
import Loading from "../components/Loading";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import api from "../config/api"
import toast from "react-hot-toast";

function FlashDeals() {

    const { addToCart } = useContext(CartContext);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFlashDeals = async () => {
            setLoading(true);
            try {
                const { data } = await api.get("/products/flash-deals");
                setProducts(data.products);
            } catch (err) {
                toast.error(err.response?.data?.message || err?.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFlashDeals();
    }, []);

    return (
        <section className="py-10">
            <div className="max-w-6xl mx-auto px-4">
                {/* Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-app-forest via-app-green to-app-forest px-6 py-10 mb-8">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-white/5 blur-2xl"></div>
                        <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/5 blur-2xl"></div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
                            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="text-xs font-semibold tracking-widest uppercase text-red-300">
                                Flash Sale Live
                            </span>
                        </div>

                        <h2 className="mt-4 font-serif text-3xl md:text-4xl text-white leading-tight">
                            Fresh Deals.
                            <br />
                            Bigger Savings.
                        </h2>

                        <p className="mt-3 max-w-xl text-sm md:text-base text-white/75">
                            Discover handpicked products with exclusive discounts and limited-time offers.
                        </p>

                        <div className="mt-5 flex items-center justify-center gap-6 text-white">
                            <div>
                                <p className="text-xl font-bold">50%+</p>
                                <p className="text-xs text-white/60">Discounts</p>
                            </div>

                            <div className="h-8 w-px bg-white/20"></div>

                            <div>
                                <p className="text-xl font-bold">100+</p>
                                <p className="text-xs text-white/60">Products</p>
                            </div>

                            <div className="h-8 w-px bg-white/20"></div>

                            <div>
                                <p className="text-xl font-bold">24h</p>
                                <p className="text-xs text-white/60">Offers</p>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <Loading />
                ) : (products.length === 0 ? <div className="flex flex-col items-center justify-center py-16 text-center">
                    <span className="text-5xl mb-4">🔥</span>

                    <h3 className="font-serif text-2xl text-app-forest">
                        No Flash Deals Available
                    </h3>

                    <p className="mt-2 max-w-md text-gray-500">
                        We're preparing new exclusive offers. Check back soon for
                        fresh deals and limited-time savings.
                    </p>
                </div> : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        {products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>)
                )}
            </div>
        </section>
    );
}

export default FlashDeals