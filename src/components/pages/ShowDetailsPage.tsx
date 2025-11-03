import Header from "@/components/header"
import ShowDetailsSection from "../show-details-section"
import Footer from "@/components/footer"

const ShowDetailsPage = () => {
    return (
        <div className="min-h-screen" style={{ fontFamily: 'var(--font-special-elite)' }}>
            <Header />
            <ShowDetailsSection />
            <Footer />
        </div>
    )
}

export default ShowDetailsPage