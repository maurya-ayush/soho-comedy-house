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
              Soho Comedy House is a premier comedy and entertainment venue right in the vibrant heart of Soho. 
            </p>

            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
              Spread across three lively floors, we offer an unforgettable night filled with laughter, live entertainment, and pure Soho energy. 
            </p>

            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
              Whether you're here for an evening of comedy, drinks with friends, or a spontaneous dance, Soho Comedy House guarantees a vibrant atmosphere and memorable experience in London’s iconic entertainment district.
            </p>

            <div className="space-y-3 pt-6">
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl">✓</span>
                <p className="text-foreground/80">Intimate, world-class comedy performances</p>
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
                  <h4 className="font-semibold text-background dark:text-foreground mb-2">Prime Soho Location</h4>
                  <p className="text-sm text-background/70 dark:text-foreground/70">
                    Just minutes from Leicester Square, Piccadilly Circus, Tottenham Court Road, and Oxford Circus stations — right in London’s entertainment heart.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-background dark:text-foreground mb-2">Three Floors of Fun</h4>
                  <p className="text-sm text-background/70 dark:text-foreground/70">
                    Multiple levels open to the public for comedy, drinks, dance, and music.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-background dark:text-foreground mb-2">Free Karaoke All Night</h4>
                  <p className="text-sm text-background/70 dark:text-foreground/70">Sing your heart out or cheer for your friends — every night is a show.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-background dark:text-foreground mb-2">Salsa & DJ Nights</h4>
                  <p className="text-sm text-background/70 dark:text-foreground/70">Move to the rhythm or take over the booth — be your own DJ in Soho’s liveliest spot.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-background dark:text-foreground mb-2">Unforgettable Atmosphere</h4>
                  <p className="text-sm text-background/70 dark:text-foreground/70">An electric blend of comedy, music, and laughter that captures the true spirit of Soho.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
