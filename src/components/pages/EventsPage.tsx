"use client"
import Header from "@/components/header"
import EventsSection from "@/components/events"
import Footer from "@/components/footer"

const EventsPage = () => {
    return (
        <div className="min-h-screen" style={{ fontFamily: 'var(--font-special-elite)' }}>
            <Header />
            <EventsSection />
            <Footer />
        </div>
    )
}

export default EventsPage