import { Instagram, Mail, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-special-elite font-bold text-card-foreground mb-4">Soho Comedy House</h3>
            <p className="text-sm text-card-foreground/70">
              Soho Comedy House is a premier comedy and entertainment venue right in the vibrant heart of Soho.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-card-foreground/70 hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-card-foreground/70 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <Link to="/tickets" className="text-card-foreground/70 hover:text-primary transition-colors">
                  Book Tickets
                </Link>
              </li>
              <li>
                <a href="https://www.instagram.com/soho_comedy_house/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-card-foreground/70 hover:text-primary transition-colors"
                >
                  Private Events
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Quick */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2 items-start">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <a
                  href="mailto:info@sohocomedyhouse.com"
                  className="text-card-foreground/70 hover:text-primary transition-colors"
                >
                  info@sohocomedyhouse.com
                </a>
              </div>
              <div className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div className="text-card-foreground/70">
                  <p>30 Dean Street Bar and Club</p>
                  <p>SOHO, W1D 3RZ, London</p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <Instagram className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <a
                  href="https://www.instagram.com/soho_comedy_house/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-card-foreground/70 hover:text-primary transition-colors"
                >
                  soho_comedy_house
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-card-foreground/60">
            <p>&copy; 2025 Soho Comedy House. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
