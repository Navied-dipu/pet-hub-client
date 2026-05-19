const tips = [
    { emoji: "🦴", pet: "Dogs", title: "Feed on a Schedule", desc: "Feed adult dogs twice daily at consistent times to support digestion and avoid overeating." },
    { emoji: "🚶", pet: "Dogs", title: "Daily Walks", desc: "Most dogs need 30–60 min of exercise daily to prevent obesity and anxiety." },
    { emoji: "💧", pet: "Cats", title: "Fresh Water Daily", desc: "Keep a clean water bowl — or a flowing fountain — to keep cats hydrated and healthy." },
    { emoji: "🧸", pet: "Cats", title: "Enrich Their Space", desc: "Use puzzle feeders, climbing trees, and rotating toys to prevent boredom." },
    { emoji: "🥬", pet: "Rabbits", title: "Hay is Their Diet", desc: "Unlimited fresh timothy hay should make up 80% of a rabbit's daily diet." },
    { emoji: "🗣️", pet: "Birds", title: "Talk to Them Daily", desc: "Social birds need daily interaction to prevent depression and feather plucking." },
];

export default function PetCareTips() {
    return (
        <section className="bg-yellow-50 py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                        🌿 Care Guides
                    </span>
                    <h2 className="mt-4 text-4xl font-black text-gray-900">
                        Pet Care Tips
                    </h2>
                    <p className="mt-3 text-gray-600 max-w-md mx-auto">
                        Everything you need to give your new companion the happiest, healthiest life.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tips.map((tip) => (
                        <div
                            key={tip.title}
                            className="bg-white rounded-2xl p-6 border border-yellow-100 hover:-translate-y-1 hover:shadow-lg transition-all"
                        >
                            <div className="flex items-start justify-between">
                                <span className="text-4xl">{tip.emoji}</span>
                                <span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full">
                                    {tip.pet}
                                </span>
                            </div>
                            <h3 className="mt-3 text-lg font-bold text-gray-900">{tip.title}</h3>
                            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{tip.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}