import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Contact from "@/components/contact"
import Footer from "@/components/footer"


const LandingPage = () => {
    return (
        <div className="min-h-screen " style={{ fontFamily: 'var(--font-special-elite)' }}>
        <Header />
        <Hero />
        <About />
        <Contact />
        <Footer />
        </div>
    )
}

export default LandingPage