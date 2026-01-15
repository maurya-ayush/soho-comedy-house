/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { ShowCard } from "@/components/show-card";
import { Button } from "@/components/ui/button";
import baseURL from "@/lib/baseUrl";
import { useSearchParams } from "react-router-dom";


interface Show {
    id: string;
    title: string;
    description?: string;
    date: string;
    startTime: string;
    endTime: string;
    price: number; // in pounds already (server returns priceCents / 100) — if server returns pence, adapt
    performer?: string | null;
    totalSeats: number;
    seatsRemaining: number;
    status: "upcoming" | "ongoing" | "ended";
    slotNumber?: number | null;
}

const weekdays = [
    { label: "All", value: "All" },
    { label: "Sunday", value: "Sunday" },
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
];

const slots = [
    { label: "All", value: "All" },
    { label: "Show 1", value: "1" },
    { label: "Show 2", value: "2" },
    { label: "Show 3", value: "3" },
];

const statuses = [
    { label: "Upcoming + Ongoing", value: "UPCOMING_ONGOING" },
    { label: "All", value: "All" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Ongoing", value: "ongoing" },
    { label: "Ended", value: "ended" },
];

export default function EventsSection() {
    const [shows, setShows] = useState<Show[]>([]);
    const [status, setStatus] = useState<
        "loading" | "error" | "success" | "empty"
    >("loading");

    // Filters
    const [dayFilter, setDayFilter] = useState<string>("All");
    const [slotFilter, setSlotFilter] = useState<string>("All");
    const [statusFilter, setStatusFilter] = useState<string>("UPCOMING_ONGOING");
    
    // URL search params sync
    const [searchParams, setSearchParams] = useSearchParams();

    // Load initial filters from URL on mount
    useEffect(() => {
        const day = searchParams.get("day");
        const slot = searchParams.get("slot");
        const stat = searchParams.get("status");
        if (day) setDayFilter(day);
        if (slot) setSlotFilter(slot);
        if (stat) setStatusFilter(stat);
    }, []);

    useEffect(() => {
        const params: any = {};
        if (dayFilter !== "All") params.day = dayFilter;
        if (slotFilter !== "All") params.slot = slotFilter;
        if (statusFilter !== "UPCOMING_ONGOING") params.status = statusFilter;
        setSearchParams(params);
    }, [dayFilter, slotFilter, statusFilter]);


    const fetchShows = async () => {
        try {
            setStatus("loading");
            const res = await fetch(`${baseURL}/api/shows`);
            if (!res.ok) throw new Error("Failed to fetch shows");
            const data = await res.json();

            // The backend returns data.performances (array). Normalize expected fields.
            const raw = data.performances ?? [];

            // Map/normalize each performance into the Show interface expected by the frontend.
            const normalized: Show[] = raw.map((p: any) => {
                // backend earlier returned price in cents / we previously divided by 100 in route
                // But to be safe, if price is in cents, convert:
                const price =
                    typeof p.price === "number"
                        ? p.price
                        : typeof p.priceCents === "number"
                            ? p.priceCents / 100
                            : p.price_cents
                                ? p.price_cents / 100
                                : 0;

                return {
                    id: p.id,
                    title: p.title,
                    description: p.description || "",
                    date: p.date,
                    startTime: p.startTime ?? p.start_time ?? p.start_time ?? (p.start ? p.start : ""),
                    endTime: p.endTime ?? p.end_time ?? p.end_time ?? (p.end ? p.end : ""),
                    price,
                    performer: p.performer ? (typeof p.performer === "string" ? p.performer : p.performer.name ?? null) : null,
                    totalSeats: p.totalSeats ?? p.total_seats ?? p.total_seats ?? 70,
                    seatsRemaining:
                        p.seatsRemaining ?? p.seats_remaining ?? p.seats_remaining ?? 70,
                    status: p.status ?? "upcoming",
                    slotNumber: p.slotNumber ?? p.slot_number ?? null,
                };
            });

            if (!normalized || normalized.length === 0) {
                setShows([]);
                setStatus("empty");
            } else {
                setShows(normalized);
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

    // Derived filtered list
    const filteredShows = useMemo(() => {
        if (status !== "success") return [];

        return shows
            .filter((s) => {
                // Default filter: UPCOMING_ONGOING means include upcoming and ongoing only
                if (statusFilter === "UPCOMING_ONGOING") {
                    if (s.status === "ended") return false;
                } else if (statusFilter !== "All") {
                    // Specific status chosen
                    if (s.status !== statusFilter) return false;
                }

                // Day filter
                if (dayFilter !== "All") {
                    const d = s.date.includes("T") ? new Date(s.date) : new Date(`${s.date}T00:00:00Z`);
                    // Calculate weekday in UTC to avoid local timezone offset
                    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    const dow = weekdays[d.getUTCDay()];
                    if (dow !== dayFilter) return false;
                }

                // Slot filter (compare numeric if available)
                if (slotFilter !== "All") {
                    let slot = s.slotNumber;

                    // Infer slot if missing — based on your venue’s schedule
                    // (these match your fixed time slots)
                    if (!slot && s.startTime) {
                        const start = s.startTime.replace(":00:00", ":00");
                        if (start.startsWith("4:30") || start.startsWith("16:30")) slot = 1;
                        else if (start.startsWith("6:00") || start.startsWith("18:00")) slot = 1;
                        else if (start.startsWith("5:00") || start.startsWith("17:00")) slot = 1;
                        else if (start.startsWith("7:00") || start.startsWith("19:00")) slot = 2;
                        else if (start.startsWith("7:30") || start.startsWith("19:30")) slot = 2;
                        else if (start.startsWith("8:30") || start.startsWith("20:30")) slot = 2;
                        else if (start.startsWith("9:30") || start.startsWith("21:30")) slot = 3;
                    }

                    // Only keep the ones that match the selected slot number
                    if (String(slot) !== slotFilter) return false;
                }

                return true;
            })
            // sort by date then startTime
            .sort((a, b) => {
                if (a.date !== b.date) return new Date(a.date).getTime() - new Date(b.date).getTime();
                // compare start times "HH:MM:SS" or "HH:MM"
                return (a.startTime || "").localeCompare(b.startTime || "");
            });
    }, [shows, dayFilter, slotFilter, statusFilter, status]);

    const sectionBase =
        "min-h-screen bg-background border-t border-border flex flex-col items-center overflow-hidden pt-32 md:pt-40 pb-16 transition-colors bg-linear-to-b from-background to-card";

    if (status === "loading") {
        return (
            <section className={`${sectionBase} flex items-center justify-center`}>
                <div className="animate-pulse text-center">
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
            <section className={`${sectionBase} items-center justify-center text-center`}>
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
            <section className={`${sectionBase} bg-gradient-to-b from-background to-card`}>
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
                    It looks like there are no events listed right now. Check back soon for
                    new comedy nights!
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
        <section className={sectionBase}>
            <div className="text-center mb-6 px-4">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-wide">
                    ALL EVENTS
                </h1>
                <div className="h-1 w-20 bg-primary mx-auto mb-4" />
                <p className="text-foreground/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                    Discover all upcoming shows and comedy nights at Soho Comedy House
                </p>
            </div>

            {/* FILTER TOOLBAR */}
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="bg-card border border-border rounded-xl p-4">
                    {/* Stacked on small screens, inline on md+ */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Left: filters (stacked on mobile) */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            {/* Day */}
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-background dark:text-foreground font-medium mr-2">Day:</label>
                                <select
                                    value={dayFilter}
                                    onChange={(e) => setDayFilter(e.target.value)}
                                    className="px-3 py-2 border rounded-md bg-background"
                                >
                                    {weekdays.map((d) => (
                                        <option key={d.value} value={d.value}>
                                            {d.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Slot */}
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-background dark:text-foreground font-medium mr-2">Show:</label>
                                <select
                                    value={slotFilter}
                                    onChange={(e) => setSlotFilter(e.target.value)}
                                    className="px-3 py-2 border rounded-md bg-background"
                                >
                                    {slots.map((s) => (
                                        <option key={s.value} value={s.value}>
                                            {s.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-background dark:text-foreground font-medium mr-2">Status:</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-3 py-2 border rounded-md bg-background"
                                >
                                    {statuses.map((s) => (
                                        <option key={s.value} value={s.value}>
                                            {s.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Right: actions */}
                        <div className="flex items-center gap-3 justify-end">
                            <Button
                                onClick={() => {
                                    // reset filters
                                    setDayFilter("All");
                                    setSlotFilter("All");
                                    setStatusFilter("UPCOMING_ONGOING");
                                }}
                                variant="outline"
                                className="text-primary border-primary hover:bg-primary/10"
                            >
                                Reset Filters
                            </Button>

                            <Button
                                onClick={() => {
                                    setStatus("loading");
                                    fetchShows();
                                }}
                                className="bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                Refresh
                            </Button>
                        </div>
                    </div>
                </div>
                {/* RESULTS COUNT */}
                <div className="text-center mt-4">
                    <span className="inline-block bg-primary/10 border border-primary/20 text-primary text-md font-medium px-3 py-1 rounded-full">
                        🎟️ Showing {filteredShows.length} {filteredShows.length === 1 ? "show" : "shows"}
                    </span>
                </div>
            </div>

            {/* SHOW GRID */}
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredShows.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <p className="text-foreground/70 text-lg">
                            No shows match your filters. Try resetting the filters or change
                            the day/slot selection.
                        </p>
                    </div>
                ) : (
                    filteredShows.map((show) => {
                        // Map performance values to the ShowCard expected props (start/end time formatting happens inside ShowCard)
                        const cardShow = {
                            id: show.id,
                            title: show.title,
                            description: show.description,
                            date: show.date,
                            startTime: show.startTime,
                            endTime: show.endTime,
                            price: "795",
                            performer: show.performer,
                            totalSeats: show.totalSeats,
                            seatsRemaining: show.seatsRemaining,
                            status: show.status,
                        };
                        return <ShowCard key={show.id} show={cardShow as any} />;
                    })
                )}
            </div>
        </section>
    );
}
