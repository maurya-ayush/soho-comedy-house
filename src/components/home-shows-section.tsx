"use client"

import { useEffect, useState } from "react"
import { ShowCard } from "@/components/show-card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
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

export function HomeShowsSection() {
    const [shows, setShows] = useState<Show[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchShows = async () => {
            try {
                const response = await fetch(`${baseURL}/api/shows`)
                if (response.ok) {
                    const data = await response.json()
                    setShows(data.shows.slice(0, 2))
                }
            } catch (err) {
                console.error("Error fetching shows:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchShows()
    }, [])

    if (loading) {
        return (
            <section className="py-16 bg-background border-t border-border text-center">
                <p className="text-foreground/70">Loading events...</p>
            </section>
        )
    }

    return (
        <section id="upcoming-shows" className="py-16 bg-background border-t border-border transition-colors">
            <div className="text-center mb-12 px-4">
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">UPCOMING SHOWS</h2>
                <div className="h-1 w-20 bg-primary mx-auto mb-4" />
                <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
                    Catch the latest comedy nights at Soho Comedy House
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2 mb-8">
                {shows.map((show) => (
                    <ShowCard key={show.id} show={show} />
                ))}
            </div>

            <div className="text-center">
                <Link to="/events">
                    <Button size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/10">
                        View All Events
                    </Button>
                </Link>
            </div>
        </section>
    )
}
