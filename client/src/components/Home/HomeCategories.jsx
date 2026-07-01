import { Link } from "react-router-dom";
import { categoriesData } from "../../assets/assets";

function HomeCategories() {
    return (
        <section className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Shop by Category
                    </h2>

                    <p className="mt-2 text-sm sm:text-base text-gray-500">
                        Find your daily essential needs here
                    </p>
                </div>

                <div className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-2">

                    {categoriesData.map((category) => (
                        <Link
                            key={category.slug}
                            to={`/products?category=${category.slug}`}
                            onClick={() =>
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                })
                            }
                            className="group shrink-0 w-28 sm:w-32"
                        >
                            <div className="bg-white rounded-2xl border border-app-border/50 p-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">

                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full aspect-square object-contain"
                                />

                                <p className="mt-3 text-center text-xs sm:text-sm font-medium text-gray-700 group-hover:text-app-green truncate">
                                    {category.name}
                                </p>

                            </div>
                        </Link>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default HomeCategories;