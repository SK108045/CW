"use client"

import { CheckCircle, ArrowRight, Star, Award, Truck, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

// IMAGE URLS - REPLACE WITH YOUR FIREBASE URLS
const IMAGE_URLS = {
  // Featured Products Section
  naturalStone:
    "https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/Products%2FNaturalStone.jpg?alt=media&token=aa1441f8-a195-4b35-938d-d46e2a4ba355", // Natural stone showcase
  engineeredStone:
    "https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/Products%2FEngineeredStone.jpg?alt=media&token=dcd3316c-5f25-44a2-94c7-86ed07bb9fb6", // Engineered stone showcase
  decorativeStone:
    "https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/Products%2FDecorativeStone.jpg?alt=media&token=5ee46982-c8d6-4ee0-b123-ec5fc54dd3bc", // Decorative stone showcase

  // Product Categories
  granite:
    "https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/Products%2FGranite.jpg?alt=media&token=f582e4b0-0016-4204-aeaa-86cb047692f9", // Granite samples
  marble:
    "https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/Products%2FMarble.jpg?alt=media&token=193498d8-3176-45cd-a15d-4661ecfab1fe", // Marble samples
  limestone:
    "https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/Products%2FLimeStone.jpg?alt=media&token=599e23ba-7478-42a2-9a2e-3e8183066bae", // Limestone samples
  quartz:
    "https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/Products%2FQuartz.jpg?alt=media&token=753e5d19-3960-4a6f-a8fa-3c261633ca19", // Quartz samples
  sandstone:
    "https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/Products%2FSandStone.jpg?alt=media&token=ee99aca6-4023-4b91-a90f-225d1a80309b", // Sandstone samples
  slate:
    "https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/Products%2FSlateStone.jpg?alt=media&token=7865c60c-aad7-4a7f-b901-e476f732dc9a", // Slate samples
  travertine:
    "https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/Products%2FTravertineStone.jpg?alt=media&token=7b8a10f3-0580-4b78-b068-94f4b7ce81ba", // Travertine samples
  riverRock:
    "https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/Products%2FRiverRock.webp?alt=media&token=491963d7-fbbe-4e6d-8d9d-cfac870cb8f2", // River rock samples
}

export default function ProductsPage() {
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

    return () => observer.disconnect()
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

        .product-card {
          transition: all 0.4s ease;
          overflow: hidden;
          position: relative;
        }

        .product-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.1), transparent);
          transition: left 0.6s;
          z-index: 1;
        }

        .product-card:hover::before {
          left: 100%;
        }

        .product-card:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }

        .product-card:hover .product-image {
          transform: scale(1.1);
        }

        .product-image {
          transition: transform 0.6s ease;
        }

        .category-card {
          transition: all 0.4s ease;
          overflow: hidden;
          position: relative;
          cursor: pointer;
        }

        .category-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(249, 115, 22, 0.8), rgba(251, 146, 60, 0.8));
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .category-card:hover::after {
          opacity: 1;
        }

        .category-card:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .category-card:hover .category-content {
          transform: translateY(0);
          color: white;
        }

        .category-content {
          position: relative;
          z-index: 10;
          transition: all 0.4s ease;
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

        .gradient-text {
          background: linear-gradient(45deg, #f97316, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pulse-ring {
          animation: pulse-ring 2s infinite;
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        /* Stone Transformation Animation */
        .stone-animation-container {
          position: relative;
          height: 400px;
          overflow: hidden;
          background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
        }

        .stone-particles {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          background: #f97316;
          border-radius: 50%;
          opacity: 0;
          animation: particleFloat 8s infinite ease-in-out;
        }

        .particle:nth-child(1) { width: 4px; height: 4px; left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { width: 6px; height: 6px; left: 20%; animation-delay: 1s; }
        .particle:nth-child(3) { width: 3px; height: 3px; left: 30%; animation-delay: 2s; }
        .particle:nth-child(4) { width: 5px; height: 5px; left: 40%; animation-delay: 0.5s; }
        .particle:nth-child(5) { width: 4px; height: 4px; left: 50%; animation-delay: 1.5s; }
        .particle:nth-child(6) { width: 7px; height: 7px; left: 60%; animation-delay: 2.5s; }
        .particle:nth-child(7) { width: 3px; height: 3px; left: 70%; animation-delay: 3s; }
        .particle:nth-child(8) { width: 5px; height: 5px; left: 80%; animation-delay: 0.8s; }
        .particle:nth-child(9) { width: 4px; height: 4px; left: 90%; animation-delay: 1.8s; }

        @keyframes particleFloat {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        .stone-layers {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 200px;
        }

        .stone-layer {
          position: absolute;
          bottom: 0;
          width: 100%;
          background: linear-gradient(45deg, #78716c, #a8a29e, #d6d3d1);
          animation: stoneGrow 6s infinite ease-in-out;
          transform-origin: bottom;
        }

        .stone-layer:nth-child(1) {
          height: 60px;
          animation-delay: 0s;
          background: linear-gradient(45deg, #44403c, #78716c);
        }

        .stone-layer:nth-child(2) {
          height: 40px;
          animation-delay: 1s;
          background: linear-gradient(45deg, #57534e, #a8a29e);
        }

        .stone-layer:nth-child(3) {
          height: 30px;
          animation-delay: 2s;
          background: linear-gradient(45deg, #78716c, #d6d3d1);
        }

        @keyframes stoneGrow {
          0%, 20% {
            transform: scaleY(0);
            opacity: 0;
          }
          40%, 80% {
            transform: scaleY(1);
            opacity: 1;
          }
          100% {
            transform: scaleY(0);
            opacity: 0;
          }
        }

        .transformation-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: white;
          z-index: 10;
        }

        .morphing-text {
          font-size: 2.5rem;
          font-weight: bold;
          background: linear-gradient(45deg, #f97316, #fb923c, #fdba74, #fed7aa);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: textMorph 4s infinite ease-in-out, gradientShift 3s infinite ease-in-out;
        }

        @keyframes textMorph {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            filter: blur(0px);
          }
          25% {
            transform: scale(1.1) rotate(2deg);
            filter: blur(1px);
          }
          50% {
            transform: scale(0.9) rotate(-1deg);
            filter: blur(0px);
          }
          75% {
            transform: scale(1.05) rotate(1deg);
            filter: blur(0.5px);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .floating-stones {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .floating-stone {
          position: absolute;
          background: linear-gradient(45deg, #a8a29e, #d6d3d1);
          border-radius: 20% 30% 40% 50%;
          animation: floatStone 10s infinite ease-in-out;
          opacity: 0.7;
        }

        .floating-stone:nth-child(1) {
          width: 30px;
          height: 25px;
          top: 20%;
          left: 15%;
          animation-delay: 0s;
        }

        .floating-stone:nth-child(2) {
          width: 40px;
          height: 35px;
          top: 60%;
          right: 20%;
          animation-delay: 2s;
        }

        .floating-stone:nth-child(3) {
          width: 25px;
          height: 20px;
          top: 40%;
          left: 70%;
          animation-delay: 4s;
        }

        .floating-stone:nth-child(4) {
          width: 35px;
          height: 30px;
          top: 80%;
          left: 40%;
          animation-delay: 6s;
        }

        @keyframes floatStone {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.7;
          }
          25% {
            transform: translateY(-20px) rotate(90deg) scale(1.1);
            opacity: 1;
          }
          50% {
            transform: translateY(-40px) rotate(180deg) scale(0.9);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-20px) rotate(270deg) scale(1.05);
            opacity: 1;
          }
        }

        .energy-waves {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
        }

        .wave {
          position: absolute;
          border: 2px solid #f97316;
          border-radius: 50%;
          animation: waveExpand 3s infinite ease-out;
        }

        .wave:nth-child(1) { animation-delay: 0s; }
        .wave:nth-child(2) { animation-delay: 1s; }
        .wave:nth-child(3) { animation-delay: 2s; }

        @keyframes waveExpand {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 200px;
            height: 200px;
            opacity: 0;
          }
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
        .stagger-7 { animation-delay: 0.7s; }
        .stagger-8 { animation-delay: 0.8s; }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500 rounded-full floating-element"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-orange-400 rounded-full floating-element-delayed"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-orange-300 rounded-full floating-element-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-orange-600 transform rotate-45 floating-element"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Premium <span className="gradient-text">Building Stones</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              High-quality natural and engineered stones for all your construction and design needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 button-hover text-lg px-8 py-4">
                  Get Quote Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#products">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900 button-hover text-lg px-8 py-4"
                >
                  Explore Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stone Transformation Animation */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate">
            <span className="text-orange-500 font-semibold text-lg mb-2 block">Transformation Magic</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Stone Applications</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how our premium stones transform spaces into stunning architectural masterpieces
            </p>
          </div>

          <div className="stone-animation-container rounded-3xl shadow-2xl scroll-animate">
            {/* Floating Particles */}
            <div className="stone-particles">
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

            {/* Floating Stones */}
            <div className="floating-stones">
              <div className="floating-stone"></div>
              <div className="floating-stone"></div>
              <div className="floating-stone"></div>
              <div className="floating-stone"></div>
            </div>

            {/* Energy Waves */}
            <div className="energy-waves">
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
            </div>

            {/* Stone Layers Building Up */}
            <div className="stone-layers">
              <div className="stone-layer"></div>
              <div className="stone-layer"></div>
              <div className="stone-layer"></div>
            </div>

            {/* Central Text */}
            <div className="transformation-text">
              <div className="morphing-text">TRANSFORM</div>
              <p className="text-lg mt-4 opacity-90">Raw Stone → Architectural Masterpiece</p>
            </div>
          </div>

          {/* Application Stats 
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {[
              { number: "5,000+", label: "Kitchens Transformed", icon: "🏠" },
              { number: "2,500+", label: "Bathrooms Renovated", icon: "🛁" },
              { number: "1,200+", label: "Outdoor Spaces", icon: "🌿" },
              { number: "800+", label: "Commercial Projects", icon: "🏢" },
            ].map((stat, index) => (
              <div key={index} className={`text-center scroll-animate stagger-${index + 1}`}>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-2xl font-bold text-orange-600 mb-2">{stat.number}</div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>*/}
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate">
            <span className="text-orange-500 font-semibold text-lg mb-2 block">Premium Selection</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Product Range</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From natural stone to engineered materials, we offer the finest selection for your projects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Natural Stone",
                desc: "Premium granite, marble, and limestone for elegant finishes",
                image: IMAGE_URLS.naturalStone,
                badge: "Most Popular",
                badgeColor: "bg-green-500",
                features: [
                  "Granite slabs and tiles",
                  "Marble varieties",
                  "Limestone blocks",
                  "Sandstone options",
                  "Custom cutting available",
                  "Various finishes",
                ],
                applications: ["Countertops", "Flooring", "Wall cladding", "Outdoor paving"],
                rating: 5,
                projects: "500+",
              },
              {
                title: "Engineered Stone",
                desc: "Durable and consistent engineered stone products",
                image: IMAGE_URLS.engineeredStone,
                badge: "Best Value",
                badgeColor: "bg-blue-500",
                features: [
                  "Quartz countertops",
                  "Composite materials",
                  "Various colors available",
                  "Stain resistant finish",
                  "Non-porous surface",
                  "Consistent patterns",
                ],
                applications: ["Kitchen counters", "Bathroom vanities", "Commercial surfaces", "Backsplashes"],
                rating: 5,
                projects: "300+",
              },
              {
                title: "Decorative Stone",
                desc: "Specialty stones for unique architectural features",
                image: IMAGE_URLS.decorativeStone,
                badge: "Premium",
                badgeColor: "bg-purple-500",
                features: [
                  "Flagstone pavers",
                  "River rock",
                  "Stacked stone veneer",
                  "Custom textures",
                  "Unique patterns",
                  "Artistic finishes",
                ],
                applications: ["Feature walls", "Landscaping", "Fireplaces", "Accent pieces"],
                rating: 5,
                projects: "200+",
              },
            ].map((product, index) => (
              <Card key={index} className={`product-card scroll-animate stagger-${index + 1} border-0 shadow-xl`}>
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={`${product.title} - ${product.desc}`}
                    fill
                    className="object-cover product-image"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${product.badgeColor} hover:${product.badgeColor} text-white`}>
                      {product.badge}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center space-x-1">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-orange-500 text-orange-500" />
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.projects} Projects
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl flex items-center justify-between">
                    {product.title}
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center pulse-ring">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">{product.desc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 text-orange-500 mr-2" />
                      Features:
                    </h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></div>
                          <span className="text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                      <Award className="w-4 h-4 text-orange-500 mr-2" />
                      Applications:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.applications.map((app, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-orange-200 text-orange-700">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Link href="/contact">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 button-hover group">
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate">
            <span className="text-orange-500 font-semibold text-lg mb-2 block">Complete Collection</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Stone Categories</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Explore our comprehensive selection organized by stone type and application
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Granite", count: "50+ varieties", image: IMAGE_URLS.granite, color: "from-red-500 to-red-600" },
              { name: "Marble", count: "40+ varieties", image: IMAGE_URLS.marble, color: "from-blue-500 to-blue-600" },
              {
                name: "Limestone",
                count: "30+ varieties",
                image: IMAGE_URLS.limestone,
                color: "from-green-500 to-green-600",
              },
              {
                name: "Quartz",
                count: "60+ varieties",
                image: IMAGE_URLS.quartz,
                color: "from-purple-500 to-purple-600",
              },
              {
                name: "Sandstone",
                count: "25+ varieties",
                image: IMAGE_URLS.sandstone,
                color: "from-yellow-500 to-yellow-600",
              },
              { name: "Slate", count: "20+ varieties", image: IMAGE_URLS.slate, color: "from-gray-500 to-gray-600" },
              {
                name: "Travertine",
                count: "15+ varieties",
                image: IMAGE_URLS.travertine,
                color: "from-orange-500 to-orange-600",
              },
              {
                name: "River Rock",
                count: "10+ varieties",
                image: IMAGE_URLS.riverRock,
                color: "from-teal-500 to-teal-600",
              },
            ].map((category, index) => (
              <div
                key={index}
                className={`category-card bg-white rounded-lg shadow-lg scroll-animate stagger-${(index % 4) + 1} overflow-hidden border-0`}
                style={{ border: "none", outline: "none" }}
              >
                <div className="relative h-40">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={`${category.name} stone samples and varieties`}
                    fill
                    className="object-cover"
                  />
                  <div className="category-content absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent absolute inset-0"></div>
                    <div className="relative z-10">
                      <h3 className="font-bold text-lg">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.count}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate">
            <span className="text-orange-500 font-semibold text-lg mb-2 block">Our Promise</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Quality Assurance</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Every stone product meets our rigorous quality standards and comes with our guarantee
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Shield,
                title: "Sourced Responsibly",
                desc: "All our natural stones are ethically sourced from certified quarries with sustainable practices.",
                stats: "100% Certified",
              },
              {
                icon: Award,
                title: "Quality Tested",
                desc: "Each batch undergoes comprehensive testing for durability, consistency, and structural integrity.",
                stats: "99.9% Pass Rate",
              },
              {
                icon: CheckCircle,
                title: "Expert Selection",
                desc: "Our stone specialists hand-select materials to ensure only the finest quality reaches our clients.",
                stats: "20+ Years Experience",
              },
            ].map((item, index) => (
              <div key={index} className={`text-center scroll-animate stagger-${index + 1}`}>
                <div className="relative mb-6">
                  <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto floating-element">
                    <item.icon className="h-10 w-10 text-orange-500" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {item.stats}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Additional Quality Features */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 scroll-animate">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Why Our Stones Stand Out</h3>
                <div className="space-y-4">
                  {[
                    { icon: Truck, text: "Free delivery within 50 miles" },
                    { icon: Shield, text: "5-year warranty on all products" },
                    { icon: Award, text: "Industry-leading quality standards" },
                    { icon: CheckCircle, text: "Professional installation support" },
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="bg-orange-500 rounded-full p-2">
                        <feature.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-slate-700 font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-4xl font-bold text-orange-500 mb-2">15,000+</div>
                  <div className="text-slate-600 font-medium mb-4">Satisfied Customers</div>
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-500">Average 4.9/5 rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500 rounded-full floating-element"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-orange-400 rounded-full floating-element-delayed"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="scroll-animate max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Space?</h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Our stone experts are here to help you select the perfect materials for your project. Get professional
              advice and competitive pricing today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/contact">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-4 button-hover">
                  Get Expert Advice
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900 text-lg px-8 py-4 button-hover"
                >
                  View Our Services
                </Button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-orange-500" />
                <span>Free consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-orange-500" />
                <span>Competitive pricing</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-orange-500" />
                <span>Professional installation</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
