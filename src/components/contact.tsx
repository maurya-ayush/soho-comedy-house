"use client"

import { Mail, MapPin, Phone, Instagram } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-10 sm:py-24 bg-card border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-special-elite font-bold mb-4 text-card-foreground">Get In Touch</h2>
          <div className="h-1 w-20 bg-primary mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-special-elite font-bold text-card-foreground mb-6">Contact Information</h3>
            </div>

            <div className="bg-foreground/50 dark:bg-background/50 p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-card-foreground mb-3">Attention All Comedians and Producers</h4>
              <div className="space-y-2 text-md text-card-foreground/70">
                <p>Soho Comedy House is looking for new and aspiring stand-up comedians to get on stage. If you're looking to start your journey in comedy, we want to hear from you.</p>
                <p>Please send an email with your details, any prior experience (it's okay if you have none), and a 5-minute clip if you have one.</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1">Email</h4>
                  <a href="mailto:info@sohocomedyhouse.com" className="text-primary hover:underline">
                    info@sohocomedyhouse.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1">Location</h4>
                  <p className="text-card-foreground/80">
                    30 Dean Street
                    <br />
                    Soho, London
                    <br />
                    W1D 3RZ
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1">Phone</h4>
                  <p className="text-primary hover:underline cursor-pointer">Coming Soon</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Instagram className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1">Instagram</h4>
                  <p className="text-primary hover:underline cursor-pointer">
                    <a 
                      href="https://www.instagram.com/30_dean_street" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      30_dean_street
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-foreground/50 dark:bg-background/50 p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-card-foreground mb-3">Opening Hours</h4>
              <div className="space-y-2 text-sm text-card-foreground/70">
                <p>Monday - Saturday: 4:00 PM - 1:00 AM</p>
                <p>Sunday: 4:00 PM - 12:00 AM</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-background rounded-lg border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.961005064786!2d-0.13252139999999998!3d51.5139314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487605d79201def9%3A0x5db284b6659bc671!2s30%20Dean%20Street%20Bar%20%26%20Club!5e0!3m2!1sen!2sin!4v1761918770369!5m2!1sen!2sin"
              loading="lazy"
              className="w-full h-full rounded-lg"
              style={{ 
                border: 0,
                filter: 'invert(90%) hue-rotate(180deg)'
                }}
              allowFullScreen={true}
              aria-hidden="false"
              tabIndex={0}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
