"use client"

import { Building2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function Header() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoaded(true)

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <style jsx global>{`
        .nav-item {
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-item:hover {
          transform: translateY(-2px);
        }

        .nav-item.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: #f97316;
          border-radius: 1px;
        }

        .hero-text {
          animation: fadeInUp 1s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .floating-element {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .button-hover {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .button-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .button-hover:hover::before {
          left: 100%;
        }

        .button-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .mobile-menu {
          background-color: rgb(15 23 42) !important;
          background: rgb(15 23 42) !important;
          backdrop-filter: none !important;
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
          position: fixed !important;
          top: 0 !important;
          right: 0 !important;
          height: 100vh !important;
          z-index: 9999 !important;
        }

        .mobile-menu * {
          background-color: inherit !important;
        }

        .mobile-menu::before,
        .mobile-menu::after {
          display: none !important;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-menu-overlay {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
        }

        .mobile-menu-overlay.open {
          opacity: 1;
          visibility: visible;
        }

        .mobile-nav-item {
          transition: all 0.3s ease;
          transform: translateX(20px);
          opacity: 0;
        }

        .mobile-nav-item.animate {
          transform: translateX(0);
          opacity: 1;
        }

        .hamburger-line {
          transition: all 0.3s ease;
        }

        .hamburger-open .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .hamburger-open .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .hamburger-open .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }
      `}</style>

      <header
        className={`bg-slate-900 text-white fixed w-full top-0 z-50 transition-all duration-300 shadow-lg ${
          scrollY > 50 ? "bg-slate-900/98 backdrop-blur-sm" : "bg-slate-900"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className={`flex items-center space-x-2 ${isLoaded ? "hero-text" : "opacity-0"}`}>
              <Building2 className="h-8 w-8 text-orange-500 floating-element" />
              <span className="text-2xl font-bold">BuildCraft</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-item hover:text-orange-500 transition-colors ${
                    pathname === item.href ? "active text-orange-500" : ""
                  } ${isLoaded ? "hero-text" : "opacity-0"}`}
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Get Quote Button */}
            <Link href="/contact" className="hidden md:block">
              <Button
                className={`bg-orange-500 hover:bg-orange-600 button-hover ${isLoaded ? "hero-text" : "opacity-0"}`}
                style={{ animationDelay: "1.3s" }}
              >
                Get Quote
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors ${
                isLoaded ? "hero-text" : "opacity-0"
              }`}
              style={{ animationDelay: "1.3s" }}
              aria-label="Toggle mobile menu"
            >
              <div
                className={`w-6 h-6 flex flex-col justify-center items-center space-y-1 ${isMobileMenuOpen ? "hamburger-open" : ""}`}
              >
                <div className="w-5 h-0.5 bg-white hamburger-line"></div>
                <div className="w-5 h-0.5 bg-white hamburger-line"></div>
                <div className="w-5 h-0.5 bg-white hamburger-line"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`mobile-menu-overlay fixed inset-0 bg-black/50 z-40 md:hidden ${isMobileMenuOpen ? "open" : ""}`}
          onClick={closeMobileMenu}
        />

        {/* Mobile Menu */}
        <div
          className={`mobile-menu fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 md:hidden ${
            isMobileMenuOpen ? "open" : ""
          }`}
          style={{
            backgroundColor: "rgb(15, 23, 42)",
            background: "rgb(15, 23, 42)",
            backgroundImage: "none",
            backgroundAttachment: "initial",
            backgroundClip: "initial",
            backgroundOrigin: "initial",
            backgroundPosition: "initial",
            backgroundRepeat: "initial",
            backgroundSize: "initial",
          }}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
                <Building2 className="h-6 w-6 text-orange-500" />
                <span className="text-xl font-bold">BuildCraft</span>
              </Link>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Close mobile menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex-1 px-6 py-8">
              <ul className="space-y-6">
                {navItems.map((item, index) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`mobile-nav-item block text-lg font-medium hover:text-orange-500 transition-colors ${
                        pathname === item.href ? "text-orange-500" : "text-white"
                      } ${isMobileMenuOpen ? "animate" : ""}`}
                      style={{
                        animationDelay: `${0.1 + index * 0.1}s`,
                        transitionDelay: `${0.1 + index * 0.1}s`,
                      }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Footer */}
            <div className="p-6 border-t border-slate-700">
              <Link href="/contact" onClick={closeMobileMenu}>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 button-hover text-lg py-3">
                  Get Free Quote
                </Button>
              </Link>
              <div className="mt-4 text-center text-sm text-slate-400">
                <p>&copy; 2025 BuildCraft</p>
                <p>Building Your Dreams</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
