"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Banner() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-base-100 px-6 lg:px-16 pt-20 pb-12">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Text Section */}
        <motion.div 
          className="flex-1 max-w-2xl z-10"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary font-semibold text-sm tracking-wide shadow-sm border border-primary/20 backdrop-blur-sm">
            🐾 The #1 Pet Adoption Platform
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-base-content mb-6">
            Find Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Perfect Companion</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-base-content/70 leading-relaxed mb-10 max-w-xl">
            Open your heart and home to a furry friend in need. Discover loving pets waiting for a second chance at happiness with you.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
            <Link href="/allpets">
              <button className="btn btn-primary btn-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 border-none px-8 font-bold">
                Adopt Now
              </button>
            </Link>

            <button className="btn bg-base-100 text-base-content btn-lg rounded-2xl shadow-sm border border-base-300 hover:border-primary/50 hover:bg-primary/5 hover:-translate-y-1 transition-all duration-300 px-8 font-bold">
              Learn More
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={containerVariants} className="flex gap-10 mt-14 pt-8 border-t border-base-300/50">
            {[
              { value: "500+", label: "Happy Families" },
              { value: "1.2k+", label: "Pets Available" },
              { value: "24/7", label: "Expert Support" }
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="flex flex-col">
                <h2 className="text-3xl font-extrabold text-base-content">{stat.value}</h2>
                <p className="text-sm font-medium text-base-content/60 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div 
          className="flex-1 relative w-full max-w-lg lg:max-w-xl z-10"
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/20 border-8 border-base-100 aspect-[4/5] lg:aspect-square group">
            <Image
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2000&auto=format&fit=crop"
              alt="Happy dog looking up"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle inner shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
          </div>

          {/* Floating Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
            className="absolute -bottom-6 -left-6 md:-left-12 bg-base-100 text-base-content px-6 py-4 rounded-3xl shadow-xl border border-base-200/50 backdrop-blur-md flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center text-success text-2xl">
              ✓
            </div>
            <div>
              <p className="font-bold text-lg leading-tight">1000+ Pets</p>
              <p className="text-sm text-base-content/60 font-medium">Found forever homes</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}