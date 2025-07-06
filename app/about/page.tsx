"use client"

import { CheckCircle, Users, Award, Clock, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

// IMAGE URLS - REPLACE WITH YOUR FIREBASE URLS
const IMAGE_URLS = {
  // Our Story Section
  ourStoryImage: "https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/Home%2FStory.png?alt=media&token=cae10c01-4051-4870-bbdc-9e3787454134", // Replace with company history/team image

  // Team Section
  kevinMuchiri: "https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/Home%2FKevinMuchiri.png?alt=media&token=690b045e-6057-418a-8401-5af71ef0dcc9", // Replace with Kevin Muchiri photo
  teamMember2: "/placeholder.svg?height=300&width=300", // Replace with Lead Architect photo
  teamMember3: "/placeholder.svg?height=300&width=300", // Replace with Construction Manager photo
}

export default function AboutPage() {
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

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
      `}</style>

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About BuildCraft</h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
            Building excellence for over 15 years with passion, precision, and unwavering commitment to quality
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-animate">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Story</h2>
              <p className="text-lg text-slate-600 mb-6">
                Founded in 2009, BuildCraft began as a small family-owned construction company with a simple mission: to
                build exceptional structures that stand the test of time. What started as a two-person operation has
                grown into a trusted team of over 50 skilled professionals.
              </p>
              <p className="text-lg text-slate-600 mb-6">
                Our journey has been marked by countless successful projects, from residential homes to commercial
                buildings, each one reflecting our commitment to quality craftsmanship and customer satisfaction.
              </p>
              <p className="text-lg text-slate-600">
                Today, we continue to push the boundaries of construction excellence, embracing new technologies while
                honoring traditional building techniques that have served us well.
              </p>
            </div>
            <div className="relative scroll-animate">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg opacity-20 blur"></div>
              <Image
                src={IMAGE_URLS.ourStoryImage || "/placeholder.svg"}
                alt="BuildCraft team and company history showcasing our journey since 2009"
                width={600}
                height={500}
                className="relative rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Values</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Excellence",
                desc: "We strive for perfection in every project, no matter the size or complexity.",
              },
              {
                icon: Shield,
                title: "Integrity",
                desc: "Honest communication and transparent practices in all our business dealings.",
              },
              {
                icon: Users,
                title: "Teamwork",
                desc: "Collaborative approach with clients, partners, and our internal team.",
              },
              {
                icon: Clock,
                title: "Reliability",
                desc: "Consistent delivery on time and within budget, every single time.",
              },
            ].map((value, index) => (
              <Card key={index} className={`text-center card-hover scroll-animate stagger-${index + 1}`}>
                <CardHeader>
                  <div className="mx-auto bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 service-icon">
                    <value.icon className="h-8 w-8 text-orange-500" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to bringing your vision to life
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Kevin Muchiri",
                role: "Founder & CEO",
                experience: "20+ years",
                image: IMAGE_URLS.kevinMuchiri,
              },
              {
                name: "Name 2",
                role: "Lead Architect",
                experience: "15+ years",
                image: IMAGE_URLS.teamMember2,
              },
              {
                name: "Name 3",
                role: "Construction Manager",
                experience: "18+ years",
                image: IMAGE_URLS.teamMember3,
              },
            ].map((member, index) => (
              <Card key={index} className={`text-center card-hover scroll-animate stagger-${index + 1}`}>
                <CardHeader>
                  <div className="relative mx-auto w-32 h-32 mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={`${member.name} - ${member.role} at BuildCraft`}
                      fill
                      className="rounded-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-orange-500 font-semibold">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{member.experience} of experience</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose BuildCraft?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">What sets us apart in the construction industry</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Licensed and fully insured professionals",
              "Comprehensive project management",
              "Quality materials and craftsmanship",
              "Competitive pricing and transparent quotes",
              "Excellent customer service and communication",
              "Warranty on all completed work",
              "Eco-friendly building practices",
              "Local expertise and community involvement",
            ].map((feature, index) => (
              <div key={index} className={`flex items-start space-x-3 scroll-animate stagger-${(index % 4) + 1}`}>
                <div className="bg-orange-500 rounded-full p-1 mt-1 service-icon">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-slate-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="scroll-animate">
            <h2 className="text-4xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your construction project and see how we can bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-3 button-hover">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900 text-lg px-8 py-3 button-hover"
                >
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
