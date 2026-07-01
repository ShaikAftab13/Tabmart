import { Loader2Icon } from "lucide-react";

function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <Loader2Icon
                    size={40}
                    className="animate-spin text-app-green"
                />
                <p className="text-sm text-gray-500">
                    Loading products...
                </p>
            </div>
        </div>
    );
}

export default Loading;