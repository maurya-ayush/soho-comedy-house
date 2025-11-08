"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Mail, Ticket, X } from "lucide-react"
import QRCode from "react-qr-code"

interface BookingConfirmationProps {
    booking: {
        status: "confirmed" | "waitlisted"
        bookingId: string
        seatsBooked?: number
        seatsRequested?: number
        remainingSeats: number
    }
    userName: string
    userEmail: string
    onClose: () => void
}

export default function BookingConfirmation({ booking, userName, userEmail, onClose }: BookingConfirmationProps) {
    const isConfirmed = booking.status === "confirmed"
    const seatsCount = isConfirmed ? booking.seatsBooked : booking.seatsRequested

    // Generate QR code for booking validation
    const qrData = `https://api.sohocomedyhouse.com/api/shows/validate/${booking.bookingId}`;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="relative bg-card border border-border rounded-2xl w-full max-w-md shadow-xl flex flex-col max-h-[90vh]">
                <div className="overflow-y-auto p-6 sm:p-8">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Close confirmation"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Status Icon and Title */}
                    <div className="text-center mb-6">
                        {isConfirmed ? (
                            <>
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-background dark:text-foreground">
                                    Booking Confirmed!
                                </h2>
                            </>
                        ) : (
                            <>
                                <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-background dark:text-foreground">
                                    Added to Waitlist
                                </h2>
                            </>
                        )}
                    </div>

                    {/* Main Message */}
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                        <p className="text-background dark:text-foreground text-center">
                            {isConfirmed ? (
                                <>
                                    Email confirmation has been sent to{" "}
                                    <span className="font-semibold text-primary">{userEmail}</span>.
                                    <br />
                                    Tickets are reserved for{" "}
                                    <span className="font-semibold text-primary">{userName}</span> (
                                    {seatsCount} {seatsCount === 1 ? "ticket" : "tickets"}).
                                </>
                            ) : (
                                <>
                                    Your request for{" "}
                                    <span className="font-semibold">{seatsCount}</span> seat
                                    {seatsCount === 1 ? "" : "s"} has been added to the
                                    waitlist.
                                    <br />
                                    We'll notify you at{" "}
                                    <span className="font-semibold">{userEmail}</span> if seats
                                    become available.
                                </>
                            )}
                        </p>
                        <p className="text-sm text-red-400 text-center">
                            Don’t forget to take a screenshot of your Booking ID — just in
                            case the confirmation email doesn’t arrive.
                        </p>
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                            <Ticket className="w-5 h-5 text-primary flex-shrink-0" />
                            <div>
                                <p className="text-xs text-muted-foreground">Booking ID</p>
                                <p className="text-sm font-mono font-semibold text-foreground">
                                    {booking.bookingId}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                            <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Confirmation Sent To
                                </p>
                                <p className="text-sm font-semibold text-foreground">
                                    {userEmail}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center p-2 bg-background rounded-lg border border-border mb-6">
                            <p className="text-xs text-muted-foreground mb-3 font-semibold">
                                Booking ID QR Code
                            </p>
                            <div className="bg-white p-2 rounded-lg">
                                <QRCode
                                    value={qrData}
                                    size={140}
                                    level="M"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-3 text-center">
                                Scan to verify your booking
                            </p>
                        </div>

                        {/* {isConfirmed && (
                            <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Remaining Seats</p>
                                    <p className="text-sm font-semibold text-foreground">{booking.remainingSeats} available</p>
                                </div>
                            </div>
                        )} */}
                    </div>

                    {/* Important Information */}
                    <div className="bg-background border border-border rounded-lg p-4 mb-6">
                        <h3 className="text-sm font-bold text-foreground mb-3">
                            📋 Important Information
                        </h3>
                        <ul className="space-y-2 text-xs text-muted-foreground">
                            <li className="flex gap-2">
                                <span className="text-primary font-bold">•</span>
                                <span>
                                    Don’t forget to take a screenshot of your Booking ID — just
                                    in case the confirmation email doesn’t arrive.
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-primary font-bold">•</span>
                                <span>
                                    Check your email (including spam folder) for confirmation
                                    details
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-primary font-bold">•</span>
                                <span>Age Restriction: Strictly 18+</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-primary font-bold">•</span>
                                <span>
                                    Please arrive 30 minutes early to collect your tickets
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-primary font-bold">•</span>
                                <span>Minimum 1 item per person (drink or water)</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-primary font-bold">•</span>
                                <span>Photo ID required at entry</span>
                            </li>
                            {isConfirmed && (
                                <li className="flex gap-2">
                                    <span className="text-primary font-bold">•</span>
                                    <span>Your booking ID is {booking.bookingId}</span>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Close Button */}
                    <Button
                        onClick={onClose}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}
