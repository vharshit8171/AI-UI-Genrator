export default function Loader({
    title = "Generating your website",
    subtitle = "This process may take some time",
}) {
    return (
        <div className="flex-1 flex items-center justify-center px-6">
            <div className="flex flex-col items-center gap-6 text-center">
                {/* Spinner */}
                <div className="relative w-14 h-14">
                    <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                    <div className="absolute inset-0 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
                </div>

                {/* Text */}
                <div className="space-y-1.5">
                    <h2 className="text-xl font-semibold text-white">
                        {title}
                    </h2>
                    <p className="text-sm text-white/50">
                        {subtitle}
                    </p>
                </div>

                {/* Animated dots */}
                <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" />
                </div>
            </div>
        </div>
    );
}