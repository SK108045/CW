"use client"

import type React from "react"

import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you soon.")
  }

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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .input-focus {
          transition: all 0.3s ease;
        }

        .input-focus:focus {
          transform: scale(1.02);
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
      `}</style>

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
            Ready to start your construction project? Get in touch for a free consultation and detailed quote.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Multiple ways to reach us - choose what works best for you
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Phone,
                title: "Call Us",
                info: "0791377076",
                desc: "Mon-Fri 8AM-6PM",
                action: "tel:+254791377076",
              },
              {
                icon: Mail,
                title: "Email Us",
                info: "info@buildcraft.com",
                desc: "24/7 Response",
                action: "mailto:info@buildcraft.com",
              },
              {
                icon: MapPin,
                title: "Visit Us",
                info: "Roisambu",
                desc: "Nairobi, Kenya",
                action: "#",
              },
              {
                icon: Clock,
                title: "Business Hours",
                info: "Mon-Fri: 8AM-6PM",
                desc: "Sat: 9AM-4PM",
                action: "#",
              },
            ].map((contact, index) => (
              <Card key={index} className={`text-center card-hover scroll-animate stagger-${index + 1}`}>
                <CardHeader>
                  <div className="mx-auto bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 service-icon">
                    <contact.icon className="h-8 w-8 text-orange-500" />
                  </div>
                  <CardTitle>{contact.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-slate-900 mb-2">{contact.info}</p>
                  <CardDescription>{contact.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="scroll-animate">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Request a Quote</h2>
              <p className="text-lg text-slate-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours with a detailed quote for your
                project.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                      First Name *
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="input-focus"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name *
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="input-focus"
                      placeholder="Luke"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="input-focus"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="input-focus"
                    placeholder="0791377076"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">
                    Service Needed
                  </label>
                  <Select onValueChange={(value) => handleInputChange("service", value)}>
                    <SelectTrigger className="input-focus">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">Design Services</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="house-design">House Design</SelectItem>
                      <SelectItem value="contracting">Contracting</SelectItem>
                      <SelectItem value="products">Building Stones</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Project Details *
                  </label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="input-focus"
                    placeholder="Please describe your project, timeline, budget range, and any specific requirements..."
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-orange-500 hover:bg-orange-600 button-hover">
                  Send Message <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Additional Information */}
            <div className="scroll-animate">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Choose BuildCraft?</h3>
              <div className="space-y-6 mb-8">
                {[
                  "Free initial consultation and project assessment",
                  "Detailed quotes with transparent pricing",
                  "Licensed and fully insured professionals",
                  "Quality guarantee on all work completed",
                  "Flexible scheduling to meet your timeline",
                  "Ongoing support throughout your project",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-orange-500 rounded-full p-1 mt-1 service-icon">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-slate-700">{benefit}</p>
                  </div>
                ))}
              </div>

              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-900">Emergency Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-800 mb-4">
                    Need urgent construction repairs or emergency services? We offer 24/7 emergency response for
                    critical situations.
                  </p>
                  <a href="tel:+254791377076" className="block mb-4">
                  <Button className="bg-orange-500 hover:bg-orange-600 button-hover">
                    <Phone className="mr-2 h-4 w-4" />
                    Emergency Hotline
                  </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Quick answers to common questions about our services and process
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How long does a typical construction project take?",
                answer:
                  "Project timelines vary based on scope and complexity. Residential projects typically take 3-6 months, while commercial projects can take 6-12 months. We provide detailed timelines during consultation.",
              },
              {
                question: "Do you provide free estimates?",
                answer:
                  "Yes! We offer free initial consultations and detailed estimates for all projects. Our team will assess your needs and provide transparent pricing with no hidden costs.",
              },
              {
                question: "Are you licensed and insured?",
                answer:
                  "Absolutely. BuildCraft is fully licensed, bonded, and insured. We carry comprehensive liability insurance and workers' compensation to protect both our team and your property.",
              },
              {
                question: "Can you help with permits and approvals?",
                answer:
                  "Yes, we handle all necessary permits and approvals as part of our comprehensive service. Our team is familiar with local building codes and regulations.",
              },
              {
                question: "What types of building stones do you offer?",
                answer:
                  "We offer a wide range including natural stones (granite, marble, limestone), engineered stones (quartz composites), and decorative stones (flagstone, river rock, stacked stone veneer).",
              },
              {
                question: "Do you offer warranties on your work?",
                answer:
                  "Yes, we provide comprehensive warranties on all our construction work. Warranty periods vary by project type, and we stand behind the quality of our craftsmanship.",
              },
            ].map((faq, index) => (
              <Card key={index} className={`card-hover scroll-animate stagger-${(index % 4) + 1}`}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      
{/* Map Section */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16 scroll-animate">
      <h2 className="text-4xl font-bold text-slate-900 mb-4">Visit Our Office</h2>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto">
        Stop by our showroom to see our building stone samples and discuss your project in person
      </p>
    </div>
    <div className="scroll-animate w-full overflow-hidden rounded-lg">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9633.960416055763!2d36.88073949910891!3d-1.224441175240348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f15f50d1a0797%3A0x534c1e7fc0deb560!2sRoysambu%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1751818605590!5m2!1sen!2ske"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full"
      />
    </div>
  </div>
</section>

    </div>
  )
}
