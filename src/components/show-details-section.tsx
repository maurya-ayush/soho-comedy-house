"use client";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    CalendarDays,
    Clock,
    MapPin,
    PoundSterling,
    Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import baseURL from "@/lib/baseUrl";
import TicketBookingForm from "@/components/ticket-booking-form";
import BookingConfirmation from "@/components/booking-confirmation";

interface Performance {
    id: string;
    title: string;
    venue: string;
    date: string;
    startTime: string;
    endTime: string;
    price: number;
    performer?: string | null;
    totalSeats: number;
    seatsRemaining: number;
    status?: "upcoming" | "ongoing" | "ended";
}

interface BookingData {
    status: "confirmed" | "waitlisted";
    bookingId: string;
    seatsBooked?: number;
    seatsRequested?: number;
    remainingSeats: number;
}

// Format readable date
const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

// Format 24-hour → 12-hour (e.g., 6:00 PM)
const formatTime = (timeStr: string) => {
    const [hour, minute] = timeStr.split(":");
    const d = new Date();
    d.setHours(parseInt(hour), parseInt(minute));
    return d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });
};

export default function ShowDetailsSection() {
    const { id } = useParams<{ id: string }>();
    const [show, setShow] = useState<Performance | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [bookingConfirmation, setBookingConfirmation] = useState<{
        data: BookingData;
        userName: string;
        userEmail: string;
    } | null>(null);
    const [bookingError, setBookingError] = useState<string | null>(null);

    // Fetch performance details
    const fetchShow = async () => {
        try {
            const res = await fetch(`${baseURL}/api/shows/${id}`);
            const data = await res.json();
            if (data.performance) {
                const perf = data.performance;

                // compute status (ongoing/upcoming/ended)
                const now = new Date();
                const start = new Date(`${perf.date}T${perf.startTime}`);
                const end = new Date(`${perf.date}T${perf.endTime}`);
                let status: "upcoming" | "ongoing" | "ended" = "upcoming";
                if (now >= start && now <= end) status = "ongoing";
                else if (now > end) status = "ended";

                setShow({ ...perf, status });
            } else {
                setError("Event not found");
            }
        } catch (err) {
            console.error("Failed to load show:", err);
            setError("Unable to fetch show details. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShow();
    }, [id]);

    if (!show && !loading && !error) return null;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="text-foreground/70">Loading event details...</p>
            </div>
        );
    }

    if (error || !show) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background">
                <p className="text-destructive text-lg mb-4">
                    Error: {error || "Event not found"}
                </p>
                <Link to="/events">
                    <Button>Back to Events</Button>
                </Link>
            </div>
        );
    }

    const handleBookingSuccess = (
        data: BookingData,
        userName: string,
        userEmail: string
    ) => {
        console.log("✅ Booking Success:", { data, userName, userEmail });
        setBookingConfirmation({
            data,
            userName,
            userEmail,
        });
        setShowBookingForm(false);
    };

    const handleBookingError = (errorMsg: string) => {
        setBookingError(errorMsg);
    };

    return (
        <main
            className="min-h-screen bg-background pt-20 md:pt-28 pb-10 transition-colors bg-linear-to-b from-background to-card"
            style={{ fontFamily: "var(--font-special-elite)" }}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link to="/events" className="inline-block mb-6">
                    <Button variant="outline" className="hover:text-primary bg-transparent">
                        ← Back to Events
                    </Button>
                </Link>

                {/* Show Details Card */}
                <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg">
                    {/* Title */}
                    <h1 className="text-5xl md:text-6xl font-bold text-background dark:text-foreground mb-4">
                        {show.title}
                    </h1>

                    {/* Performer */}
                    {show.performer && (
                        <p className="text-primary font-medium text-lg mb-2">
                            ⭐ Featuring {show.performer}
                        </p>
                    )}

                    {/* Status Badge */}
                    <div className="mb-4">
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

                    <div className="h-1 w-20 bg-primary mb-8" />

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Date */}
                        <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                            <CalendarDays className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Date</p>
                                <p className="text-lg font-semibold text-foreground">
                                    {formatDate(show.date)}
                                </p>
                            </div>
                        </div>

                        {/* Time */}
                        <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                            <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Show Time</p>
                                <p className="text-lg font-semibold text-foreground">
                                    {formatTime(show.startTime)} – {formatTime(show.endTime)}
                                </p>
                            </div>
                        </div>

                        {/* Venue */}
                        <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                            <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Venue</p>
                                <p className="text-lg font-semibold text-foreground">
                                    "30 Dean Street Bar and Club, Soho, W1D 3RZ, London"
                                </p>
                            </div>
                        </div>

                        {/* Seats */}
                        <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                            <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Available Seats</p>
                                <p className="text-lg font-semibold text-foreground">
                                    {show.seatsRemaining} / {show.totalSeats} left
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Price and Buy Button */}
                    <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">Ticket Price</p>
                            <div className="flex items-center gap-2">
                                <PoundSterling className="w-6 h-6 text-primary" />
                                <p className="text-4xl font-bold text-background dark:text-foreground">
                                    {show.price}
                                </p>
                            </div>
                        </div>

                        <Button
                            size="lg"
                            onClick={() => setShowBookingForm(true)}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto"
                            disabled={show.status === "ended" || show.seatsRemaining === 0}
                        >
                            {show.status === "ended"
                                ? "Show Ended"
                                : show.seatsRemaining === 0
                                    ? "Sold Out"
                                    : "Buy Tickets"}
                        </Button>
                    </div>

                    {/* Booking Error */}
                    {bookingError && (
                        <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                            <p className="text-sm text-destructive">{bookingError}</p>
                        </div>
                    )}

                    {/* Additional Info */}
                    <div className="mt-8 p-6 bg-background rounded-lg border border-border">
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                            Important Information
                        </h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>✓ Age Restriction: Strictly 18+</li>
                            <li>✓ Please arrive 30 minutes early to collect your tickets</li>
                            <li>✓ Minimum 1 item per person (drink or water)</li>
                            <li>✓ Photo ID required at entry</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Booking Form Modal */}
            {showBookingForm && (
                <TicketBookingForm
                    showId={id || ""}
                    onClose={() => {
                        setShowBookingForm(false);
                        setBookingError(null);
                    }}
                    onSuccess={(data, userName, userEmail) => {
                        handleBookingSuccess(data, userName, userEmail);
                    }}
                    onError={handleBookingError}
                    baseURL={baseURL}
                />
            )}

            {/* Booking Confirmation Modal */}
            {bookingConfirmation && (
                <BookingConfirmation
                    booking={bookingConfirmation.data}
                    userName={bookingConfirmation.userName}
                    userEmail={bookingConfirmation.userEmail}
                    onClose={() => {
                        setBookingConfirmation(null);
                        fetchShow();
                    }}
                />
            )}
        </main>
    );
}
