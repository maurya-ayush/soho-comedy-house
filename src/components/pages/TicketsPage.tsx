"use client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TicketsSection from "@/components/tickets"

const TicketsPage = () => {
    return (
        <div className="min-h-screen" style={{ fontFamily: 'var(--font-special-elite)' }}>
            <Header />
            <TicketsSection />
            <Footer />
        </div>
    )
}

export default TicketsPage