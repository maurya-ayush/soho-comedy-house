"use client";

import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import { Button } from "@/components/ui/button";

const events = [
  {
    title: "Black Flag",
    date: "13th March · 7:30 PM",
    venue: "Soho Comedy House, 30 Dean Street Bar and Club, Soho, W1D 3RZ, London",
    description:
      "Prepare for a night of dark, twisted, and unfiltered humor as Black Flag Comedy Club takes over Soho Comedy House. Join us on March 13th for an unapologetic opening night Hosted by Dean Helliwell and featuring headliner Pat Smith and London’s sharpest comedic voices.",
    images: ["/images/black-flag-2.jpeg", "/images/black-flag-1.jpeg"],
    ticketLink: "/tickets/b7691fb2-33ba-4151-a6b0-262a4833d7bf",
    featured: true,
  },
  {
    title: "F* Buddies",
    date: "29th January || 6th, 13th, 26th February  · 7:30 PM",
    venue: "Soho Comedy House, 30 Dean Street Bar and Club, Soho, W1D 3RZ, London",
    description:
      "A high-energy night of sharp jokes and big laughs as F Buddies bring their funniest, boldest comedy to Soho Comedy House. Expect smart humour, great chemistry, and nonstop fun 😂🎤",
    images: ["/images/buddy-1.jpeg"],
    ticketLink: "/tickets",
    featured: true,
  },
  {
    title: "Comedy Replase SOHO - Sunday Night Comedy",
    date: "Every Sunday · 7:30 PM",
    venue: "Soho Comedy House, 30 Dean Street Bar and Club, Soho, W1D 3RZ, London",
    description:
      "An intimate weekly comedy experience with seasoned comedians in a relaxed sit-down format.",
    images: ["/images/sunday-1.jpeg"],
    ticketLink: "/tickets?day=Sunday",
    featured: true,
  },
  {
    title: "Monday Night Sit-Down Comedy",
    date: "Every Monday · 7:30 PM",
    venue: "Soho Comedy House, 30 Dean Street Bar and Club, Soho, W1D 3RZ, London",
    description:
      "An intimate weekly comedy experience with seasoned comedians in a relaxed sit-down format.",
    images: ["/images/monday-1.jpeg"],
    ticketLink: "/tickets?day=Monday",
    featured: false,
  },
];

export default function EventsSection() {
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <>
      {lightboxImages && (
        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          setIndex={setLightboxIndex}
          onClose={() => setLightboxImages(null)}
        />
      )}
      <main className="bg-background text-foreground">
        {/* Hero */}
        <section className="pt-28 pb-20 text-center px-4">
          <h1 className="text-4xl sm:text-6xl font-special-elite font-bold mb-4">
            Events at Soho Comedy House
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            From headline comedy nights to intimate weekly shows — explore
            what’s coming up.
          </p>
        </section>

        {/* Events */}
        <section className="max-w-7xl mx-auto px-4 pb-24 space-y-20">
          {events.map((event, index) => (
            <div
              key={index}
              className={`grid gap-10 ${
                event.featured
                  ? "md:grid-cols-2 items-center"
                  : "md:grid-cols-[1.2fr_1fr] items-start"
              }`}
            >
              {/* Image Gallery */}
              <div className="grid grid-cols-2 gap-4">
                {event.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/5] overflow-hidden rounded-xl"
                  >
                    <img
                      src={img}
                      alt={event.title}
                      className="object-cover w-full h-full cursor-zoom-in hover:scale-105 transition"
                      onClick={() => {
                        setLightboxImages(event.images);
                        setLightboxIndex(i);
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Content */}
              <div>
                {event.featured && (
                  <span className="inline-block mb-3 text-xs uppercase tracking-widest text-primary">
                    Featured Event
                  </span>
                )}

                <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                  {event.title}
                </h2>

                <p className="text-sm text-foreground/60 mb-2">
                  📅 {event.date}
                </p>
                <p className="text-sm text-foreground/60 mb-4">
                  📍 {event.venue}
                </p>

                <p className="text-foreground/80 mb-6 max-w-xl">
                  {event.description}
                </p>

                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground"
                  onClick={() => (window.location.href = event.ticketLink)}
                >
                  Book Tickets
                </Button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
