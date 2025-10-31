import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useTheme } from "@/components/theme-provider"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()

  // Dynamic logo based on theme
  const logoSrc = theme === "dark" ? "/logo-light.png" : "/logo-dark.png"

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-1 flex items-center justify-between">
        {/* Left Section: Logo + Title */}
        <div className="flex items-center gap-3 flex-1">
          <img
            src={logoSrc}
            alt="Soho Comedy House Logo"
            className="h-12 w-auto transition-opacity duration-300"
          />
          <h1 className="hidden md:block text-2xl sm:text-3xl font-special-elite font-bold text-primary whitespace-nowrap">
            Soho Comedy House
          </h1>
          <img
            src="/comic.png"
            alt="Comedian Silhouette"
            className="h-14 w-auto"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-lg text-foreground hover:text-primary transition-colors">
            About
          </a>
          <a href="#contact" className="text-lg text-foreground hover:text-primary transition-colors">
            Contact
          </a>
          <Button className=" text-lg items-center bg-primary text-primary-foreground hover:bg-primary/90">Book Now</Button>

          {/* 👇 Mode Toggle Button */}
          <ModeToggle />
        </div>

        {/* Mobile Menu Button + Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          {/* 👇 Mode toggle on mobile (beside menu button) */}
          <ModeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-md hover:bg-muted transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <div className="px-4 py-4 space-y-4">
            <a href="#about" className="block text-background dark:text-foreground/70 hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="block text-background dark:text-foreground/70 hover:text-primary transition-colors">
              Contact
            </a>
            <Button className="w-full bg-primary text-primary-background hover:bg-primary/90">Book Now</Button>
          </div>
        </div>
      )}
    </header>
  )
}
