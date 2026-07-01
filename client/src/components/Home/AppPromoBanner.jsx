import { appPromoBannerData, assets } from "../../assets/assets";

function AppPromoBanner() {
    return (
        <section className="w-full bg-gradient-to-r from-app-green to-app-green-light text-white px-6 py-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-10 shadow-lg overflow-hidden">

            {/* Left section */}
            <div className="flex-1 flex flex-col gap-5">
                <div className="max-w-xl">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                        {appPromoBannerData.title}
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-white/80">
                        {appPromoBannerData.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                    <button className="px-5 py-2.5 rounded-xl bg-white text-app-green font-semibold text-sm hover:bg-white/90 active:scale-95 transition">
                        App Store
                    </button>
                    <button className="px-5 py-2.5 rounded-xl border border-white/40 text-white font-semibold text-sm hover:bg-white/10 active:scale-95 transition">
                        Google Play
                    </button>
                </div>
            </div>

            {/* Right image section */}
            <div className="hidden md:flex flex-1 justify-center md:justify-end">
                <img
                    src={assets.delivery_truck}
                    alt="Delivery truck"
                    className="w-[220px] sm:w-[280px] md:w-[340px] lg:w-[380px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                />
            </div>

        </section>
    );
}

export default AppPromoBanner;