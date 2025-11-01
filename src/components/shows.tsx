"use client"

import { CalendarDays, Clock, MapPin, User, PoundSterling } from "lucide-react"
import { Button } from "@/components/ui/button"

const shows = [
    {
        date: "Mon - Wed",
        time: "6:00 PM - 10:30 PM",
        performer: "All Shows",
        price: "£4",
        venue: "Soho Comedy House, Dean Street",
        descriptionLine1: "Show 1 (6:00 PM - 8:00 PM)",
        descriptionLine2: "Show 2 (8:30 PM - 10:30 PM).",
        descriptionLine3: "Arriving Time :- Half Hour Early to Collect Tickets.",
    },
    {
        date: "Thur",
        time: "6:00 PM - 10:30 PM",
        performer: "All Shows",
        price: "£5",
        venue: "Soho Comedy House, Dean Street",
        descriptionLine1: "Show 1 (6:00 PM - 8:00 PM).",
        descriptionLine2: "Show 2 (8:30 PM - 10:30 PM).",
        descriptionLine3: "Arriving Time :- Half Hour Early to Collect Tickets.",
    },
    {
        date: "Fri",
        time: "6:00 PM - 10:30 PM",
        performer: "All Shows",
        price: "£8",
        venue: "Soho Comedy House, Dean Street",
        descriptionLine1: "Show 1 (6:00 PM - 8:00 PM).",
        descriptionLine2: "Show 2 (8:30 PM - 10:30 PM).",
        descriptionLine3: "Arriving Time :- Half Hour Early to Collect Tickets.",
    },
    {
        date: "Sat",
        time: "4:30 PM - 11:30 PM",
        performer: "All Shows",
        price: "£8",
        venue: "Soho Comedy House, Dean Street",
        descriptionLine1: "Show 1 (4:30 PM - 6:30 PM)",
        descriptionLine2: "Show 2 (7:00 PM - 9:00 PM).",
        descriptionLine3: "Show 3 (9:30 PM - 11:30 PM). Arriving Time :- Half Hour Early to Collect Tickets.",
    },
    {
        date: "Sun",
        time: "5:00 PM - 9:30 PM",
        performer: "All Shows",
        price: "£4",
        venue: "Soho Comedy House, Dean Street",
        descriptionLine1: "Show 1 (5:00 PM - 7:00 PM)",
        descriptionLine2: "Show 2 (7:30 PM - 9:30 PM).",
        descriptionLine3: "Arriving Time :- Half Hour Early to Collect Tickets.",
    },
]

export default function Shows() {
    return (
        <section id="shows" className="py-20 bg-background border-t border-border bg-linear-to-b from-background to-card/40 overflow-hidden relative">
        {/* Section Heading */}
        <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-special-elite font-bold text-foreground mb-4">
                SHOWTIMES
            </h2>
            <h4 className="text-xl sm:text-3xl font-special-elite font-bold text-foreground mb-4">SOHO</h4>
            <div className="h-1 w-20 bg-primary mx-auto mb-4" />
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Catch your favorite comedians live on stage — laughter, drinks, and an unforgettable evening await.
            </p>
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
                (1 item minimum per person: Food or Drink or bottle of water.)
            </p>
        </div>

        {/* Shows Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {shows.map((show, index) => (
            <div
                key={index}
                className="group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col justify-between"
            >
                {/* Info */}
                <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <CalendarDays className="w-4 h-4" />
                    {show.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-background/70 dark:text-foreground/70">
                    <Clock className="w-4 h-4" />
                    {show.time}
                    </div>
                </div>

                <h3 className="text-2xl font-special-elite font-bold mb-2 text-background dark:text-foreground group-hover:text-primary transition-colors">
                    {show.performer}
                </h3>

                <p className="text-background/70 dark:text-foreground/70 mb-2">{show.descriptionLine1}</p>
                <p className="text-background/70 dark:text-foreground/70 mb-2">{show.descriptionLine2}</p>
                <p className="text-background/70 dark:text-foreground/70 mb-2">{show.descriptionLine3}</p>

                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-background/80 dark:text-foreground/80">
                    <MapPin className="w-4 h-4 text-primary" />
                    {show.venue}
                    </div>
                    <div className="flex items-center gap-2 text-background/80 dark:text-foreground/80">
                    <User className="w-4 h-4 text-primary" />
                    Performer: {show.performer}
                    </div>
                    <div className="flex items-center gap-2 text-background/80 dark:text-foreground/80">
                    <PoundSterling className="w-4 h-4 text-primary" />
                    Ticket Price: <span className="font-semibold ml-1">{show.price}</span>
                    </div>
                </div>
                </div>

                {/* Button */}
                <div className="mt-6">
                <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                >
                    Book Tickets or Buy at Door
                </Button>
                </div>
            </div>
            ))}
        </div>
        </section>
    )
}
