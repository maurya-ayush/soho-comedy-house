"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CalendarDays, Clock, MapPin, PoundSterling, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import baseURL from "@/lib/baseUrl"

interface Show {
    id: string
    title: string
    description: string
    date: string
    time: string
    price: number
    total_seats: number
}

export default function ShowDetailsSection() {
    const { showId } = useParams()
    const [show, setShow] = useState<Show | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchShow = async () => {
            try {
                const res = await fetch(`${baseURL}/api/shows/${showId}`)
                if (!res.ok) throw new Error("Failed to load show details")
                const data = await res.json()
                setShow(data.show)
            } catch (err) {
                console.log(err)
                setError("Unable to fetch show details. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        fetchShow()
    }, [showId])

    if (!show && !loading && !error) return null

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="text-foreground/70">Loading event details...</p>
            </div>
        )
    }

    if (error || !show) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background">
                <p className="text-destructive text-lg mb-4">Error: {error || "Event not found"}</p>
                <Link to="/events">
                    <Button>Back to Events</Button>
                </Link>
            </div>
        )
    }

    const priceInPounds = (show.price / 100).toFixed(2)

    return (
        <main className="min-h-screen bg-background pt-20 md:pt-28 pb-10 transition-colors bg-linear-to-b from-background to-card" style={{ fontFamily: 'var(--font-special-elite)' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" >
                {/* Back Button */}
                <Link to="/events" className="inline-block mb-6">
                    <Button variant="outline" className="hover:text-primary ">← Back to Events</Button>
                </Link>

                {/* Show Details Card */}
                <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg">
                    {/* Title */}
                    <h1 className="text-5xl md:text-6xl font-bold text-background dark:text-foreground mb-4">{show.title}</h1>

                    <div className="h-1 w-20 bg-primary mb-8" />

                    {/* Description */}
                    <p className="text-xl text-background/80 dark:text-foreground/80 mb-8 leading-relaxed">{show.description}</p>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Date */}
                        <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                            <CalendarDays className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Date</p>
                                <p className="text-lg font-semibold text-foreground">{formatDate(show.date)}</p>
                            </div>
                        </div>

                        {/* Time */}
                        <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                            <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Start Time</p>
                                <p className="text-lg font-semibold text-foreground">{show.time}</p>
                            </div>
                        </div>

                        {/* Venue */}
                        <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                            <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Venue</p>
                                <p className="text-lg font-semibold text-foreground">Soho Comedy House, Dean Street</p>
                            </div>
                        </div>

                        {/* Available Seats */}
                        <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                            <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Available Seats</p>
                                <p className="text-lg font-semibold text-foreground">{show.total_seats}</p>
                            </div>
                        </div>
                    </div>

                    {/* Price and CTA Section */}
                    <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <p className="text-sm text-muted-foreground dark:text-muted-background mb-2">Ticket Price</p>
                            <div className="flex items-center gap-2">
                                <PoundSterling className="w-6 h-6 text-primary" />
                                <p className="text-4xl font-bold text-background dark:text-foreground">{priceInPounds}</p>
                            </div>
                        </div>
                        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto">
                            Buy Tickets
                        </Button>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 p-6 bg-background rounded-lg border border-border">
                        <h3 className="text-lg font-semibold text-foreground mb-3">Important Information</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>✓ Age Restriction: Strictly 18+</li>
                            <li>✓ Please arrive 30 minutes early to collect your tickets</li>
                            <li>✓ Minimum 1 item per person (drink or water)</li>
                            <li>✓ Photo ID required at entry</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}
