"use client";

import { useEffect, useState } from "react";
import { ShowCard } from "@/components/show-card";
import { Button } from "@/components/ui/button";
import baseURL from "@/lib/baseUrl";

interface Show {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    price: number;
    total_seats: number;
}

export default function EventsSection() {
    const [shows, setShows] = useState<Show[]>([]);
    const [status, setStatus] = useState<
        "loading" | "error" | "success" | "empty"
    >("loading");

    const fetchShows = async () => {
        try {
            const res = await fetch(`${baseURL}/api/shows`);
            if (!res.ok) throw new Error("Failed to fetch shows");
            const data = await res.json();
            if (!data.shows || data.shows.length === 0) {
                setStatus("empty");
            } else {
                setShows(data.shows);
                setStatus("success");
            }
        } catch (err) {
            console.error("Error fetching shows:", err);
            setStatus("error");
        }
    };

    useEffect(() => {
        fetchShows();
    }, []);

    const sectionBase =
        "min-h-screen flex flex-col items-center justify-center bg-background text-center transition-colors";

    if (status === "loading") {
        return (
            <section className={`${sectionBase}`}>
                <div className="animate-pulse">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Loading Events...
                    </h2>
                    <p className="text-foreground/70 text-lg">
                        Fetching the latest comedy shows for you 🎭
                    </p>
                </div>
            </section>
        );
    }

    if (status === "error") {
        return (
            <section className={`${sectionBase}`}>
                <h2 className="text-3xl md:text-4xl font-bold text-destructive mb-3">
                    Oops! Something went wrong
                </h2>
                <p className="text-foreground/70 mb-6">
                    We couldn’t load the events right now. Please try again later.
                </p>
                <Button
                    onClick={fetchShows}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    Retry
                </Button>
            </section>
        );
    }

    if (status === "empty") {
        return (
            <section
                className={`${sectionBase} bg-gradient-to-b from-background to-card`}
            >
                <img
                    src="/no-shows.svg"
                    alt="No shows"
                    className="w-64 h-auto mb-8 opacity-80 dark:opacity-60"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                    No Upcoming Shows
                </h2>
                <p className="text-foreground/70 max-w-md mb-6 text-lg">
                    It looks like there are no events listed right now. Check back soon
                    for new comedy nights!
                </p>
                <Button
                    onClick={fetchShows}
                    variant="outline"
                    className="text-primary border-primary hover:bg-primary/10"
                >
                    Refresh Events
                </Button>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-background border-t border-border flex flex-col items-center overflow-hidden pt-32 md:pt-40 pb-16 transition-colors bg-linear-to-b from-background to-card">
            <div className="text-center mb-12 px-4">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-wide">
                    ALL EVENTS
                </h1>
                <div className="h-1 w-20 bg-primary mx-auto mb-6" />
                <p className="text-foreground/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                    Discover all upcoming shows and comedy nights at Soho Comedy House
                </p>
            </div>

            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {shows.map((show) => (
                    <ShowCard key={show.id} show={show} />
                ))}
            </div>
        </section>
    );
}
