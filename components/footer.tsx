"use client"

import { Building2, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    document.querySelectorAll(".scroll-animate").forEach((el) => {
      observer.observe(el)
    })

    // Show scroll to top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <style jsx global>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .scroll-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .nav-item {
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-item:hover {
          transform: translateY(-2px);
          color: #f97316;
        }

        .nav-item::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #f97316, #fb923c);
          transition: width 0.3s ease;
        }

        .nav-item:hover::after {
          width: 100%;
        }

        .floating-element {
          animation: float 3s ease-in-out infinite;
        }

        .floating-element-delayed {
          animation: float 3s ease-in-out infinite 1.5s;
        }

        .floating-element-slow {
          animation: float 4s ease-in-out infinite 2s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .gradient-bg {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          position: relative;
          overflow: hidden;
        }

        .gradient-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(251, 146, 60, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(253, 186, 116, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        .footer-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(45deg, rgba(249, 115, 22, 0.03) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(249, 115, 22, 0.03) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(249, 115, 22, 0.03) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(249, 115, 22, 0.03) 75%);
          background-size: 60px 60px;
          background-position: 0 0, 0 30px, 30px -30px, -30px 0px;
          opacity: 0.5;
          pointer-events: none;
        }

        .social-icon {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .social-icon::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .social-icon:hover::before {
          left: 100%;
        }

        .social-icon:hover {
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 10px 25px rgba(249, 115, 22, 0.3);
        }

        .contact-item {
          transition: all 0.3s ease;
          border-radius: 12px;
          padding: 1rem;
        }

        .contact-item:hover {
          background: rgba(249, 115, 22, 0.1);
          transform: translateX(5px);
        }

        .contact-icon {
          transition: all 0.3s ease;
        }

        .contact-item:hover .contact-icon {
          transform: rotate(10deg) scale(1.1);
          color: #f97316;
        }

        .scroll-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: linear-gradient(135deg, #f97316, #fb923c);
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(249, 115, 22, 0.3);
        }

        .scroll-to-top:hover {
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 8px 30px rgba(249, 115, 22, 0.4);
        }

        .scroll-to-top.hidden {
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px);
        }

        .scroll-to-top.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .brand-glow {
          text-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.5), transparent);
          margin: 2rem 0;
        }

        .footer-wave {
          position: absolute;
          top: -1px;
          left: 0;
          width: 100%;
          height: 60px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%23ffffff'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%23ffffff'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23ffffff'%3E%3C/path%3E%3C/svg%3E") no-repeat;
          background-size: cover;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }

        /* Pulse animation for special elements */
        .pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite alternate;
        }

        @keyframes pulseGlow {
          from {
            box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
          }
          to {
            box-shadow: 0 0 30px rgba(249, 115, 22, 0.6);
          }
        }

        /* Newsletter input styling */
        .newsletter-input {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(249, 115, 22, 0.3);
          color: white;
          transition: all 0.3s ease;
        }

        .newsletter-input:focus {
          background: rgba(255, 255, 255, 0.15);
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.2);
          outline: none;
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .newsletter-button {
          background: linear-gradient(135deg, #f97316, #fb923c);
          transition: all 0.3s ease;
        }

        .newsletter-button:hover {
          background: linear-gradient(135deg, #ea580c, #f97316);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4);
        }
      `}</style>

      <footer className="gradient-bg text-white relative">
        {/* Wave decoration */}
        <div className="footer-wave"></div>

        {/* Background pattern */}
        <div className="footer-pattern"></div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-orange-500/10 rounded-full floating-element"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-orange-400/10 rounded-full floating-element-delayed"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-orange-300/10 rounded-full floating-element-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-orange-600/10 transform rotate-45 floating-element"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 scroll-animate">
              <Link href="/" className="flex items-center space-x-3 mb-6 group">
                <div className="relative">
                  <Building2 className="h-10 w-10 text-orange-500 floating-element pulse-glow" />
                  <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-lg"></div>
                </div>
                <span className="text-3xl font-bold brand-glow group-hover:text-orange-400 transition-colors">
                  BuildCraft
                </span>
              </Link>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Building excellence, one project at a time. Your trusted construction partner for over 15 years,
                delivering quality craftsmanship and innovative solutions.
              </p>

              {/* Newsletter Signup */}
              <div className="mb-6">
                <h4 className="font-semibold text-lg mb-3 text-orange-400">Stay Updated</h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="newsletter-input flex-1 px-4 py-2 rounded-lg"
                  />
                  <button className="newsletter-button px-6 py-2 rounded-lg font-medium">Subscribe</button>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="social-icon bg-slate-700/50 hover:bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="scroll-animate stagger-1">
              <h4 className="font-bold text-xl mb-6 text-orange-400">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "About Us", href: "/about" },
                  { name: "Our Projects", href: "#" },
                  { name: "Testimonials", href: "#" },
                  { name: "Careers", href: "#" },
                  { name: "Blog", href: "#" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="nav-item text-slate-300 hover:text-orange-400 block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="scroll-animate stagger-2">
              <h4 className="font-bold text-xl mb-6 text-orange-400">Services</h4>
              <ul className="space-y-3">
                {[
                  { name: "Design Services", href: "/services" },
                  { name: "Construction", href: "/services" },
                  { name: "House Design", href: "/services" },
                  { name: "Contracting", href: "/services" },
                  { name: "Renovation", href: "/services" },
                  { name: "Consultation", href: "/contact" },
                ].map((service, index) => (
                  <li key={index}>
                    <Link href={service.href} className="nav-item text-slate-300 hover:text-orange-400 block">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="scroll-animate stagger-3">
              <h4 className="font-bold text-xl mb-6 text-orange-400">Get In Touch</h4>
              <div className="space-y-4">
                {[
                  {
                    icon: Phone,
                    title: "Call Us",
                    info: "+1 (555) 123-4567",
                    href: "tel:+15551234567",
                  },
                  {
                    icon: Mail,
                    title: "Email Us",
                    info: "info@buildcraft.com",
                    href: "mailto:info@buildcraft.com",
                  },
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    info: "123 Construction Ave\nBuilding City, BC 12345",
                    href: "#",
                  },
                  {
                    icon: Clock,
                    title: "Business Hours",
                    info: "Mon-Fri: 8AM-6PM\nSat: 9AM-4PM",
                    href: "#",
                  },
                ].map((contact, index) => (
                  <div key={index} className="contact-item group">
                    <div className="flex items-start space-x-3">
                      <div className="contact-icon bg-orange-500/20 p-2 rounded-lg">
                        <contact.icon className="h-5 w-5 text-orange-400" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-white mb-1">{contact.title}</h5>
                        <p className="text-slate-300 text-sm whitespace-pre-line">{contact.info}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="divider"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 scroll-animate">
            <div className="text-slate-400 text-center md:text-left">
              <p>&copy; 2025 BuildCraft. All rights reserved.</p>
              <p className="text-sm mt-1">Excellence in Construction</p>
            </div>

            <div className="flex space-x-6 text-sm">
              <Link href="#" className="nav-item text-slate-400 hover:text-orange-400">
                Privacy Policy
              </Link>
              <Link href="#" className="nav-item text-slate-400 hover:text-orange-400">
                Terms of Service
              </Link>
              <Link href="#" className="nav-item text-slate-400 hover:text-orange-400">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`scroll-to-top ${showScrollTop ? "visible" : "hidden"}`}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      </footer>
    </>
  )
}
