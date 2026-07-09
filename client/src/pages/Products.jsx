import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { categoriesData } from "../assets/assets";
import {
    ChevronDown,
    Home,
    SlidersHorizontal,
    XIcon,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import FilterPanel from "../components/FilterPanel";
import api from "../config/api";
import toast from "react-hot-toast";

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [mobileFilterOption, setMobileFilterOption] = useState(false);

    const category = searchParams.get("category") || "";
    const organic = searchParams.get("organic") || "";
    const sort = searchParams.get("sort") || "";
    const page = Number(searchParams.get("page")) || 1;
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";

    const fetchProducts = async () => {
        setLoading(true);

        try {
            const params = new URLSearchParams();
            if (category) params.set('category', category);
            if (organic) params.set('organic', organic);
            if (sort) params.set('sort', sort);
            if (page) params.set('page', page);
            if (minPrice) params.set('minPrice', minPrice);
            if (maxPrice) params.set('maxPrice', maxPrice);
            params.set("page", String(page));
            params.set("limit", 12);
            const { data } = await api.get(`/products?${params.toString()}`);
            setProducts(data.products);
            setTotalPages(data.pages);
        } catch (err) {
            toast.error(err.response?.data?.message || err?.message);
        } finally {
            setLoading(false);
        }

    };

    const updateFilter = (key, value) => {
        const newParams = new URLSearchParams(searchParams);

        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }

        if (key !== "page") {
            newParams.delete("page");
        }

        setSearchParams(newParams);
    };

    const clearFilter = () => {
        setSearchParams({});
    };

    const activeCategory = categoriesData.find(
        (c) => c.slug === category
    );

    const hasFilters = category || organic || sort || minPrice || maxPrice;

    useEffect(() => {
        fetchProducts();
    }, [category, organic, sort, page, minPrice, maxPrice]);

    return (
        <div className="min-h-screen bg-app-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <Link
                        to="/"
                        className="hover:text-app-green transition-colors"
                    >
                        <Home size={18} />
                    </Link>

                    <span>/</span>

                    <span className="font-medium text-app-green">
                        {activeCategory
                            ? activeCategory.name
                            : "All Products"}
                    </span>
                </nav>

                <div className="flex gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-72 shrink-0">

                        <FilterPanel categories={categoriesData} category={category}
                            organic={organic} minPrice={minPrice} maxPrice={maxPrice}
                            updateFilter={updateFilter} clearFilter={clearFilter}
                            hasFilters={hasFilters}
                        />

                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                            <div>
                                <h1 className="font-serif text-3xl text-app-green">
                                    {activeCategory
                                        ? activeCategory.name
                                        : "All Products"}
                                </h1>

                                <p className="text-gray-600 mt-1">
                                    {products.length} products found
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Mobile Filter */}
                                <button
                                    onClick={() =>
                                        setMobileFilterOption(
                                            !mobileFilterOption
                                        )
                                    }
                                    className="lg:hidden flex items-center gap-2 border rounded-lg px-4 py-2 bg-white"
                                >
                                    <SlidersHorizontal size={18} />
                                    Filters
                                </button>

                                {/* Sort */}
                                <div className="relative">
                                    <select
                                        value={sort}
                                        onChange={(e) =>
                                            updateFilter(
                                                "sort",
                                                e.target.value
                                            )
                                        }
                                        className="appearance-none bg-white border rounded-lg px-4 py-2 pr-10 focus:outline-none"
                                    >
                                        <option value="">
                                            Newest
                                        </option>
                                        <option value="price_asc">
                                            Price: Low → High
                                        </option>
                                        <option value="price_desc">
                                            Price: High → Low
                                        </option>
                                        <option value="rating">
                                            Top Rated
                                        </option>
                                        <option value="name">
                                            A → Z
                                        </option>
                                    </select>

                                    <ChevronDown
                                        size={18}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Mobile Filters */}
                        {mobileFilterOption && (
                            <div
                                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                                onClick={() => setMobileFilterOption(false)}
                            >
                                <div
                                    className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-app-cream shadow-2xl overflow-y-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Header */}
                                    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-app-leaf/10 bg-app-cream px-5 py-4">
                                        <h2 className="font-serif text-2xl text-app-forest">
                                            Filters
                                        </h2>

                                        <button
                                            onClick={() => setMobileFilterOption(false)}
                                            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-app-green/10 transition"
                                        >
                                            <XIcon
                                                size={20}
                                                className="text-app-forest"
                                            />
                                        </button>
                                    </div>

                                    <div className="p-4">
                                        <FilterPanel
                                            categories={categoriesData}
                                            category={category}
                                            minPrice={minPrice}
                                            maxPrice={maxPrice}
                                            updateFilter={updateFilter}
                                            clearFilter={clearFilter}
                                            hasFilters={hasFilters}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Products */}
                        {loading ? (
                            <div className="flex justify-center items-center py-24">
                                <Loading />
                            </div>
                        ) : products.length === 0 ? (
                            <div className="bg-white rounded-2xl border p-10 text-center">
                                <h2 className="text-2xl font-semibold mb-2">
                                    No Products Found
                                </h2>

                                <p className="text-gray-600 mb-5">
                                    Try adjusting your filters.
                                </p>

                                <button
                                    onClick={clearFilter}
                                    className="px-5 py-2 rounded-lg bg-app-green text-white hover:bg-app-green-light"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                                {products.map(
                                    (product) =>
                                        product.stock > 0 && (
                                            <ProductCard
                                                key={product._id}
                                                product={product}
                                            />
                                        )
                                )}
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-8">
                                {Array.from({ length: totalPages }).map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            updateFilter("page", String(idx + 1));

                                            window.scrollTo({
                                                top: 0,
                                                behavior: "smooth",
                                            });
                                        }}
                                        className={`h-10 w-10 rounded-lg border transition ${page === idx + 1
                                            ? "bg-app-green text-white border-app-green"
                                            : "bg-white hover:bg-gray-100"
                                            }`}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </main>
                </div >
            </div >
        </div >
    );
}

export default Products;