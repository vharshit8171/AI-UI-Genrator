import React from "react";

const AppLoader = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden px-6">
            <div className="absolute w-125 h-125 bg-yellow-500/10 blur-3xl rounded-full"></div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                    <div className="w-28 h-28 rounded-3xl border-[3px] border-yellow-500/20 border-t-yellow-400 animate-spin"></div>

                    <div className="absolute w-20 h-20 rounded-2xl bg-yellow-400 flex items-center justify-center shadow-2xl shadow-yellow-500/30">
                        <span className="text-black text-3xl font-black">
                            AI
                        </span>
                    </div>
                </div>

                <div className="mt-10 text-center space-y-3">
                    <h1 className="text-white text-3xl font-bold tracking-tight">
                        Building Your Experience
                    </h1>

                    <p className="text-gray-400 max-w-sm leading-relaxed">
                        Generating modern AI-powered pages with beautiful UI components.
                    </p>
                </div>

                <div className="mt-8 w-64 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-yellow-400 rounded-full animate-[loading_1.5s_ease-in-out_infinite]"></div>
                </div>
            </div>

            <style>
                {`
          @keyframes loading {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(300%);
            }
          }
        `}
            </style>
        </div>
    );
};

export default AppLoader;