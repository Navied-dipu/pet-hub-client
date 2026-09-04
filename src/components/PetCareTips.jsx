"use client";
import { motion } from "framer-motion";

const tips = [
    { emoji: "🦴", pet: "Dogs", title: "Feed on a Schedule", desc: "Feed adult dogs twice daily at consistent times to support digestion and avoid overeating." },
    { emoji: "🚶", pet: "Dogs", title: "Daily Walks", desc: "Most dogs need 30–60 min of exercise daily to prevent obesity and anxiety." },
    { emoji: "💧", pet: "Cats", title: "Fresh Water Daily", desc: "Keep a clean water bowl — or a flowing fountain — to keep cats hydrated and healthy." },
    { emoji: "🧸", pet: "Cats", title: "Enrich Their Space", desc: "Use puzzle feeders, climbing trees, and rotating toys to prevent boredom." },
    { emoji: "🥬", pet: "Rabbits", title: "Hay is Their Diet", desc: "Unlimited fresh timothy hay should make up 80% of a rabbit's daily diet." },
    { emoji: "🗣️", pet: "Birds", title: "Talk to Them Daily", desc: "Social birds need daily interaction to prevent depression and feather plucking." },
];

export default function PetCareTips() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <section className="bg-base-100 py-24 px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 -z-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                        🌿 Care Guides
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-base-content mb-4">
                        Pet Care Tips
                    </h2>
                    <p className="text-lg text-base-content/70">
                        Everything you need to give your new companion the happiest, healthiest life possible.
                    </p>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {tips.map((tip) => (
                        <motion.div
                            variants={cardVariants}
                            key={tip.title}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="bg-base-100 rounded-3xl p-8 border border-base-200 shadow-xl shadow-base-200/50 hover:border-primary/30 transition-colors"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-base-200/80 flex items-center justify-center text-3xl shadow-inner">
                                    {tip.emoji}
                                </div>
                                <span className="text-xs font-bold bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                                    {tip.pet}
                                </span>
                            </div>
                            <h3 className="text-xl font-extrabold text-base-content mb-3">{tip.title}</h3>
                            <p className="text-base-content/70 leading-relaxed font-medium">{tip.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}