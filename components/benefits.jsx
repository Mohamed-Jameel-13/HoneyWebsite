const items = [
  {
    title: "Natural Energy Boost",
    desc: "A perfect source of clean, natural energy for your day. Naturally occurring sugars provide sustained vitality.",
    icon: "⚡",
  },
  {
    title: "Rich in Antioxidants",
    desc: "Packed with beneficial compounds to support your overall health. Contains vitamins, minerals, and enzymes.",
    icon: "🍯",
  },
  {
    title: "Soothes & Comforts",
    desc: "A timeless, natural remedy to help soothe coughs and sore throats. Trusted for generations.",
    icon: "🌿",
  },
]

export default function Benefits() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
      <div className="text-center mb-10 md:mb-12">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl">Nature's Golden Benefits</h2>
        <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Pure honey offers more than just sweetness—it's a nutritional powerhouse
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {items.map((b, index) => (
          <div 
            key={b.title} 
            className="group rounded-xl border bg-card p-6 sm:p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{b.icon}</div>
            <h3 className="mt-3 font-serif text-xl sm:text-2xl">{b.title}</h3>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
