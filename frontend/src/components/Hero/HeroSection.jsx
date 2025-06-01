import { Button } from "../ui/button";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
        <div className="flex items-center justify-center px-4 py-24 md:px-6 lg:py-32">
            <div className="w-full max-w-4xl rounded-2xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-xl p-10 text-white">

                {/* Title */}
                <div className="mx-auto mt-5 max-w-2xl text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Fuel Your Mind with Fresh Perspectives
                    </h1>
                </div>

                {/* Subtitle */}
                <div className="mx-auto mt-5 max-w-3xl text-center">
                    <p className="text-white/80 text-lg">
                        Dive into stories that inspire, challenge, and grow your thinking 🚀...
                    </p>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex justify-center gap-3">
                    <Link
                        to="/login"
                        className="px-4 py-2 text-white font-medium bg-pink-600 hover:bg-pink-700 rounded-md transition"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Info Footer */}
            </div>
        </div>
    );
}
