"use client"

import { Hammer, Home, Palette, Users, CheckCircle, ArrowRight, Play, Pause, X, Maximize2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export default function ServicesPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)
  const [modalVideo, setModalVideo] = useState<number | null>(null)
  const [isModalPlaying, setIsModalPlaying] = useState(false)
  const [videoError, setVideoError] = useState<number | null>(null)
  const [videoLoading, setVideoLoading] = useState<number | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const modalVideoRef = useRef<HTMLVideoElement | null>(null)

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

    // Handle escape key to close modal
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal()
      }
    }

    document.addEventListener("keydown", handleEscape)

    return () => {
      observer.disconnect()
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  // Video data with Firebase URLs and custom poster images
  const videoData = [
    {
      src: "https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/videos%2FVid1.mp4?alt=media&token=1c8d1143-a642-43e0-a814-3468eae480bc",
      poster:
        "https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/thumbnails%2Fvid1-thumbnail.png?alt=media&token=c2d9c10a-58a4-47a5-b02f-c0d796e95013",
      title: "Construction Process",
      description: "Professional Building Techniques",
      fullDescription:
        "Watch our expert team demonstrate professional construction techniques. This video showcases our attention to detail and commitment to excellence in every project.",
      size: "5.97 MB",
      duration: "Construction Time-lapse",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/videos%2FVid2.mp4?alt=media&token=eea75842-2cb1-4ca9-8717-68ba33ebe2f6",
      poster:
        "https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/thumbnails%2Fvid2-thumbnail.png?alt=media&token=5f89ee86-e822-474b-aa91-2a28a53bf5ef",
      title: "Expert Craftsmanship",
      description: "Detailed Construction Work",
      fullDescription:
        "See our team at work, demonstrating the precision and expertise that sets BuildCraft apart in the construction industry. Every detail matters in our approach to building excellence.",
      size: "6.48 MB",
      duration: "Professional Showcase",
    },
  ]

  const handleVideoPlay = (index: number) => {
    // Always open modal for all screen sizes
    openModal(index)
  }

  const openModal = (index: number) => {
    setModalVideo(index)
    setPlayingVideo(null)
    setVideoError(null)
    setVideoLoading(null)
    // Pause all inline videos
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause()
      }
    })
    // Prevent body scroll
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause()
    }
    setModalVideo(null)
    setIsModalPlaying(false)
    setVideoError(null)
    setVideoLoading(null)
    // Restore body scroll
    document.body.style.overflow = "unset"
  }

  const toggleModalVideo = () => {
    if (modalVideoRef.current) {
      if (modalVideoRef.current.paused) {
        setVideoLoading(modalVideo)
        modalVideoRef.current
          .play()
          .then(() => {
            setIsModalPlaying(true)
            setVideoLoading(null)
          })
          .catch((error) => {
            console.error("Error playing modal video:", error)
            setVideoError(modalVideo)
            setVideoLoading(null)
          })
      } else {
        modalVideoRef.current.pause()
        setIsModalPlaying(false)
      }
    }
  }

  const handleVideoEnd = () => {
    setPlayingVideo(null)
  }

  const handleModalVideoEnd = () => {
    setIsModalPlaying(false)
  }

  const handleVideoError = (index: number) => {
    console.error(`Error loading video ${index}`)
    setVideoError(index)
    setVideoLoading(null)
  }

  const handleVideoLoadStart = (index: number) => {
    setVideoError(null)
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

      {/* Video Modal */}
      {modalVideo !== null && (
        <div className="video-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X className="w-5 h-5 text-white" />
            </button>

            <video
              ref={modalVideoRef}
              className="modal-video"
              onEnded={handleModalVideoEnd}
              onError={() => handleVideoError(modalVideo)}
              onLoadStart={() => handleVideoLoadStart(modalVideo)}
              poster={videoData[modalVideo].poster}
              onClick={toggleModalVideo}
              preload="metadata"
            >
              <source src={videoData[modalVideo].src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Modal Loading State */}
            {videoLoading === modalVideo && (
              <div className="video-loading">
                <div className="loading-spinner"></div>
                <p>Loading video...</p>
              </div>
            )}

            {/* Modal Error State */}
            {videoError === modalVideo && (
              <div className="video-error">
                <p>Unable to load video</p>
                <p className="text-xs mt-1">Please check your connection</p>
                <button
                  onClick={() => {
                    setVideoError(null)
                    toggleModalVideo()
                  }}
                  className="mt-2 px-3 py-1 bg-white text-red-600 rounded text-xs hover:bg-gray-100"
                >
                  Retry
                </button>
              </div>
            )}

            {!isModalPlaying && videoError !== modalVideo && videoLoading !== modalVideo && (
              <button className="modal-play-button" onClick={toggleModalVideo}>
                <Play className="w-8 h-8 text-white ml-1" />
              </button>
            )}

            <div className="modal-controls">
              <h3 className="text-2xl font-bold mb-2">{videoData[modalVideo].title}</h3>
              <p className="text-gray-300 mb-2">{videoData[modalVideo].description}</p>
              <p className="text-gray-400 text-sm mb-2">{videoData[modalVideo].fullDescription}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                {/*<span>Size: {videoData[modalVideo].size}</span>
                <span>•</span>*/}
                <span>{videoData[modalVideo].duration}</span>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  src="https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/thumbnails%2FImage1.png?alt=media&token=bf877912-55b3-4895-9de1-3fdae8d730f4"
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

            {/* Video 1 with Custom Poster */}
            <div className="media-item rounded-2xl overflow-hidden bg-white shadow-lg scroll-animate stagger-2">
              <div className="video-container relative h-64">
                <video
                  ref={(el) => (videoRefs.current[0] = el)}
                  className="w-full h-full object-cover"
                  onEnded={handleVideoEnd}
                  onError={() => handleVideoError(0)}
                  onLoadStart={() => handleVideoLoadStart(0)}
                  poster={videoData[0].poster}
                  preload="metadata"
                >
                  <source src={videoData[0].src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Duration Badge */}
                <div className="video-duration">{videoData[0].duration}</div>

                {/* Loading State */}
                {videoLoading === 0 && (
                  <div className="video-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading...</p>
                  </div>
                )}

                {/* Error message */}
                {videoError === 0 && (
                  <div className="video-error">
                    <p>Unable to load video</p>
                    <button
                      onClick={() => {
                        setVideoError(null)
                        handleVideoPlay(0)
                      }}
                      className="mt-2 px-3 py-1 bg-white text-red-600 rounded text-xs hover:bg-gray-100"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Expand button for all devices */}
                {videoError !== 0 && videoLoading !== 0 && (
                  <button className="expand-button flex" onClick={() => openModal(0)}>
                    <Maximize2 className="w-5 h-5 text-white" />
                  </button>
                )}

                {/* Play/Pause button */}
                {videoError !== 0 && videoLoading !== 0 && playingVideo !== 0 && (
                  <div className="play-button" onClick={() => handleVideoPlay(0)}>
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                )}
                {videoError !== 0 && videoLoading !== 0 && playingVideo === 0 && (
                  <div className="play-button" onClick={() => handleVideoPlay(0)}>
                    <Pause className="w-6 h-6 text-white" />
                  </div>
                )}

                <div className="media-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg">{videoData[0].title}</h3>
                    <p className="text-sm text-gray-200">{videoData[0].description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image 2 */}
            <div className="media-item rounded-2xl overflow-hidden bg-white shadow-lg scroll-animate stagger-3">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/thumbnails%2FRoomInstallation.jpg?alt=media&token=b7401e2c-dd73-4e3a-9465-37b7e6cc6ad7"
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

            {/* Image 3 */}
            <div className="media-item rounded-2xl overflow-hidden bg-white shadow-lg scroll-animate stagger-4">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/thumbnails%2FInteriorDesign.jpg?alt=media&token=cee7f9f8-88b4-4fe7-a8b7-1754c3d204ba"
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

            {/* Video 2 with Custom Poster */}
            <div className="media-item rounded-2xl overflow-hidden bg-white shadow-lg scroll-animate stagger-5">
              <div className="video-container relative h-64">
                <video
                  ref={(el) => (videoRefs.current[1] = el)}
                  className="w-full h-full object-cover"
                  onEnded={handleVideoEnd}
                  onError={() => handleVideoError(1)}
                  onLoadStart={() => handleVideoLoadStart(1)}
                  poster={videoData[1].poster}
                  preload="metadata"
                >
                  <source src={videoData[1].src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Duration Badge */}
                <div className="video-duration">{videoData[1].duration}</div>

                {/* Loading State */}
                {videoLoading === 1 && (
                  <div className="video-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading...</p>
                  </div>
                )}

                {/* Error message */}
                {videoError === 1 && (
                  <div className="video-error">
                    <p>Unable to load video</p>
                    <button
                      onClick={() => {
                        setVideoError(null)
                        handleVideoPlay(1)
                      }}
                      className="mt-2 px-3 py-1 bg-white text-red-600 rounded text-xs hover:bg-gray-100"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Expand button for all devices */}
                {videoError !== 1 && videoLoading !== 1 && (
                  <button className="expand-button flex" onClick={() => openModal(1)}>
                    <Maximize2 className="w-5 h-5 text-white" />
                  </button>
                )}

                {/* Play/Pause button */}
                {videoError !== 1 && videoLoading !== 1 && playingVideo !== 1 && (
                  <div className="play-button" onClick={() => handleVideoPlay(1)}>
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                )}
                {videoError !== 1 && videoLoading !== 1 && playingVideo === 1 && (
                  <div className="play-button" onClick={() => handleVideoPlay(1)}>
                    <Pause className="w-6 h-6 text-white" />
                  </div>
                )}

                <div className="media-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg">{videoData[1].title}</h3>
                    <p className="text-sm text-gray-200">{videoData[1].description}</p>
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
                  src="https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/pics%2FDesignServices.jpg?alt=media&token=e9df4b36-a34f-4dd7-ab45-0be111b86031"
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
                  src="https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/pics%2FConstruction.jpg?alt=media&token=58d59869-de93-434d-be75-2cef7ecbb013"
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
                  src="https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/pics%2FHouseDesign.png?alt=media&token=e9b068f6-930d-41b5-adad-5d35d8f4216d"
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
                  src="https://firebasestorage.googleapis.com/v0/b/test-3a5ee.appspot.com/o/pics%2FContracting.jpg?alt=media&token=efa01601-ffab-4c04-b48a-b48167c9a305"
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
