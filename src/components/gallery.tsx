"use client"

import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useRef } from "react"

const images = [
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
    "/gallery5.jpg",
    "/gallery6.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
    "/gallery5.jpg",
    "/gallery6.jpg",
]

export default function Gallery() {
    const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }))
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: "start", skipSnaps: false },
        [autoplay.current]
    )

    useEffect(() => {
        if (emblaApi) emblaApi.reInit()
    }, [emblaApi])

    return (
        <section id="gallery" className="relative py-10 ">
        {/* Section Title */}
        <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-special-elite font-bold text-foreground mb-4">
            Moments of Laughter
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto" />
            <p className="mt-4 text-foreground/70 max-w-2xl mx-auto text-lg">
            A glimpse into the electric atmosphere and unforgettable nights at Soho Comedy House.
            </p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
            {images.map((src, index) => (
                <div
                key={index}
                className="flex-[0_0_80%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] px-3"
                >
                <div className="relative overflow-hidden rounded-xl border border-border shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300">
                    <img
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-72 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <p className="text-white text-lg font-semibold">#SohoComedyHouse</p>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    )
}
