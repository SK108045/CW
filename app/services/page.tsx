"use client"

import { Hammer, Home, Palette, Users, CheckCircle, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ServicesPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

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
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
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

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .service-icon {
          transition: all 0.3s ease;
        }

        .service-icon:hover {
          transform: rotate(10deg) scale(1.1);
        }

        .button-hover {
          transition: all 0.3s ease;
        }

        .button-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .media-item {
          transition: all 0.4s ease;
          overflow: hidden;
        }

        .media-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }

        .media-overlay {
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        /* Remove the hover-only behavior - make overlay always visible */
        .media-item:hover .media-overlay {
          opacity: 1;
        }

        /* Better text visibility on all screens */
        .media-overlay {
          opacity: 1 !important;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%) !important;
        }

        /* Remove the mobile-specific override since we want it on all screens now */
        @media (max-width: 768px) {
          .media-overlay {
            opacity: 1 !important;
            background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%) !important;
          }
        }

        .video-container {
          position: relative;
          cursor: pointer;
        }

        .video-poster {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          transition: opacity 0.3s ease;
        }

        .video-poster.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.7);
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .play-button:hover {
          background: rgba(249, 115, 22, 0.9);
          transform: translate(-50%, -50%) scale(1.1);
        }

        .expand-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 8px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
          opacity: 0;
        }

        .video-container:hover .expand-button {
          opacity: 1;
        }

        .expand-button:hover {
          background: rgba(249, 115, 22, 0.9);
          transform: scale(1.1);
        }

        .video-error {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(239, 68, 68, 0.9);
          color: white;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          font-size: 0.875rem;
          max-width: 200px;
          z-index: 15;
        }

        .video-loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(249, 115, 22, 0.9);
          color: white;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          font-size: 0.875rem;
          z-index: 15;
        }

        .loading-spinner {
          border: 2px solid #ffffff40;
          border-top: 2px solid #ffffff;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
          margin: 0 auto 8px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Video duration badge */
        .video-duration {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
          z-index: 5;
        }

        /* Modal Styles */
        .video-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: modalFadeIn 0.3s ease-out;
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          position: relative;
          width: 100%;
          max-width: 1200px;
          max-height: 90vh;
          background: #000;
          border-radius: 12px;
          overflow: hidden;
          animation: modalSlideIn 0.4s ease-out;
        }

        @keyframes modalSlideIn {
          from {
            transform: scale(0.9) translateY(20px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        .modal-video {
          width: 100%;
          height: auto;
          max-height: 80vh;
          object-fit: contain;
        }

        .modal-controls {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          padding: 2rem;
          color: white;
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.7);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .modal-close:hover {
          background: rgba(249, 115, 22, 0.9);
          transform: scale(1.1);
        }

        .modal-play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(249, 115, 22, 0.9);
          border: none;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .modal-play-button:hover {
          background: rgba(249, 115, 22, 1);
          transform: translate(-50%, -50%) scale(1.1);
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
      `}</style>


      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive construction solutions tailored to your needs, from initial design to final completion
          </p>
        </div>
      </section>

      {/* Construction Progress Gallery */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate">
            <span className="text-orange-500 font-semibold text-lg mb-2 block">Our Work in Action</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Project Highlights</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See our expert craftsmanship in action through real construction projects and professional techniques
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Image 1 */}
            <div className="media-item rounded-2xl overflow-hidden bg-white shadow-lg scroll-animate stagger-1">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/Image1.png"
                  alt="Foundation work in progress"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="media-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg">Foundation Work</h3>
                    <p className="text-sm text-gray-200">Residential Project - Week 2</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image 2 - replaces Video 1 */}
            <div className="media-item rounded-2xl overflow-hidden bg-white shadow-lg scroll-animate stagger-2">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/Construction.jpg"
                  alt="Construction process"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="media-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg">Construction Process</h3>
                    <p className="text-sm text-gray-200">Professional Building Techniques</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image 3 */}
            <div className="media-item rounded-2xl overflow-hidden bg-white shadow-lg scroll-animate stagger-3">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/RoomInstallation.jpg"
                  alt="Room installation"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="media-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg">Room Installation</h3>
                    <p className="text-sm text-gray-200">Custom Home - Week 8</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image 4 */}
            <div className="media-item rounded-2xl overflow-hidden bg-white shadow-lg scroll-animate stagger-4">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/InteriorDesign.jpg"
                  alt="Interior finishing work"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="media-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg">Interior Finishing</h3>
                    <p className="text-sm text-gray-200">Luxury Villa - Final Phase</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image 5 - replaces Video 2 */}
            <div className="media-item rounded-2xl overflow-hidden bg-white shadow-lg scroll-animate stagger-5">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/Contracting.jpg"
                  alt="Expert craftsmanship"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="media-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg">Expert Craftsmanship</h3>
                    <p className="text-sm text-gray-200">Detailed Construction Work</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action Card */}
            <div className="media-item rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg scroll-animate stagger-5">
              <div className="h-64 flex flex-col justify-center items-center text-white p-6 text-center">
                <Hammer className="w-12 h-12 mb-4 animate-bounce" />
                <h3 className="font-bold text-xl mb-2">Your Project Next?</h3>
                <p className="text-orange-100 mb-4">Ready to start your construction journey?</p>
                <Link href="/contact">
                  <Button className="bg-white text-orange-600 hover:bg-orange-50 button-hover">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-16">
            {/* Design Services */}
            <div className="grid md:grid-cols-2 gap-12 items-center scroll-animate">
              <div>
                <div className="flex items-center mb-6">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mr-4 service-icon">
                    <Palette className="h-8 w-8 text-orange-500" />
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900">Design Services</h2>
                </div>
                <p className="text-lg text-slate-600 mb-6">
                  Our expert design team creates innovative, functional, and beautiful architectural solutions that
                  perfectly match your vision and requirements. From concept to detailed blueprints, we handle every
                  aspect of the design process.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Architectural design and planning",
                    "3D modeling and visualization",
                    "Interior design consultation",
                    "Structural engineering",
                    "Permit and approval assistance",
                    "Sustainable design solutions",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-orange-500" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button className="bg-orange-500 hover:bg-orange-600 button-hover">
                    Get Design Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <Image
                  src="/DesignServices.jpg"
                  alt="Design Services - Architectural planning and 3D modeling"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Construction */}
            <div className="grid md:grid-cols-2 gap-12 items-center scroll-animate">
              <div className="order-2 md:order-1 relative">
                <Image
                  src="/Construction.jpg"
                  alt="Construction Services - Professional building and structural work"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center mb-6">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mr-4 service-icon">
                    <Hammer className="h-8 w-8 text-orange-500" />
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900">Construction</h2>
                </div>
                <p className="text-lg text-slate-600 mb-6">
                  From foundation to finishing touches, our skilled construction team delivers exceptional quality
                  workmanship. We handle projects of all sizes, ensuring every detail meets our high standards and your
                  expectations.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Foundation and structural work",
                    "Framing and roofing",
                    "Electrical and plumbing systems",
                    "Insulation and drywall",
                    "Flooring and finishing",
                    "Quality control and inspections",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-orange-500" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button className="bg-orange-500 hover:bg-orange-600 button-hover">
                    Start Construction <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* House Design */}
            <div className="grid md:grid-cols-2 gap-12 items-center scroll-animate">
              <div>
                <div className="flex items-center mb-6">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mr-4 service-icon">
                    <Home className="h-8 w-8 text-orange-500" />
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900">House Design</h2>
                </div>
                <p className="text-lg text-slate-600 mb-6">
                  Specializing in residential design, we create homes that perfectly balance functionality, comfort, and
                  style. Our designs reflect your lifestyle while incorporating modern efficiency and timeless appeal.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Custom home design",
                    "Renovation and addition planning",
                    "Kitchen and bathroom design",
                    "Outdoor living spaces",
                    "Energy-efficient solutions",
                    "Smart home integration",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-orange-500" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button className="bg-orange-500 hover:bg-orange-600 button-hover">
                    Design Your Home <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <Image
                  src="/HouseDesign.png"
                  alt="House Design - Custom residential home design and planning"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Contracting */}
            <div className="grid md:grid-cols-2 gap-12 items-center scroll-animate">
              <div className="order-2 md:order-1 relative">
                <Image
                  src="/Contracting.jpg"
                  alt="Contracting Services - Project management and coordination"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center mb-6">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mr-4 service-icon">
                    <Users className="h-8 w-8 text-orange-500" />
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900">Contracting</h2>
                </div>
                <p className="text-lg text-slate-600 mb-6">
                  As your general contractor, we manage every aspect of your project from start to finish. Our
                  comprehensive approach ensures seamless coordination, quality control, and timely completion.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Project management and coordination",
                    "Subcontractor management",
                    "Timeline and budget control",
                    "Permit and inspection handling",
                    "Quality assurance and safety",
                    "Client communication and updates",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-orange-500" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button className="bg-orange-500 hover:bg-orange-600 button-hover">
                    Hire Our Team <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Process</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A streamlined approach that ensures your project runs smoothly from concept to completion
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                desc: "Initial meeting to understand your vision, requirements, and budget",
              },
              {
                step: "02",
                title: "Design & Planning",
                desc: "Detailed design development, permits, and project timeline creation",
              },
              {
                step: "03",
                title: "Construction",
                desc: "Expert execution with regular updates and quality checkpoints",
              },
              {
                step: "04",
                title: "Completion",
                desc: "Final inspection, walkthrough, and project handover with warranty",
              },
            ].map((process, index) => (
              <Card key={index} className={`text-center card-hover scroll-animate stagger-${index + 1}`}>
                <CardHeader>
                  <div className="text-4xl font-bold text-orange-500 mb-4">{process.step}</div>
                  <CardTitle>{process.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{process.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="scroll-animate">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your project and receive a detailed quote for our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-3 button-hover">
                  Get Free Consultation
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900 text-lg px-8 py-3 button-hover"
                >
                  View Our Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
