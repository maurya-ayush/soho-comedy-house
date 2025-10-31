"use client"

import { CalendarDays, Clock, MapPin, User, PoundSterling } from "lucide-react"
import { Button } from "@/components/ui/button"

const shows = [
    {
        date: "Fri, Nov 8",
        time: "8:00 PM - 10:30 PM",
        performer: "James Carter & Friends",
        price: "£25",
        venue: "Soho Comedy House, Dean Street",
        description: "A night of high-energy stand-up with London's finest comics and surprise guests.",
    },
    {
        date: "Sat, Nov 9",
        time: "7:30 PM - 10:00 PM",
        performer: "The Late Laugh Show",
        price: "£30",
        venue: "Soho Comedy House, Dean Street",
        description: "Our signature weekend event featuring top acts and headliners from the UK circuit.",
    },
    {
        date: "Sun, Nov 10",
        time: "6:00 PM - 8:30 PM",
        performer: "New Faces Night",
        price: "£15",
        venue: "Soho Comedy House, Dean Street",
        description: "Discover the next generation of rising comedians in a fresh, lively lineup.",
    },
]

export default function Shows() {
    return (
        <section id="shows" className="py-20 bg-background border-t border-border bg-linear-to-b from-background to-card/40 overflow-hidden relative">
        {/* Section Heading */}
        <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-special-elite font-bold text-foreground mb-4">
            Upcoming Shows
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-4" />
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Catch your favorite comedians live on stage — laughter, drinks, and an unforgettable evening await.
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

                <p className="text-background/70 dark:text-foreground/70 mb-4">{show.description}</p>

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
                    Book Tickets
                </Button>
                </div>
            </div>
            ))}
        </div>
        </section>
    )
}
