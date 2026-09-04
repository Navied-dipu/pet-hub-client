"use client";
import { motion } from "framer-motion";

const reasons = [
    { emoji: "❤️", title: "Save a Life", desc: "Every adoption gives a shelter animal a second chance at happiness." },
    { emoji: "🏡", title: "Gain a Best Friend", desc: "Adopted pets form an incredibly deep bond with their new family." },
    { emoji: "💰", title: "Affordable", desc: "Shelter pets come vaccinated and microchipped — saving you vet costs." },
    { emoji: "🧠", title: "Better Mental Health", desc: "Pet owners report lower stress and a stronger sense of daily purpose." },
    { emoji: "🌍", title: "Fight Overpopulation", desc: "Adopting helps break the cycle of animal overpopulation and suffering." },
    { emoji: "👨‍👩‍👧", title: "Great for Families", desc: "Pets teach children empathy, responsibility, and unconditional love." },
];

export default function WhyAdopt() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <section className="bg-base-200/30 py-24 px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute bottom-0 right-0 -z-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>
            
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="inline-block bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                        Why Adopt
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-base-content mb-4">
                        Adopt Instead of Buy
                    </h2>
                    <p className="text-lg text-base-content/70">
                        The rewards go far beyond giving a pet a home — it transforms your life too.
                    </p>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {reasons.map((r) => (
                        <motion.div
                            variants={cardVariants}
                            key={r.title}
                            whileHover={{ y: -8 }}
                            className="bg-base-100/80 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-xl shadow-base-200/50 hover:border-secondary/30 transition-colors"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-base-200 to-base-100 flex items-center justify-center text-4xl shadow-inner mb-6">
                                {r.emoji}
                            </div>
                            <h3 className="text-xl font-extrabold text-base-content mb-3">{r.title}</h3>
                            <p className="text-base-content/70 leading-relaxed font-medium">{r.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}