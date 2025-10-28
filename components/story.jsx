export default function Story() {
  return (
    <section id="our-story" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 bg-secondary/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight">From Hive to Heart</h2>
          <p className="mt-4 md:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            At The Golden Hive, we steward the ancient craft of beekeeping with gentle hands and patient hearts. Our
            honey is gathered in small batches, filtered by time and sunlight, preserving the floral whispers of every
            season.
          </p>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Each jar is a keepsake of place—wildflower meadows, clover fields, valleys of acacia—bottled with care to
            bring a golden glimmer to your table.
          </p>
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4">
            <a 
              href="/shop" 
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Explore Our Collection
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center rounded-lg border-2 px-6 py-3 text-base font-medium hover:bg-secondary transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
            <iframe
              className="w-full h-full object-cover"
              src="https://www.youtube.com/embed/Cz7MKeQktvo?si=9OVstjeBKePsrNgy&autoplay=1&mute=1&loop=1&playlist=Cz7MKeQktvo&controls=0&showinfo=0&rel=0&modestbranding=1"
              title="Thaenveedu Forest Honey - Our Story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
