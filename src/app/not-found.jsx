import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center min-h-[75vh] px-6 text-center bg-base-300">
      <div className="max-w-md w-full space-y-6 animate-fadeIn">
        {/* Visual Badge/Illustration */}
        <div className="text-9xl font-black text-primary/45 tracking-widest selection:bg-transparent">
          404
        </div>
        
        {/* Messaging */}
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-white">Oops! Lost in the Woods?</h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            The page you are looking for doesn't exist. Maybe it went for a walk or was adopted by someone else!
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link
            href="/"
            className="btn btn-primary text-white font-bold px-8 py-3 rounded-xl transition duration-200 hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 inline-flex items-center gap-2"
          >
            🐾 Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
