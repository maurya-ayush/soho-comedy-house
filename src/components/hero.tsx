"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    title: "Monday Night Sit-Down Comedy",
    subtitle:
      "An intimate, hilarious start to your week with seasoned comedians.",
    image: "/monday-sitdown.jpeg", // ← upload poster here
    cta: "Book Monday Tickets",
    link: "/events?day=Monday",
  },
  {
    title: "Palmwine Comedy",
    subtitle: "Live on 28th January · 7:30 PM · Featuring Dane Baptiste",
    image: "/palmwine-comedy.jpeg", // ← upload poster here
    cta: "Book Palmwine Comedy",
    link: "/events/33688a66-8e81-4189-aa18-674f9e6898a7",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100svh] sm:min-h-screen pt-20 flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 md:from-black/80 md:via-black/60 md:to-black/90" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-end md:items-end md:justify-start px-4 sm:px-8 pb-10 md:pb-16">
        <div className="max-w-xl text-center md:text-left">
          <p className="text-primary text-sm uppercase tracking-wider mb-3">
            Live Comedy at Soho Comedy House
          </p>

          <h1 className="text-3xl sm:text-5xl font-special-elite font-bold text-white mb-4">
            {slides[current].title}
          </h1>

          <p className="text-base sm:text-lg text-white/80 mb-6">
            {slides[current].subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground px-6"
              onClick={() => (window.location.href = slides[current].link)}
            >
              {slides[current].cta}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-white/10 px-6 dark:text-amber-50"
              onClick={() => {
                document
                  .getElementById("upcoming-shows")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View All Shows
            </Button>
          </div>

          <div className="mt-6 inline-block bg-white/10 border border-white/20 rounded-full px-5 py-2">
            <p className="text-xs sm:text-sm text-white/80">
              📍 30 Dean Street Bar and Club, Soho, W1D 3RZ, London
            </p>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-primary" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
