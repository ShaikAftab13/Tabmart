import {
    BikeIcon,
    SearchIcon,
    ShoppingCartIcon,
    MenuIcon,
    ChevronDown,
    UserIcon,
    XIcon,
    PackageIcon,
    MapPinIcon,
    ArrowUpRightIcon,
    ShieldIcon,
    LogOutIcon
} from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    const { cartCount, setIsCartOpen } = useContext(CartContext);

    const [searchQuery, setSearchQuery] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
        };
        window.scrollTo({ top: 0, behavior: "auto" })
    }

    const handleLogOut = async () => {
        setUserMenuOpen(false);
        await logout();
    }

    return (
        <nav className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* MAIN ROW */}
                <div className="flex items-center justify-between h-14">

                    {/* LOGO */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 hover:scale-105 transition"
                    >
                        <BikeIcon className="text-app-green" />
                        <span className="font-bold text-lg text-app-forest">
                            TabMart
                        </span>
                    </Link>

                    {/* DESKTOP LINKS */}
                    <div className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
                        <Link className="hover:text-app-green transition" to="/">Home</Link>
                        <Link className="hover:text-app-green transition" to="/products">Products</Link>
                        <Link className="hover:text-app-green transition" to="/deals">Deals</Link>
                    </div>

                    {/* SEARCH */}
                    <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md mx-6">
                        <div className="group flex items-center w-full border border-zinc-200 rounded-full px-3 py-2 bg-cream transition-all duration-200 focus-within:ring-2 focus-within:ring-app-green focus-within:shadow-md hover:shadow-sm">

                            <SearchIcon
                                size={18}
                                className="text-zinc-500 group-focus-within:text-app-green transition"
                            />

                            <input
                                className="w-full px-2 text-sm outline-none bg-transparent placeholder:text-zinc-400"
                                type="text"
                                placeholder="Search groceries..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </form>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-3">

                        {/* CART */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 rounded-full hover:bg-cream hover:scale-105 active:scale-95 transition"
                        >
                            <ShoppingCartIcon />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-app-green text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* USER DROPDOWN */}
                        <div className="relative">

                            {user ? (
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-cream transition"
                                >
                                    <div className="w-8 h-8 rounded-full bg-app-green text-white flex items-center justify-center font-semibold">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>

                                    <ChevronDown size={16} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cream transition"
                                >
                                    <UserIcon size={18} />
                                    <span className="hidden sm:inline">Sign In</span>
                                </button>
                            )}

                            {userMenuOpen && (
                                <div
                                    className="fixed inset-0 z-40 bg-black/10"
                                    onClick={() => setUserMenuOpen(false)}
                                >
                                    <div
                                        className="absolute right-4 top-16 w-64 bg-white rounded-xl shadow-xl border overflow-hidden"
                                        onClick={(e) => e.stopPropagation()}
                                    >

                                        {user ? (
                                            <>
                                                <div className="p-4 border-b bg-cream">
                                                    <p className="font-semibold">
                                                        {user?.name}
                                                    </p>
                                                    <p className="text-xs text-zinc-500">
                                                        {user?.email}
                                                    </p>
                                                </div>

                                                <div className="p-2 space-y-1">

                                                    <Link
                                                        to="/orders"
                                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cream"
                                                        onClick={() => setUserMenuOpen(false)}
                                                    >
                                                        <PackageIcon size={16} />
                                                        My Orders
                                                    </Link>

                                                    <Link
                                                        to="/addresses"
                                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cream"
                                                        onClick={() => setUserMenuOpen(false)}
                                                    >
                                                        <MapPinIcon size={16} />
                                                        Addresses
                                                    </Link>

                                                    <Link
                                                        to="/products"
                                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cream"
                                                        onClick={() => setUserMenuOpen(false)}
                                                    >
                                                        <ArrowUpRightIcon size={16} />
                                                        Products
                                                    </Link>

                                                    <Link
                                                        to="/deals"
                                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cream"
                                                        onClick={() => setUserMenuOpen(false)}
                                                    >
                                                        <ArrowUpRightIcon size={16} />
                                                        Deals
                                                    </Link>

                                                    {user.isAdmin && (
                                                        <Link
                                                            to="/admin/products"
                                                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-app-green/10 text-app-forest hover:bg-app-green/20 font-medium"
                                                            onClick={() => setUserMenuOpen(false)}
                                                        >
                                                            <ShieldIcon size={16} />
                                                            Admin Panel
                                                        </Link>
                                                    )}

                                                    <button
                                                        onClick={handleLogOut}
                                                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50"
                                                    >
                                                        <LogOutIcon size={16} />
                                                        Logout
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="p-2 space-y-1">

                                                <Link
                                                    to="/login"
                                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cream"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    <UserIcon size={16} />
                                                    Sign In
                                                </Link>

                                                <Link
                                                    to="/products"
                                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cream"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    <ArrowUpRightIcon size={16} />
                                                    Products
                                                </Link>

                                                <Link
                                                    to="/deals"
                                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cream"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    <ArrowUpRightIcon size={16} />
                                                    Deals
                                                </Link>

                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* MOBILE MENU BUTTON */}
                        <button
                            className="md:hidden p-2 hover:bg-cream rounded-lg transition"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <XIcon /> : <SearchIcon />}
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4 space-y-3 text-sm text-zinc-600">

                        {/* MOBILE SEARCH */}
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center border border-zinc-200 rounded-full px-3 py-2 bg-cream focus-within:ring-2 focus-within:ring-app-green transition"
                        >
                            <SearchIcon size={18} className="text-zinc-500" />

                            <input
                                className="w-full px-2 text-sm outline-none bg-transparent"
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;