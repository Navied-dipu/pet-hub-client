"use client";

import Image from "next/image";

export default function Banner() {
    return (
        <div className="hero min-h-[80vh] bg-base-200 px-6">
            <div className="hero-content flex-col lg:flex-row-reverse gap-10">

                {/* Image */}
                {/* <div className="relative w-full max-w-md">
                    <Image
                        src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8"
                        alt="Happy pets"
                        width={500}
                        height={500}
                        className="rounded-2xl shadow-2xl object-cover"
                    />
                </div> */}

                {/* Text Content */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Find Your Perfect <span className="text-primary">Pet Companion</span> 🐶🐱
                    </h1>

                    <p className="py-6 text-gray-600 max-w-md">
                        Adopt loving pets who are waiting for a forever home.
                        Give them love, and they will give you endless happiness.
                    </p>

                    <div className="flex gap-3">
                        <button className="btn btn-primary">
                            Adopt Now
                        </button>

                        <button className="btn btn-outline">
                            Learn More
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}