import { ArrowRightIcon, LeafIcon } from 'lucide-react';
import { heroSectionData } from '../../assets/assets';
import hero_banner from '../../assets/hero_banner.jpg';
import { Link } from 'react-router-dom';


function Hero() {
    return (
        <section className="relative min-h-[85vh]  rounded-2xl flex items-center overflow-hidden">

            {/* Background Image */}
            <img
                src={hero_banner}
                alt="Hero Banner"
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-app-green via-app-green/70 to-transparent" />

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <LeafIcon className="size-4" />
                    Nature's Finest Selection
                </div>

                {/* Heading */}
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                    Fresh From Nature{" "}
                    <span className="text-app-leaf">
                        Delivered To Your Door
                    </span>
                </h1>

                {/* Description */}
                <p className="text-white/90 text-base sm:text-lg max-w-lg leading-relaxed mb-8">
                    {heroSectionData.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">

                    <Link
                        to="/products"
                        className="inline-flex items-center justify-center gap-2 bg-app-orange hover:scale-105 transition-all duration-300 text-white font-semibold px-7 py-3 rounded-xl shadow-lg"
                    >
                        Shop Now
                        <ArrowRightIcon className="size-5" />
                    </Link>

                    <Link
                        to="/products"
                        className="inline-flex items-center justify-center border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 text-white font-semibold px-7 py-3 rounded-xl"
                    >
                        Browse Categories
                    </Link>

                </div>
            </div>
        </section>
    );
}

export default Hero;