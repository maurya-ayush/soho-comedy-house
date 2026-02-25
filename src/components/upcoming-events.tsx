"use client"

import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const weeklyEvents = [
    {
        title: "Black Flag",
        schedule: "13th March · 7:30 PM",
        description: "Prepare for a night of dark, twisted, and unfiltered humor as Black Flag Comedy Club takes over Soho Comedy House. Join us on March 13th for an unapologetic opening night Hosted by Dean Helliwell and featuring headliner Pat Smith and London’s sharpest comedic voices.",
        buttonText: "Reserve a Seat",
        image: "/images/black-flag-2.jpeg" // Using image from your gallery context
    },
    {
        title: "F* Buddies",
        schedule: "26th February  · 7:30 PM",
        description: "A high-energy night of sharp jokes and big laughs as F Buddies bring their funniest, boldest comedy to Soho Comedy House. Expect smart humour, great chemistry, and nonstop fun 😂🎤",
        buttonText: "View Lineup",
        image: "/images/buddy-1.jpeg" // Using image from your gallery context
    },
    {
        title: "Comedy Replase SOHO - Sunday Night Comedy",
        schedule: "Every Sunday · 7:30 PM",
        description: "An intimate weekly comedy experience with seasoned comedians in a relaxed sit-down format.",
        buttonText: "View Event",
        image: "/images/sunday-1.jpeg" // Using image from your gallery context
    }
]

export default function UpcomingEvents() {
    return (
        <section id="upcoming-events" className="relative py-16 bg-background border-t border-border transition-colors">
            {/* Section Title */}
            <div className="text-center mb-12 px-4">
                <h2 className="text-4xl sm:text-5xl font-special-elite font-bold text-foreground mb-4">
                    UPCOMING EVENTS
                </h2>
                <div className="h-1 w-20 bg-primary mx-auto mb-4" />
                <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
                    The laughs never stop. Check out our recurring weekly nights at Soho Comedy House.
                </p>
            </div>

            {/* Events Grid (Expanded to 3 columns on large screens) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {weeklyEvents.map((event, index) => (
                    <Link to="/events" key={index} className="group block h-full outline-none">
                        <article
                            className="bg-card border border-border relative overflow-hidden flex flex-col rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full"
                        >
                            {/* Photo Section - Kept the tall portrait formatting */}
                            <div className="w-full h-[350px] sm:h-[450px] relative overflow-hidden bg-muted">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                            </div>

                            {/* Content Section */}
                            <div className="flex flex-col flex-grow p-8 text-center items-center justify-center relative z-10">
                                <h3 className="text-2xl font-bold text-foreground mb-2 uppercase leading-tight group-hover:-skew-x-2 transition-transform duration-200">
                                    {event.title}
                                </h3>

                                <div className="font-bold tracking-widest text-sm mb-6 border-b border-border pb-2 inline-block text-primary">
                                    {event.schedule}
                                </div>

                                <p className="text-foreground/70 mb-8 flex-grow">
                                    {event.description}
                                </p>

                                <Button
                                    className="w-full uppercase font-bold transition-all duration-300 pointer-events-none"
                                    variant="default"
                                    size="lg"
                                >
                                    {event.buttonText}
                                </Button>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    )
}