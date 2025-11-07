import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden bg-linear-to-b from-background dark:from-foreground to-card/30">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 sm:py-0">
        <p className="text-primary text-lg sm:text-base font-semibold uppercase tracking-wider mb-4">Welcome to</p>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-special-elite font-bold mb-6 text-foreground leading-tight">
          Soho Comedy House
        </h1>

        <p className="text-lg sm:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          Experience world-class stand-up comedy in the heart of London's iconic Soho. Where laughter meets excellence,
          night after night.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg px-8"
            onClick={() => {
              const section = document.getElementById("shows");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Book Tickets
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary dark:border-primary text-primary dark:text-primary hover:bg-primary/10 dark:hover:bg-primary/10 text-base sm:text-lg px-8 bg-transparent"
            onClick={() => {
              const section = document.getElementById("upcoming-shows");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Learn More
          </Button>
        </div>

        {/* Location badge */}
        <div className="mt-12 inline-block bg-card border border-border rounded-full px-6 py-3">
          <p className="text-sm sm:text-base text-background/70 dark:text-foreground/70">📍 30 Dean Street Bar and Club,</p>
          <p className="text-sm sm:text-base text-background/70 dark:text-foreground/70">Soho, W1D 3RZ, London</p>
        </div>
      </div>
    </section>
  )
}
