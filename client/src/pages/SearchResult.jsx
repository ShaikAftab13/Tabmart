import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { Home, Search } from "lucide-react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";

function SearchResult() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    useEffect(() => {
        if (!query) return;
        setLoading(true);
        setProducts(dummyProducts.filter(products => products.name.toLowerCase().includes(query.toLowerCase())));
        setLoading(false);
    }, [query])

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <Link
                        to="/"
                        className="hover:text-app-green transition-colors p-1 hover:bg-gray-100 rounded-md"
                    >
                        <Home size={18} />
                    </Link>

                    <span>/</span>

                    <span className="font-medium text-app-green">
                        Search Results
                    </span>
                </nav>
                {/* Header */}
                <div className="mb-8 border-b border-gray-200 pb-5">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Results for "{query}"</h1>
                    <p className="mt-2 text-sm text-gray-500">{loading ? "Searching..." : `${products.length} items found`}</p>
                </div>
                {/* Results */}
                {loading ? <Loading /> : products.length ===     0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-lg bg-white">
                        <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h2 className="mt-2 text-lg font-medium text-gray-900">No results found</h2>
                        <p className="mt-1 text-sm text-gray-500 max-w-xs">We couldn't find any related {query} products right now.</p>
                        <Link to='/products' className="mt-6 inline-flex items-center justify-center rounded-md bg-app-green px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-app-green focus:ring-offset-2 transition-colors">Browse all products</Link>                    </div>) : (<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {products.map(product => <ProductCard key={product._id} product={product} />)}
                        </div>)
                }
            </div>
        </div>
    )
}

export default SearchResult