import { MailIcon } from "lucide-react";

function NewsLetter() {
    return (
        <section className="mt-6 bg-app-green/5 border border-green-100 rounded-2xl px-6 py-10 md:py-14 flex flex-col items-center text-center gap-6">

            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-app-green text-white shadow-md">
                <MailIcon className="w-6 h-6" strokeWidth={1.5} />
            </div>

            <div className="max-w-xl flex flex-col gap-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-app-green">
                    Join our Newsletter
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                    Get updates on fresh deals, new products, and exclusive offers directly in your inbox.
                </p>
            </div>

            <form onSubmit={e => e.preventDefault()} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-xl border border-green-200 focus:outline-none focus:ring-2 focus:ring-app-green/40"
                />

                <button className="px-5 py-3 rounded-xl bg-app-green text-white font-medium hover:bg-app-green-light transition">
                    Subscribe
                </button>
            </form>

        </section>
    );
}

export default NewsLetter;