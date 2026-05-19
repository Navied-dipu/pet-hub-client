const reasons = [
    { emoji: "❤️", title: "Save a Life", desc: "Every adoption gives a shelter animal a second chance at happiness." },
    { emoji: "🏡", title: "Gain a Best Friend", desc: "Adopted pets form an incredibly deep bond with their new family." },
    { emoji: "💰", title: "Affordable", desc: "Shelter pets come vaccinated and microchipped — saving you vet costs." },
    { emoji: "🧠", title: "Better Mental Health", desc: "Pet owners report lower stress and a stronger sense of daily purpose." },
    { emoji: "🌍", title: "Fight Overpopulation", desc: "Adopting helps break the cycle of animal overpopulation and suffering." },
    { emoji: "👨‍👩‍👧", title: "Great for Families", desc: "Pets teach children empathy, responsibility, and unconditional love." },
];

export default function WhyAdopt() {
    return (
        <section className="bg-orange-50 py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <span className="bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                        Why Adopt
                    </span>
                    <h2 className="mt-4 text-4xl font-black text-gray-900">
                        Adopt Instead of Buy
                    </h2>
                    <p className="mt-3 text-gray-600 max-w-md mx-auto">
                        The rewards go far beyond giving a pet a home — it transforms your life too.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reasons.map((r) => (
                        <div
                            key={r.title}
                            className="bg-white rounded-2xl p-6 border border-orange-100 hover:-translate-y-1 hover:shadow-lg transition-all"
                        >
                            <span className="text-4xl">{r.emoji}</span>
                            <h3 className="mt-3 text-lg font-bold text-gray-900">{r.title}</h3>
                            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{r.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}