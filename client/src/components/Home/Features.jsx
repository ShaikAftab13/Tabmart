import { heroSectionData } from "../../assets/assets";

function Features() {
    return (
        <section className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white border border-app-border/80 rounded-3xl shadow-sm overflow-hidden">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-app-border/50">

                        {heroSectionData.hero_features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-4 p-5 sm:p-6 hover:bg-app-green/5 transition-colors duration-300"
                            >
                                <div className="flex items-center justify-center shrink-0 w-12 h-12 rounded-xl bg-app-green/10">
                                    <feature.icon className="size-6 text-app-green" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-1 text-xs sm:text-sm text-gray-600 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Features;