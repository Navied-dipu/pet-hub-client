import React from "react";

export default function Loading() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center min-h-[60vh] space-y-4 bg-base-300">
      <div className="relative flex items-center justify-center">
        <span className="loading loading-ring loading-lg text-primary scale-150"></span>
        <span className="absolute animate-ping h-8 w-8 rounded-full bg-primary/45"></span>
      </div>
      <p className="text-gray-400 font-semibold tracking-wide animate-pulse mt-4 text-base">
        Finding your furry friends...
      </p>
    </div>
  );
}
