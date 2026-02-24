import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "../header";
import Footer from "../footer";

const comedians = [
    {
        id: 1,
        name: "Buddy The Comic",
        role: "Guest Show",
        image: "/images/buddy-1.jpeg",
        bio: "The face of Soho Comedy. energetic, witty, and always unpredictable.",
        category: "resident"
    },
    {
        id: 2,
        name: "Harry Coombes",
        role: "Regular Headliner",
        image: "/harry-coombes.jpeg",
        bio: "As seen on Live at the Apollo. brutally honest and hilariously sharp.",
        category: "resident"
    },
    {
        id: 3,
        name: "Zak Ranger",
        role: "Regular",
        image: "/zack-ranger.jpeg",
        bio: "London's fastest rising star. dry wit and deadpan delivery.",
        category: "resident"
    },
    {
        id: 4,
        name: "Sorabh Dhir",
        role: "Regular",
        image: "/images/com-1.jpeg",
        bio: "Bringing the best vibes and the loudest laughs.",
        category: "resident"
    },
    {
        id: 5,
        name: "Max Mckenzie",
        role: "Regular",
        image: "/images/com-2.jpeg",
        bio: "Bringing the best vibes and the loudest laughs.",
        category: "resident"
    },
    {
        id: 6,
        name: "Onoje",
        role: "Regular",
        image: "/images/com-3.jpeg",
        bio: "Bringing the best vibes and the loudest laughs.",
        category: "resident"
    },
    {
        id: 7,
        name: "Palm Wine Papi",
        role: "Regular Headliner",
        image: "/images/palmwine-1.jpeg",
        bio: "Bringing the best vibes and the loudest laughs.",
        category: "guest"
    },
];

export default function ComediansPage() {
    const [activeTab, setActiveTab] = useState("all");

    const filteredComedians = activeTab === "all"
        ? comedians
        : comedians.filter(c => c.category === activeTab);

    return (
        <div className="min-h-screen" style={{ fontFamily: 'var(--font-special-elite)' }}>    
            <div className="min-h-screen bg-background flex flex-col">
                <Header />

                <main className="flex-1">
                    {/* Hero Section */}
                    <section className="relative py-20 md:py-32 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background pointer-events-none" />
                        <div className="container mx-auto px-4 text-center relative z-10">
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                                The <span className="text-primary">Talent</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                                Meet the hilarious minds that grace our stage. From our resident hosts to touring legends, this is the Soho Comedy family.
                            </p>
                        </div>
                    </section>

                    {/* Gallery Section */}
                    <section className="container mx-auto px-4 pb-20">

                        {/* Filter Tabs */}
                        <div className="flex justify-center mb-12">
                            <Tabs defaultValue="all" className="w-full max-w-md" onValueChange={setActiveTab}>
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="resident">Residents</TabsTrigger>
                                    <TabsTrigger value="guest">Guests</TabsTrigger>
                                    <TabsTrigger value="hall-of-fame">Legends</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredComedians.map((comedian) => (
                                <div key={comedian.id} className="group relative">
                                    <Card className="overflow-hidden border-0 bg-card/50 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
                                        <div className="aspect-[4/5] relative overflow-hidden">
                                            <img
                                                src={comedian.image}
                                                alt={comedian.name}
                                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300" />

                                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                <Badge variant="secondary" className="mb-2 bg-primary/20 text-primary-foreground hover:bg-primary/30 border-0 backdrop-blur-sm">
                                                    {comedian.role}
                                                </Badge>
                                                <h3 className="text-2xl font-bold text-white mb-1">{comedian.name}</h3>
                                                <p className="text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                    {comedian.bio}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    );
}