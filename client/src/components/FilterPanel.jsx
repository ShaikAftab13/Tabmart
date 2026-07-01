import { ChevronDown } from "lucide-react";
import { useState } from "react";

function FilterPanel({
    categories,
    category,
    minPrice,
    maxPrice,
    updateFilter,
    clearFilter,
    hasFilters
}) {
    const [isOpen, setIsOpen] = useState(true);

    const categoriesAll = [
        { slug: "", name: "All Categories" },
        ...categories,
    ];

    return (
        <div className="sticky top-24 w-full rounded-3xl border border-app-leaf/20 bg-white/70 backdrop-blur-md p-4 sm:p-6 lg:p-7 transition-all duration-300">
            {/* Categories */}
            <div>
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div className="flex items-center gap-3">
                        <div className="h-7 w-1 sm:h-8 rounded-full bg-app-green"></div>
                        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-app-forest tracking-wide">
                            Categories
                        </h3>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-full hover:bg-app-green/10 active:scale-95 transition-all duration-200"
                    >
                        <ChevronDown
                            className={`h-5 w-5 text-app-forest transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""
                                }`}
                        />
                    </button>
                </div>

                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen
                            ? "max-h-[800px] opacity-100 mt-2"
                            : "max-h-0 opacity-0 pointer-events-none"
                        }`}
                >
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 sm:gap-3">
                        {categoriesAll.map((cat) => (
                            <button
                                key={cat.slug}
                                onClick={() =>
                                    updateFilter(
                                        "category",
                                        cat.slug === category ? "" : cat.slug
                                    )
                                }
                                className={`group relative overflow-hidden rounded-2xl px-4 py-3 text-sm font-medium text-left transition-all duration-300 ${cat.slug === category
                                        ? "bg-app-green text-white scale-[1.01]"
                                        : "bg-white/80 border border-app-leaf/15 text-app-forest hover:border-app-green/40 hover:-translate-y-0.5 hover:bg-white"
                                    }`}
                            >
                                <span className="relative z-10 flex items-center justify-between gap-2">
                                    <span className="truncate">{cat.name}</span>

                                    {cat.slug === category && (
                                        <span className="h-2 w-2 shrink-0 rounded-full bg-white animate-pulse" />
                                    )}
                                </span>

                                {cat.slug !== category && (
                                    <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-app-green/5 to-app-leaf/10 transition-transform duration-300 ease-out group-hover:translate-y-0" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Price Range */}
            <div className="mt-6 sm:mt-8 border-t border-app-leaf/15 pt-5 sm:pt-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-7 w-1 rounded-full bg-app-orange"></div>
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-app-forest tracking-wide">
                        Price Range
                    </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                        <input
                            type="number"
                            placeholder="Min ₹"
                            value={minPrice}
                            onChange={(e) =>
                                updateFilter("minPrice", e.target.value)
                            }
                            className="w-full rounded-xl border border-app-leaf/20 bg-white/90 px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-app-forest placeholder:text-app-forest/40 outline-none transition-all duration-200 focus:border-app-green focus:bg-white focus:ring-4 focus:ring-app-green/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="number"
                            placeholder="Max ₹"
                            value={maxPrice}
                            onChange={(e) =>
                                updateFilter("maxPrice", e.target.value)
                            }
                            className="w-full rounded-xl border border-app-leaf/20 bg-white/90 px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-app-forest placeholder:text-app-forest/40 outline-none transition-all duration-200 focus:border-app-green focus:bg-white focus:ring-4 focus:ring-app-green/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                </div>
            </div>

            {hasFilters && (
                <button
                    onClick={clearFilter}
                    className="mt-6 w-full rounded-lg border px-4 py-2 hover:bg-gray-50"
                >
                    Clear Filters
                </button>
            )}
        </div>
    );
}

export default FilterPanel;