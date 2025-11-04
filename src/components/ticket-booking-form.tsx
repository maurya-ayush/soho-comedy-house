"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Loader2 } from "lucide-react"

interface BookingFormProps {
    showId: string
    onClose: () => void
    onSuccess: (bookingData: any, userName: string, userEmail: string) => void
    onError: (error: string) => void
    baseURL: string
}

export default function TicketBookingForm({ showId, onClose, onSuccess, onError, baseURL }: BookingFormProps) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [seatsRequestedStr, setSeatsRequestedStr] = useState("1")
    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState("")

    const MIN_SEATS = 1
    const MAX_SEATS = 10
    const MAX_SEATS_PER_BOOKING = 6 // keep your business rule if needed

    const getSeatsRequested = (coerceIfInvalid = true) => {
        const n = Number.parseInt(seatsRequestedStr, 10)
        if (Number.isNaN(n)) return coerceIfInvalid ? MIN_SEATS : null
        return n
    }

    const clampSeats = (n: number) => Math.max(MIN_SEATS, Math.min(MAX_SEATS, n))

    // when the input loses focus, normalize and clamp
    const handleSeatsBlur = () => {
        const parsed = getSeatsRequested(true)!
        setSeatsRequestedStr(String(clampSeats(parsed)))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormError("")

        // Validation
        if (!name.trim()) {
            setFormError("Please enter your name")
            return
        }
        if (!email.trim() || !email.includes("@")) {
            setFormError("Please enter a valid email")
            return
        }

        const seatsRequested = getSeatsRequested(true)!
        if (seatsRequested < MIN_SEATS) {
            setFormError(`Please request at least ${MIN_SEATS} seat${MIN_SEATS === 1 ? "" : "s"}`)
            return
        }
        if (seatsRequested > MAX_SEATS) {
            setFormError(`Maximum allowed is ${MAX_SEATS} seats`)
            return
        }
        if (seatsRequested > MAX_SEATS_PER_BOOKING) {
            setFormError(`You can book up to ${MAX_SEATS_PER_BOOKING} seats at once`)
            return
        }

        setLoading(true)

        try {
            const response = await fetch(`${baseURL}/api/shows/${showId}/book`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    seatsRequested,
                }),
            })

            if (!response.ok) {
                // try to get error message from backend
                let message = "Booking request failed"
                try {
                    const errJson = await response.json()
                    if (errJson?.error) message = errJson.error
                } catch {
                    throw new Error(message)
                }
            }

            const data = await response.json()
            onSuccess(data, name.trim(), email.trim())
            onClose()
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to process booking"
            setFormError(errorMessage)
            onError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-md shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-background dark:text-foreground">Book Your Tickets</h2>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Close form"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Field */}
                    <div>
                        <Label htmlFor="name" className="text-sm font-medium text-background dark:text-foreground mb-2 block">
                            Full Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary disabled:opacity-50"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <Label htmlFor="email" className="text-sm font-medium text-background dark:text-foreground mb-2 block">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary disabled:opacity-50"
                        />
                    </div>

                    {/* Seats Field */}
                    <div>
                        <Label htmlFor="seats" className="text-sm font-medium text-background dark:text-foreground mb-2 block">
                            Number of Seats
                        </Label>
                        <Input
                            id="seats"
                            type="text" // use text to control allowed characters smoothly
                            inputMode="numeric"
                            pattern="[0-9]*"
                            min={MIN_SEATS}
                            max={MAX_SEATS}
                            value={seatsRequestedStr}
                            onChange={(e) => {
                                // allow only digits (or empty) while typing
                                const v = e.target.value
                                if (/^\d*$/.test(v)) {
                                    setSeatsRequestedStr(v)
                                }
                            }}
                            onBlur={handleSeatsBlur}
                            disabled={loading}
                            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary disabled:opacity-50"
                        />
                    </div>

                    {/* Error Message */}
                    {formError && (
                        <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                            <p className="text-sm text-destructive">{formError}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            variant="outline"
                            className="flex-1 bg-transparent text-background dark:text-foreground"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Confirm Booking"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
