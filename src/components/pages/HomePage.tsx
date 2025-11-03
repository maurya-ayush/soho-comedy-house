import Header from "@/components/header"
import Hero from "@/components/hero"
import Gallery from "@/components/gallery"
import Shows from "@/components/shows"
import About from "@/components/about"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { HomeShowsSection } from "@/components/home-shows-section"


const HomePage = () => {
    return (
        <div className="min-h-screen " style={{ fontFamily: 'var(--font-special-elite)' }}>
        <Header />
        <Hero />
        <Gallery />
        <Shows /> 
        <HomeShowsSection />
        <About />
        <Contact />
        <Footer />
        </div>
    )
}

export default HomePage