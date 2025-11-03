"use client"

import { CalendarDays, Clock, MapPin, PoundSterling } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

interface Show {
    id: string
    title: string
    description: string
    date: string
    time: string
    price: number
    total_seats: number
}

export function ShowCard({ show }: { show: Show }) {
    // Format the date from YYYY-MM-DD to readable format
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    // Convert price from pence to pounds
    const priceInPounds = (show.price / 100).toFixed(2)

    return (
        <div className="group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col justify-between">
            {/* Info */}
            <div>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                        <CalendarDays className="w-4 h-4" />
                        {formatDate(show.date)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-background/70 dark:text-foreground/70">
                        <Clock className="w-4 h-4" />
                        {show.time}
                    </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-background dark:text-foreground group-hover:text-primary transition-colors">
                    {show.title}
                </h3>

                <p className="text-background/70 dark:text-foreground/70 mb-2">{show.description}</p>

                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-background/80 dark:text-foreground/80">
                        <MapPin className="w-4 h-4 text-primary" />
                        Soho Comedy House, Dean Street
                    </div>
                    <div className="flex items-center gap-2 text-background/80 dark:text-foreground/80">
                        <PoundSterling className="w-4 h-4 text-primary" />
                        Ticket Price: <span className="font-semibold ml-1">£{priceInPounds}</span>
                    </div>
                    <div className="flex items-center gap-2 text-background/80 dark:text-foreground/80">
                        <span className="text-primary font-bold">Seats:</span> {show.total_seats} available
                    </div>
                </div>
            </div>

            {/* Button */}
            <div className="mt-6">
                <Link to={`/events/${show.id}`}>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    )
}
