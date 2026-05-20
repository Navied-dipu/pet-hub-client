"use client";

import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="hero min-h-[85vh] bg-gradient-to-r from-base-200 to-base-100 px-6 lg:px-16">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse gap-12">

        {/* Image Section */}
        <div className="relative w-full max-w-lg">
          <Image
            src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8"
            alt="Happy dog"
            width={600}
            height={600}
            priority
            className="rounded-3xl shadow-2xl object-cover w-full"
          />

          {/* Floating Badge */}
          <div className="absolute -bottom-5 -left-5 bg-primary text-white px-5 py-3 rounded-2xl shadow-lg">
            <p className="font-bold text-lg">1000+ Pets Adopted 🐾</p>
          </div>
        </div>

        {/* Text Section */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Find Your Perfect{" "}
            <span className="text-primary">Pet Companion</span> 🐶🐱
          </h1>

          <p className="py-6 text-base md:text-lg text-gray-600 leading-relaxed">
            Adopt loving pets who are waiting for a forever home.
            Give them care, love, and happiness — and they’ll become
            your most loyal friend forever.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link href="/allpets">
              <button className="btn btn-primary btn-lg rounded-xl">
                Adopt Now
              </button>
            </Link>

            <button className="btn btn-outline btn-lg rounded-xl">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10">
            <div>
              <h2 className="text-2xl font-bold text-primary">500+</h2>
              <p className="text-sm text-gray-500">Happy Families</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary">1200+</h2>
              <p className="text-sm text-gray-500">Pets Available</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary">24/7</h2>
              <p className="text-sm text-gray-500">Support</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}