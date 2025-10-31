export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-special-elite font-bold mb-4 text-foreground">About Our Venue</h2>
          <div className="h-1 w-20 bg-primary mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
              Soho Comedy House is a premier comedy venue combining the best of Comedy Cellar's legendary lineage with
              the exclusive charm of The Top Secret Comedy Club.
            </p>

            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
              Located in the vibrant heart of Soho, our intimate venue hosts the finest stand-up comedians from around
              the world. Whether you're a comedy enthusiast or a first-time visitor, we promise an unforgettable evening
              filled with laughter.
            </p>

            <div className="space-y-3 pt-6">
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl">✓</span>
                <p className="text-foreground/80">Intimate, world-class comedy performances</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl">✓</span>
                <p className="text-foreground/80">Premium venue in central London</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl">✓</span>
                <p className="text-foreground/80">Full bar with curated beverage selection</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl">✓</span>
                <p className="text-foreground/80">Private events & group bookings available</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-8 border border-border/50">
            <div className="space-y-6">
              <h3 className="text-2xl font-special-elite font-bold text-primary">Why Choose Us?</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-background dark:text-foreground mb-2">Legendary Talent</h4>
                  <p className="text-sm text-background/70 dark:text-foreground/70">
                    Top international comedians perform regularly at our venue
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-background dark:text-foreground mb-2">Intimate Atmosphere</h4>
                  <p className="text-sm text-background/70 dark:text-foreground/70">
                    Perfect sightlines and acoustics for every seat in the house
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-background dark:text-foreground mb-2">Soho Heritage</h4>
                  <p className="text-sm text-background/70 dark:text-foreground/70">Located in London's most iconic entertainment district</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
