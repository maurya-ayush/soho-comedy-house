"use client";

import { CalendarDays, Clock, MapPin, PoundSterling } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Show {
    id: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    price: number;
    performer?: string | null;
    totalSeats: number;
    seatsRemaining: number;
    status: "upcoming" | "ongoing" | "ended";
}

export function ShowCard({ show }: { show: Show }) {
    // Format date into a readable form
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    // Format time into a readable form
    const formatTime = (timeStr: string) => {
    const [hour, minute] = timeStr.split(":");
    const date = new Date();
    date.setHours(parseInt(hour), parseInt(minute));
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });
    };

    return (
        <div className="relative group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col justify-between">
            {/* Show Info */}
            <div>
                {/* {show.startTime && (
                    <div className="absolute top-3 right-3">
                        <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                            {(() => {
                                const start = show.startTime.replace(":00:00", ":00");
                                if (start.startsWith("4:30") || start.startsWith("16:30")) return "Show 1";
                                if (start.startsWith("5:00") || start.startsWith("17:00")) return "Show 1";
                                if (start.startsWith("6:00") || start.startsWith("18:00")) return "Show 1";
                                if (start.startsWith("7:00") || start.startsWith("19:00")) return "Show 2";
                                if (start.startsWith("7:30") || start.startsWith("19:30")) return "Show 2";
                                if (start.startsWith("8:30") || start.startsWith("20:30")) return "Show 2";
                                if (start.startsWith("9:30") || start.startsWith("21:30")) return "Show 3";
                                return "Show";
                            })()}
                        </span>
                    </div>
                )} */}
                {/* Top Info: Date and Time */}
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                        <CalendarDays className="w-4 h-4" />
                        {formatDate(show.date)}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-background/70 dark:text-foreground/70">
                        <Clock className="w-4 h-4" />
                        {formatTime(show.startTime)} – {formatTime(show.endTime)}
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-2 text-background dark:text-foreground group-hover:text-primary transition-colors">
                    {show.title}
                </h3>

                {/* Performer */}
                {show.performer && (
                    <p className="text-sm text-yellow-500 font-medium mb-2">
                        ⭐ Featuring {show.performer}
                    </p>
                )}

                {/* Venue */}
                <div className="flex items-center gap-2 text-background/80 dark:text-foreground/80 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    30 Dean Street Bar and Club
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 text-background/80 dark:text-foreground/80 mb-2">
                    <PoundSterling className="w-4 h-4 text-primary" />
                    Ticket Price:
                    <span className="font-semibold ml-1">£{show.price}</span>
                </div>

                {/* Seats Remaining */}
                {/* <div className="text-sm text-background/80 dark:text-foreground/80">
                    <span className="text-primary font-bold">Seats:</span>{" "}
                    {show.seatsRemaining} / {show.totalSeats} left
                </div> */}

                {/* Status Badge */}
                <div className="mt-3">
                    {show.status === "ongoing" && (
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-600 text-white rounded-full">
                            🔴 Now Showing
                        </span>
                    )}
                    {show.status === "upcoming" && (
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-500 text-white rounded-full">
                            ⏰ Upcoming
                        </span>
                    )}
                    {show.status === "ended" && (
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-gray-400 text-white rounded-full">
                            ⚫ Ended
                        </span>
                    )}
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
    );
}
