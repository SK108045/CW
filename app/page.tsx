"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Hammer, Home, Palette, Users, Play, ArrowDown, Sparkles, Zap } from "lucide-react"

// Constants (hoisted outside the component to keep references stable)
const FULL_TEXT = "Building Your Dreams"
const SUBTITLE =
  "We Offer Professional construction services, innovative designs, and premium building materials perfect for your project"
const SUBTITLE_WORDS = SUBTITLE.split(" ")

// IMAGE URLS - Local images from /public folder
const IMAGE_URLS = {
  // Founder Section
  founderPhoto: "/KevinMuchiri.png",

  // Why Choose Us Section
  whyChooseUsImage: "/WhyChooseUs.jpg", // closest available image

  // Featured Projects Section
  project1: "/MordernFamilyHome.jpg", // Modern Family Home
  project2: "/CorporateOffice.jpg",   // Corporate Office Complex
  project3: "/LuxuryVilla.jpg",       // Luxury Villa Estate
}

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [typewriterText, setTypewriterText] = useState("")
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [subtitleWords, setSubtitleWords] = useState<string[]>([])
  const [showDreams, setShowDreams] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [showCTA, setShowCTA] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)

    // Typewriter effect
    let currentIndex = 0
    let isTyping = true
    let timeoutId: NodeJS.Timeout

    const runTypewriter = () => {
      if (isTyping) {
        if (currentIndex <= FULL_TEXT.length) {
          setTypewriterText(FULL_TEXT.slice(0, currentIndex))

          // Hide cursor when we've typed "Building Your " (13 characters including space)
          if (currentIndex >= 13) {
            setShowCursor(false)
          } else {
            setShowCursor(true)
          }

          currentIndex++
          timeoutId = setTimeout(runTypewriter, 150)
        } else {
          // Finished typing
          setShowDreams(true)
          setShowSubtitle(true)
          setSubtitleWords(SUBTITLE_WORDS)
          setShowCursor(false)
          // Show CTA buttons after subtitle appears
          setTimeout(() => setShowCTA(true), 1000)
          timeoutId = setTimeout(() => {
            isTyping = false
            runTypewriter()
          }, 4000)
        }
      } else {
        if (currentIndex > 0) {
          currentIndex--
          setTypewriterText(FULL_TEXT.slice(0, currentIndex))

          // Show cursor during deletion
          setShowCursor(true)

          timeoutId = setTimeout(runTypewriter, 80)
        } else {
          // Finished erasing
          setShowSubtitle(false)
          setSubtitleWords([])
          setShowDreams(false)
          setShowCursor(true)
          setShowCTA(false)
          isTyping = true
          timeoutId = setTimeout(runTypewriter, 1000)
        }
      }
    }

    runTypewriter()

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

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
      clearTimeout(timeoutId)
    }
  }, [])

  // Split the typewriter text for mobile layout
  const renderTypewriterText = () => {
    const words = typewriterText.split(" ")
    const buildingYour = words.slice(0, 2).join(" ") // "Building Your"
    const dreams = words[2] || "" // "Dreams"

    return (
      <>
        {/* Desktop version - all in one line */}
        <span className="hidden md:block typewriter-text">
          {typewriterText.split(" ").map((word, index) => {
            if (word === "Dreams" && showDreams) {
              return (
                <span
                  key={index}
                  className="dreams-text underline-animation inline-block hover:scale-110 transition-transform duration-300 ml-2"
                >
                  {word}
                </span>
              )
            }
            return (
              <span key={index} className="mr-2">
                {word}
              </span>
            )
          })}
        </span>

        {/* Mobile version - Dreams on new line */}
        <span className="block md:hidden">
          <span className="block relative">
            {buildingYour}
            {/* Show cursor only when we're still typing the first line and showCursor is true */}
            {showCursor && buildingYour && !dreams && (
              <span className="text-orange-500 font-bold ml-1 animate-pulse">|</span>
            )}
          </span>
          {dreams && (
            <span
              className={`block mt-2 ${dreams === "Dreams" && showDreams ? "dreams-text underline-animation" : ""} hover:scale-110 transition-transform duration-300`}
            >
              {dreams}
              {/* Show cursor only while typing Dreams (not complete) */}
              {dreams && dreams !== "Dreams" && <span className="text-orange-500 font-bold ml-1 animate-pulse">|</span>}
            </span>
          )}
        </span>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style jsx global>{`
        /* Enhanced Hero Styles */
        .hero-container {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%);
          position: relative;
          overflow: hidden;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(251, 146, 60, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(253, 186, 116, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%);
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }

        .hero-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .particle-system {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          background: #f97316;
          border-radius: 50%;
          opacity: 0;
          animation: particleFloat 15s infinite linear;
        }

        .particle:nth-child(1) { width: 4px; height: 4px; left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { width: 6px; height: 6px; left: 20%; animation-delay: 2s; }
        .particle:nth-child(3) { width: 3px; height: 3px; left: 30%; animation-delay: 4s; }
        .particle:nth-child(4) { width: 5px; height: 5px; left: 40%; animation-delay: 1s; }
        .particle:nth-child(5) { width: 4px; height: 4px; left: 50%; animation-delay: 3s; }
        .particle:nth-child(6) { width: 7px; height: 7px; left: 60%; animation-delay: 5s; }
        .particle:nth-child(7) { width: 3px; height: 3px; left: 70%; animation-delay: 6s; }
        .particle:nth-child(8) { width: 5px; height: 5px; left: 80%; animation-delay: 2.5s; }
        .particle:nth-child(9) { width: 4px; height: 4px; left: 90%; animation-delay: 4.5s; }
        .particle:nth-child(10) { width: 6px; height: 6px; left: 15%; animation-delay: 7s; }

        @keyframes particleFloat {
          0% {
            transform: translateY(100vh) rotate(0deg) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(90vh) rotate(45deg) scale(1);
          }
          90% {
            opacity: 1;
            transform: translateY(-10vh) rotate(315deg) scale(1);
          }
          100% {
            transform: translateY(-20vh) rotate(360deg) scale(0);
            opacity: 0;
          }
        }

        .floating-shapes {
          position: absolute;
          inset: 0;
        }

        .shape {
          position: absolute;
          opacity: 0.1;
        }

        .shape-1 {
          top: 10%;
          left: 10%;
          width: 100px;
          height: 100px;
          background: linear-gradient(45deg, #f97316, #fb923c);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: morphShape 8s ease-in-out infinite, float 6s ease-in-out infinite;
        }

        .shape-2 {
          top: 20%;
          right: 15%;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #fb923c, #fdba74);
          border-radius: 50% 20% 80% 40%;
          animation: morphShape 10s ease-in-out infinite reverse, float 8s ease-in-out infinite 2s;
        }

        .shape-3 {
          bottom: 20%;
          left: 20%;
          width: 60px;
          height: 60px;
          background: linear-gradient(225deg, #fdba74, #fed7aa);
          border-radius: 20% 80% 20% 80%;
          animation: morphShape 12s ease-in-out infinite, float 7s ease-in-out infinite 4s;
        }

        .shape-4 {
          top: 60%;
          right: 30%;
          width: 40px;
          height: 40px;
          background: linear-gradient(315deg, #f97316, #ea580c);
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          animation: morphShape 9s ease-in-out infinite, float 5s ease-in-out infinite 1s;
        }

        @keyframes morphShape {
          0%, 100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            transform: rotate(0deg);
          }
          25% {
            border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
            transform: rotate(90deg);
          }
          50% {
            border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
            transform: rotate(180deg);
          }
          75% {
            border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
            transform: rotate(270deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-5px);
          }
          75% {
            transform: translateY(-20px) translateX(-10px);
          }
        }

        .hero-content {
          position: relative;
          z-index: 10;
        }

        .title-container {
          position: relative;
          margin-bottom: 2rem;
        }

        .title-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, #f97316, #fb923c, #fdba74);
          background-size: 200% 200%;
          animation: gradientShift 4s ease-in-out infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: blur(2px);
          opacity: 0.5;
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .dreams-text {
          background: linear-gradient(45deg, #f97316, #fb923c, #fdba74, #fed7aa);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: dreamGlow 3s ease-in-out infinite, gradientShift 4s ease-in-out infinite;
          position: relative;
        }

        @keyframes dreamGlow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(249, 115, 22, 0.5));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(249, 115, 22, 0.8));
            transform: scale(1.05);
          }
        }

        .underline-animation {
          position: relative;
          display: inline-block;
        }

        .underline-animation::after {
          content: "";
          position: absolute;
          bottom: -15px;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, #f97316, #fb923c, #fdba74);
          border-radius: 2px;
          animation: slideInUnderline 1s ease-out 1.8s forwards, underlineGlow 2s ease-in-out infinite 3s;
          width: 0;
        }

        @keyframes slideInUnderline {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes underlineGlow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(249, 115, 22, 1);
          }
        }

        .subtitle-animation {
          animation: fadeInUp 1.5s ease-out 0.8s forwards;
        }

        .cta-container {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }

        .cta-container.show {
          opacity: 1;
          transform: translateY(0);
        }

        .cta-button {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #f97316, #fb923c);
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(249, 115, 22, 0.3);
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 30px rgba(249, 115, 22, 0.5);
          background: linear-gradient(135deg, #ea580c, #f97316);
        }

        .cta-secondary {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(249, 115, 22, 0.5);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .cta-secondary:hover {
          background: rgba(249, 115, 22, 0.1);
          border-color: #f97316;
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(249, 115, 22, 0.3);
        }

        .stats-floating {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(249, 115, 22, 0.2);
          border-radius: 12px;
          padding: 1rem;
          color: white;
          animation: float 6s ease-in-out infinite;
        }

        .stats-1 {
          top: 20%;
          left: 5%;
          animation-delay: 0s;
        }

        .stats-2 {
          top: 30%;
          right: 5%;
          animation-delay: 2s;
        }

        .stats-3 {
          bottom: 30%;
          left: 8%;
          animation-delay: 4s;
        }

        /* Horizontal scrolling services animation */
        .services-scroll-container {
          overflow: hidden;
          position: relative;
          padding: 2rem 0;
        }

        .services-scroll-track {
          display: flex;
          animation: scrollHorizontal 20s linear infinite;
          width: calc(200% + 2rem);
          gap: 2rem;
        }

        .services-scroll-track:hover {
          animation-play-state: paused;
        }

        @keyframes scrollHorizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .service-card-moving {
          flex: 0 0 280px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .service-card-moving:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .service-card-moving:hover .service-icon-moving {
          transform: rotate(15deg) scale(1.2);
          background: linear-gradient(135deg, #f97316, #fb923c) !important;
        }

        .service-card-moving:hover .service-icon-moving .service-icon-svg {
          color: white !important;
        }

        .service-icon-moving {
          transition: all 0.4s ease;
        }

        /* Gradient overlay for smooth edges */
        .services-scroll-container::before,
        .services-scroll-container::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          z-index: 10;
          pointer-events: none;
        }

        .services-scroll-container::before {
          left: 0;
          background: linear-gradient(to right, white, transparent);
        }

        .services-scroll-container::after {
          right: 0;
          background: linear-gradient(to left, white, transparent);
        }

        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
          .services-scroll-track {
            animation-duration: 25s;
          }
          
          .service-card-moving {
            flex: 0 0 250px;
          }
          
          .services-scroll-container::before,
          .services-scroll-container::after {
            width: 50px;
          }

          .hero-grid {
            background-size: 30px 30px;
          }

          .shape-1, .shape-2, .shape-3, .shape-4 {
            opacity: 0.05;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-container text-white h-screen flex items-center">
        {/* Background Effects */}
        <div className="hero-overlay" />
        <div className="hero-grid" />

        {/* Floating Shapes */}
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>

        {/* Particle System */}
        <div className="hero-particles">
          <div className="particle-system">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="stats-floating stats-1 hidden lg:block">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <div>
              <div className="font-bold text-lg">500+</div>
              <div className="text-xs opacity-80">Projects</div>
            </div>
          </div>
        </div>

        <div className="stats-floating stats-2 hidden lg:block">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-400" />
            <div>
              <div className="font-bold text-lg">10+</div>
              <div className="text-xs opacity-80">Years</div>
            </div>
          </div>
        </div>

        <div className="stats-floating stats-3 hidden lg:block">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-orange-400" />
            <div>
              <div className="font-bold text-lg">98%</div>
              <div className="text-xs opacity-80">Satisfaction</div>
            </div>
          </div>
        </div>

        <div className="hero-content container mx-auto px-4 text-center">
          {/* Enhanced Typography */}
          <div className="title-container">
            <div className="title-glow text-5xl md:text-7xl font-bold">{renderTypewriterText()}</div>
            <h1 className="text-5xl md:text-7xl font-bold relative z-10">{renderTypewriterText()}</h1>
          </div>

          {/* Animated Subtitle */}
          <div className="h-24 md:h-20 mb-12 flex items-center justify-center">
            {showSubtitle && (
              <p className="subtitle-animation text-xl md:text-2xl max-w-4xl mx-auto text-slate-200 leading-relaxed opacity-0">
                {subtitleWords.join(" ")}
              </p>
            )}
          </div>

          {/* Enhanced CTA Buttons */}
          <div
            className={`cta-container flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 ${showCTA ? "show" : ""}`}
          >
            <Link href="/contact">
              <Button size="lg" className="cta-button text-white text-lg px-10 py-4 rounded-full font-semibold">
                <Play className="mr-2 h-5 w-5" />
                Start Your Project
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" className="cta-secondary text-white text-lg px-10 py-4 rounded-full font-semibold">
                Explore Services
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-animate">
              <div className="mb-6">
                <span className="text-orange-500 font-semibold text-lg">Meet Our Founder</span>
                <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">Kevin Muchiri</h2>
                <p className="text-xl text-orange-600 font-medium mb-6">Founder & CEO</p>
              </div>

              {/* Image on mobile - shows after "Founder & CEO" text */}
              <div className="relative scroll-animate md:hidden mb-8">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg opacity-20 blur floating-element"></div>
                <div className="relative">
                  <Image
                    src={IMAGE_URLS.founderPhoto || "/placeholder.svg"}
                    alt="Kevin Muchiri - Founder & CEO of BuildCraft"
                    width={500}
                    height={600}
                    className="relative rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-4 rounded-lg shadow-lg">
                    <div className="text-sm font-medium">Established</div>
                    <div className="text-2xl font-bold">2009</div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-orange-100 rounded-full opacity-50 floating-element-delayed"></div>
                <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-orange-200 rounded-full opacity-40 floating-element-slow"></div>
              </div>

              <div className="space-y-4 text-lg text-slate-600">
                <p>
                  With over 10 years of experience in the construction industry, <strong>Kevin Muchiri</strong> founded <strong>BuildCraft</strong> with a
                  vision to transform how construction projects are delivered. His passion for excellence and commitment
                  to quality has made BuildCraft a trusted name in the industry.
                </p>
                <p>
                  Kevin's expertise spans from residential home design to large-scale commercial construction. He
                  believes in combining traditional craftsmanship with modern innovation to create structures that stand
                  the test of time.
                </p>
                <p>
                  Under his leadership, BuildCraft has completed over 500 successful projects, earning a reputation for
                  reliability, quality, and exceptional customer service.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <div className="text-2xl font-bold text-orange-600">500+</div>
                  <div className="text-slate-600">Projects Completed</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <div className="text-2xl font-bold text-orange-600">10+</div>
                  <div className="text-slate-600">Years Experience</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <div className="text-2xl font-bold text-orange-600">100%</div>
                  <div className="text-slate-600">Client Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Image on desktop - hidden on mobile */}
            <div className="relative scroll-animate hidden md:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg opacity-20 blur floating-element"></div>
              <div className="relative">
                <Image
                  src={IMAGE_URLS.founderPhoto || "/placeholder.svg"}
                  alt="Kevin Muchiri - Founder & CEO of BuildCraft"
                  width={500}
                  height={600}
                  className="relative rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-4 rounded-lg shadow-lg">
                  <div className="text-sm font-medium">Established</div>
                  <div className="text-2xl font-bold">2009</div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-orange-100 rounded-full opacity-50 floating-element-delayed"></div>
              <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-orange-200 rounded-full opacity-40 floating-element-slow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview - Horizontal Scrolling */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate">
            <span className="text-orange-500 font-semibold text-lg mb-2 block">What We Do</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive construction solutions from design to completion
            </p>
          </div>

          {/* Horizontal Scrolling Services */}
          <div className="services-scroll-container scroll-animate">
            <div className="services-scroll-track">
              {/* First set of services */}
              {[
                {
                  icon: Palette,
                  title: "Design Services",
                  desc: "Custom architectural designs tailored to your vision and requirements",
                },
                {
                  icon: Hammer,
                  title: "Construction",
                  desc: "Complete building construction from foundation to finish with quality",
                },
                {
                  icon: Home,
                  title: "House Design",
                  desc: "Residential design for modern, functional and beautiful homes",
                },
                {
                  icon: Users,
                  title: "Contracting",
                  desc: "Professional contracting services for projects of all sizes",
                },
              ].map((service, index) => (
                <Card
                  key={`first-${index}`}
                  className="service-card-moving bg-white border border-slate-200 shadow-lg hover:shadow-xl"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto service-icon-moving w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-orange-100">
                      <service.icon className="h-8 w-8 text-orange-500 service-icon-svg transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-slate-600 leading-relaxed">{service.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}

              {/* Duplicate set for seamless loop */}
              {[
                {
                  icon: Palette,
                  title: "Design Services",
                  desc: "Custom architectural designs tailored to your vision and requirements",
                },
                {
                  icon: Hammer,
                  title: "Construction",
                  desc: "Complete building construction from foundation to finish with quality",
                },
                {
                  icon: Home,
                  title: "House Design",
                  desc: "Residential design for modern, functional and beautiful homes",
                },
                {
                  icon: Users,
                  title: "Contracting",
                  desc: "Professional contracting services for projects of all sizes",
                },
              ].map((service, index) => (
                <Card
                  key={`second-${index}`}
                  className="service-card-moving bg-white border border-slate-200 shadow-lg hover:shadow-xl"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto service-icon-moving w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-orange-100">
                      <service.icon className="h-8 w-8 text-orange-500 service-icon-svg transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-slate-600 leading-relaxed">{service.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-12 scroll-animate">
            <Link href="/services">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 button-hover text-lg px-8 py-4">
                View All Services
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-animate">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Why Choose BuildCraft?</h2>
              <div className="space-y-6">
                {[
                  { title: "Expert Craftsmanship", desc: "Skilled professionals with decades of combined experience" },
                  { title: "Quality Materials", desc: "Premium building stones and construction materials" },
                  { title: "Timely Delivery", desc: "Projects completed on schedule and within budget" },
                ].map((item, index) => (
                  <div key={index} className={`flex items-start space-x-3 scroll-animate stagger-${index + 1}`}>
                    <div className="bg-orange-500 rounded-full p-1 mt-1 service-icon">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/about">
                  <Button className="bg-orange-500 hover:bg-orange-600 button-hover">Learn More About Us</Button>
                </Link>
              </div>
            </div>
            <div className="relative scroll-animate">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg opacity-20 blur"></div>
              <Image
                src={IMAGE_URLS.whyChooseUsImage || "/placeholder.svg"}
                alt="BuildCraft construction team at work showcasing expert craftsmanship"
                width={600}
                height={400}
                className="relative rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500 rounded-full floating-element"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-orange-400 rounded-full floating-element-delayed"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-300 transform rotate-45 floating-element-slow"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 scroll-animate">
            <span className="text-orange-500 font-semibold text-lg mb-2 block">Our Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Showcasing our commitment to excellence through completed projects that stand as testaments to our
              craftsmanship
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Modern Family Home",
                category: "Residential",
                image: IMAGE_URLS.project1,
                description: "Contemporary 4-bedroom home with sustainable materials",
                features: ["3,200 sq ft", "4 Bedrooms", "Eco-friendly"],
                year: "2024",
              },
              {
                title: "Corporate Office Complex",
                category: "Commercial",
                image: IMAGE_URLS.project2,
                description: "State-of-the-art office building with modern amenities",
                features: ["50,000 sq ft", "LEED Certified", "Smart Building"],
                year: "2023",
              },
              {
                title: "Luxury Villa Estate",
                category: "Residential",
                image: IMAGE_URLS.project3,
                description: "Premium villa with custom stone work and landscaping",
                features: ["6,500 sq ft", "Pool & Spa", "Custom Design"],
                year: "2024",
              },
            ].map((project, index) => (
              <div key={index} className={`group scroll-animate stagger-${index + 1}`}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={`${project.title} - ${project.description}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">{project.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.features.map((feature, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* View Project Link */}
                    <div className="flex items-center text-orange-500 font-medium group-hover:text-orange-600 transition-colors">
                      <div className="w-0 group-hover:w-6 transition-all duration-300 overflow-hidden">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-8 scroll-animate">
            {[
              { number: "500+", label: "Projects Completed", icon: "🏗️" },
              { number: "10+", label: "Years Experience", icon: "⭐" },
              { number: "98%", label: "Client Satisfaction", icon: "😊" },
              { number: "50+", label: "Team Members", icon: "👥" },
            ].map((stat, index) => (
              <div key={index} className={`text-center group stagger-${index + 1}`}>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 hover:from-orange-100 hover:to-orange-200 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-12 scroll-animate">
            <Link href="/contact">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 button-hover text-lg px-8 py-4">
                View All Projects
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500 rounded-full floating-element"></div>
          <div
            className="absolute bottom-10 right-10 w-24 h-24 bg-orange-400 rounded-full floating-element"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="scroll-animate">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Get a free consultation and quote for your construction project today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-3 button-hover">
                  Get Free Quote
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900 text-lg px-8 py-3 button-hover"
                >
                  View Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
