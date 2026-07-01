import { useState } from 'react';
import { TruckIcon, XIcon, ZapIcon } from 'lucide-react';

function Banner() {
    const [bannerVisible, setBannerVisible] = useState(() => {
        return sessionStorage.getItem('banner_dismissed') !== "true";
    });

    const dismissBanner = () => {
        setBannerVisible(false);
        sessionStorage.setItem('banner_dismissed', "true");
    };

    if (!bannerVisible) return null;

    return (
        <div className="hero-gradient text-white shadow-md py-3">
            <div className="page-container flex items-center justify-center relative">

                <div className="flex items-center gap-3 text-sm sm:text-base font-medium text-center">

                    <TruckIcon className="w-5 h-5" />
                    <span>Free delivery on orders above ₹99</span>

                    <span className="hidden sm:block">|</span>

                    <ZapIcon className="w-5 h-5" />
                    <span>Fresh groceries available</span>

                </div>

                <button
                    onClick={dismissBanner}
                    className="absolute right-2 p-1 rounded-full hover:bg-white/10"
                    aria-label="Close banner"
                >
                    <XIcon className="w-5 h-5" />
                </button>

            </div>
        </div>
    );
}

export default Banner;