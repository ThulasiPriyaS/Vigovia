"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import videoFile from '../assets/video.mp4';
import AboutNewZealand from './AboutNewZealand';
import springIcon from '../assets/spring.png';
import summerIcon from '../assets/summer.png';
import autumnIcon from '../assets/autumn.png';
import winterIcon from '../assets/winter.png';


// Simple Office Hours List Component
const OfficeHoursList = () => {
    const days = [
        { name: "Monday", hours: "1 PM – 5 PM" },
        { name: "Tuesday", hours: "10 AM – 6 PM" },
        { name: "Wednesday", hours: "1 PM – 5 PM" },
        { name: "Thursday", hours: "10 AM – 6 PM" },
        { name: "Friday", hours: "1 PM – 5 PM" },
        { name: "Saturday", hours: "Closed" },
        { name: "Sunday", hours: "Closed" },
    ];
    // Get current day index (0=Sunday, 1=Monday, ... 6=Saturday)
    const todayIdx = new Date().getDay();
    return (
        <div className="space-y-3">
            {days.map((day) => {
                const isToday = days.indexOf(day) === ((todayIdx === 0) ? 6 : todayIdx - 1); // Map JS 0=Sunday to our 6=Sunday
                return (
                    <div key={day.name} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
                        <span className={`font-medium ${isToday ? 'text-red-600 font-bold' : 'text-gray-800'}`}>{day.name}</span>
                        <span className={`text-sm ${day.hours === 'Closed' || isToday ? 'text-red-600 font-semibold' : 'text-gray-700'}`}>{day.hours}</span>
                    </div>
                );
            })}
        </div>
    );
};

// Add this above the HeroPage component or inside it:
// type SeasonKey = keyof typeof seasonalData;

const HeroPage = () => {
    // Remove intro-related state
    // const [showIntro, setShowIntro] = useState(true);
    const [showContent, setShowContent] = useState(true); // Always true
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [bookingStep, setBookingStep] = useState(1);
    const [bookingSubmitted, setBookingSubmitted] = useState(false);
    const [bookingData, setBookingData] = useState({
        sessionType: '',
        preferredDay: '',
        preferredTime: '',
        urgency: '',
        previousTherapy: '',
        goals: '',
        name: '',
        email: '',
        phone: ''
    });
    const [bookingErrors, setBookingErrors] = useState<{[key: string]: string}>({});

    // Add seasonal modal state
    const [showSeasonalModal, setShowSeasonalModal] = useState(false);
    const [showSpringInfoModal, setShowSpringInfoModal] = useState(false);
    const [showSpringModal, setShowSpringModal] = useState(false);
    const seasonalData = {
        spring: {
            title: 'SPRING',
            icon: (
                <img src={springIcon} alt="Spring Icon" style={{ width: 40, height: 40 }} />
            ),
            sections: [
                {
                    title: 'Visa Validity Period',
                    items: [
                        'How Long The Visa Is Valid From The Date Of Issue.',
                        'The Difference Between Single-Entry, Double-Entry, And Multiple-Entry Visas.'
                    ]
                },
                {
                    title: 'Duration Of Stay',
                    items: [
                        'Maximum Length Of Stay Per Visit (E.G., 90 Days Within A 180-Day Period For Some Visas).',
                        'Rules For Short Stays, Long Stays, And Temporary Residence Visas.'
                    ]
                },
                {
                    title: 'Permitted Activities',
                    items: [
                        'What Activities Are Allowed Under The Visa (E.G., Work, Study, Tourism).',
                        'Restrictions On Working On Tourist Or Student Visas.'
                    ]
                },
                {
                    title: 'Entry Ban Or Restrictions',
                    items: [
                        'Certain Nationalities Or Individuals May Face Restrictions, Including Travel Bans Or Limited Stay Periods.',
                        'Conditions For Transit Visas And Whether They Allow Temporary Entry Into The Country.'
                    ]
                }
            ]
        },
        summer: {
            title: 'SUMMER',
            icon: (
                <img src={summerIcon} alt="Summer Icon" style={{ width: 40, height: 40 }} />
            ),
            sections: [
                {
                    title: 'Peak Season Information',
                    items: [
                        'Summer is the peak tourist season with higher prices and larger crowds.',
                        'Advance booking is highly recommended for accommodations and activities.'
                    ]
                },
                {
                    title: 'Weather Considerations',
                    items: [
                        'Hot and humid weather with occasional rain showers.',
                        'Best time for beach activities and water sports.'
                    ]
                },
                {
                    title: 'Cultural Events',
                    items: [
                        'Various festivals and cultural celebrations throughout the summer months.',
                        'Special seasonal activities and traditional ceremonies.'
                    ]
                },
                {
                    title: 'Travel Tips',
                    items: [
                        'Stay hydrated and use sun protection during outdoor activities.',
                        'Consider early morning or late afternoon visits to popular attractions.'
                    ]
                }
            ]
        },
        autumn: {
            title: 'AUTUMN',
            icon: (
                <img src={autumnIcon} alt="Autumn Icon" style={{ width: 40, height: 40 }} />
            ),
            sections: [
                {
                    title: 'Shoulder Season Benefits',
                    items: [
                        'Moderate temperatures and fewer crowds compared to peak season.',
                        'Better availability and more competitive pricing for accommodations.'
                    ]
                },
                {
                    title: 'Natural Beauty',
                    items: [
                        'Beautiful fall colors and changing landscapes.',
                        'Ideal weather for hiking and outdoor exploration.'
                    ]
                },
                {
                    title: 'Cultural Experiences',
                    items: [
                        'Harvest festivals and traditional autumn celebrations.',
                        'Local markets featuring seasonal produce and crafts.'
                    ]
                },
                {
                    title: 'Travel Planning',
                    items: [
                        'Flexible booking options with good availability.',
                        'Pleasant weather for both indoor and outdoor activities.'
                    ]
                }
            ]
        },
        winter: {
            title: 'WINTER',
            icon: (
                <img src={winterIcon} alt="Winter Icon" style={{ width: 40, height: 40 }} />
            ),
            sections: [
                {
                    title: 'Off-Season Advantages',
                    items: [
                        'Lowest prices and minimal crowds for a peaceful experience.',
                        'Excellent availability for last-minute bookings and upgrades.'
                    ]
                },
                {
                    title: 'Weather Conditions',
                    items: [
                        'Cooler temperatures and occasional rainfall.',
                        'Perfect for indoor cultural activities and spa experiences.'
                    ]
                },
                {
                    title: 'Unique Experiences',
                    items: [
                        'Winter-specific activities and seasonal traditions.',
                        'Intimate cultural experiences with fewer tourists.'
                    ]
                },
                {
                    title: 'Travel Considerations',
                    items: [
                        'Some outdoor activities may be weather-dependent.',
                        'Pack appropriate clothing for cooler temperatures.'
                    ]
                }
            ]
        }
    };
    type SeasonKey = keyof typeof seasonalData;
    const [selectedSeason, setSelectedSeason] = useState<SeasonKey | "">("");
    const [showReadmeModal, setShowReadmeModal] = useState(false);
    const [showSeasonModal, setShowSeasonModal] = useState<{open: boolean, season: string | null}>({open: false, season: null});
    const [showDestinationsModal, setShowDestinationsModal] = useState(false);

    const navigate = useNavigate();

    const handleSeasonalModal = (season: string) => {
        setSelectedSeason(season as SeasonKey);
        setShowSeasonalModal(true);
    };

    // Remove intro/content timers
    // useEffect(() => {
    //     const introTimer = setTimeout(() => {
    //         setShowIntro(false);
    //     }, 3000);
    //     const contentTimer = setTimeout(() => {
    //         setShowContent(true);
    //     }, 3500);
    //     return () => {
    //         clearTimeout(introTimer);
    //         clearTimeout(contentTimer);
    //     };
    // }, []);

    // Debug useEffect to monitor showBookingForm state
    useEffect(() => {
        console.log('showBookingForm state changed to:', showBookingForm);
    }, [showBookingForm]);

    // Carousel auto-scroll effect
    useEffect(() => {
        const carousel = document.getElementById('attractions-carousel');
        if (!carousel) return;

        let currentIndex = 0;
        const totalImages = 9; // Total number of images (7 original + 2 duplicates)
        const visibleImages = 5; // Number of images visible at once

        const scrollCarousel = () => {
            currentIndex++;
            
            // Calculate the translateX value for continuous left movement
            const translateX = -(currentIndex * (100 / visibleImages));
            carousel.style.transform = `translateX(${translateX}%)`;
            
            // When we've moved past all images, reset the position and continue
            if (currentIndex >= totalImages - visibleImages) {
                // Reset to show the first image again
                currentIndex = 0;
                carousel.style.transition = 'none';
                carousel.style.transform = 'translateX(0%)';
                // Force a reflow
                void carousel.offsetHeight;
                carousel.style.transition = 'transform 0.5s ease-in-out';
            }
        };

        // Auto-scroll every 3 seconds
        const interval = setInterval(scrollCarousel, 3000);

        return () => clearInterval(interval);
    }, []);

    const validateBookingStep = (step: number) => {
        const newErrors: {[key: string]: string} = {};
        
        if (step === 1) {
            if (!bookingData.sessionType) {
                newErrors.sessionType = 'Please select a session type';
            }
            if (!bookingData.preferredDay) {
                newErrors.preferredDay = 'Please select a preferred day';
            }
            if (!bookingData.preferredTime) {
                newErrors.preferredTime = 'Please select a preferred time';
            }
        } else if (step === 2) {
            if (!bookingData.goals.trim()) {
                newErrors.goals = 'Please tell us about your goals';
            }
        } else if (step === 3) {
            if (!bookingData.name.trim()) {
                newErrors.name = 'Name is required';
            }
            if (!bookingData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
            if (!bookingData.phone.trim()) {
                newErrors.phone = 'Phone number is required';
            }
        }
        
        setBookingErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (bookingStep < 3) {
            if (validateBookingStep(bookingStep)) {
                setBookingStep(bookingStep + 1);
            }
        } else {
            if (validateBookingStep(bookingStep)) {
                setBookingSubmitted(true);
                // Here you would typically send the data to your backend
                console.log('Booking submitted:', bookingData);
            }
        }
    };

    // const nextStep = () => {
    //     if (validateBookingStep(bookingStep)) {
    //         setBookingStep(bookingStep + 1);
    //     }
    // };

    const prevStep = () => {
        setBookingStep(Math.max(1, bookingStep - 1));
    };

    const [infoTab, setInfoTab] = useState<'important' | 'documents' | 'airline'>('important');

    return (
        <div className="relative min-h-screen">
            {/* SPRING INFO MODAL - always at the top level for proper overlay */}
            {showSpringInfoModal && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
                onClick={() => setShowSpringInfoModal(false)}
              >
                <div
                  className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 flex flex-col animate-fadeIn"
                  style={{ minWidth: 340 }}
                  onClick={e => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="spring-info-modal-title"
                >
                  <button
                    className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
                    onClick={() => setShowSpringInfoModal(false)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                  <h2 id="spring-info-modal-title" className="text-3xl font-extrabold text-blue-700 mb-2 tracking-tight">
                    Spring Travel Essentials
                  </h2>
                  <p className="text-gray-700 mb-6 text-lg">
                    Discover everything you need to know for a smooth and memorable Spring journey. From visa rules to what you can do, we've got you covered!
                  </p>
                  <div className="w-full flex flex-col gap-5">
                    <div className="bg-blue-50 rounded-lg p-4 shadow-sm">
                      <div className="font-bold text-blue-800 mb-1">Visa Validity</div>
                      <div className="text-gray-700 text-sm">Your visa is valid from the date of issue. Be sure to check if you have a single, double, or multiple-entry visa for your travel plans.</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 shadow-sm">
                      <div className="font-bold text-green-800 mb-1">Duration of Stay</div>
                      <div className="text-gray-700 text-sm">Most visas allow a maximum stay per visit (e.g., 90 days within a 180-day period). Review your visa type for specific rules.</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 shadow-sm">
                      <div className="font-bold text-yellow-800 mb-1">Permitted Activities</div>
                      <div className="text-gray-700 text-sm">Tourism, study, or work? Make sure your visa covers your planned activities. Restrictions may apply for work or study on tourist visas.</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 shadow-sm">
                      <div className="font-bold text-red-800 mb-1">Entry Bans & Restrictions</div>
                      <div className="text-gray-700 text-sm">Some nationalities may face travel bans or limited stay periods. Always check for the latest entry requirements and transit rules.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Video Banner */}
            <div style={{ width: '100vw', height: '44vw', maxWidth: '100%', overflow: 'hidden', marginTop: 0, position: 'relative' }}>
                <video
                  src={videoFile}
                  autoPlay
                  loop
                  muted
                  style={{ width: '100vw', height: 'calc(100vh - 10px)', objectFit: 'cover', display: 'block' }}
                />
                {/* Overlayed Title and Subtitle */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  color: 'white',
                  textAlign: 'center',
                  pointerEvents: 'none',
                  marginTop: '8%',
                }}>
                  <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '0.5rem', color: 'white', background: 'none', border: 'none', boxShadow: 'none', textAlign: 'center' }}>
                    All About Bali
                                </h1>
                  <p style={{ fontSize: '1.5rem', maxWidth: 900, color: 'white', background: 'none', border: 'none', boxShadow: 'none', margin: 0, textAlign: 'center' }}>
                    Discover Bali: An Island of Tranquil Beaches, Vibrant Culture, and Spiritual Journeys
                                </p>
                            </div>
            </div>
            {/* About New Zealand Section */}
            <AboutNewZealand />
            
            {/* All Tours Section */}
            <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#000', margin: 0 }}>
                  All <span style={{ color: '#541c9c' }}>Tours</span>
                </h2>
              </div>
              
              {/* Tours Table */}
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr',
                gap: '16px',
                maxWidth: '100%'
              }}>
                {/* Tour Name Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Header */}
                  <div style={{ 
                    background: '#321E5D', 
                    padding: '20px 24px',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    borderRadius: '16px',
                    textAlign: 'left'
                  }}>
                    Tour Name
                  </div>
                  {/* Data Rows */}
                  {[
                    { name: 'Tour ABC', featured: false },
                    { name: 'Tour ABC', featured: false },
                    { name: 'Tour ABC', featured: true },
                    { name: 'Tour ABC', featured: false },
                    { name: 'Tour ABC', featured: false },
                    { name: 'Tour ABC', featured: false },
                  ].map((tour, index) => (
                    <div key={index} style={{
                      padding: '20px 24px',
                      background: '#FBF4FF',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontWeight: tour.featured ? 600 : 400
                    }}>
                      {tour.featured && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#541c9c">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      )}
                      {tour.name}
                    </div>
                  ))}
                </div>

                {/* Duration Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Header */}
                  <div style={{ 
                    background: '#321E5D', 
                    padding: '20px 24px',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    borderRadius: '16px',
                    textAlign: 'center'
                  }}>
                    Duration
                  </div>
                  {/* Data Rows */}
                  {[
                    { duration: '7 Days 8 Nights', featured: false },
                    { duration: '7 Days 8 Nights', featured: false },
                    { duration: '7 Days 8 Nights', featured: true },
                    { duration: '7 Days 8 Nights', featured: false },
                    { duration: '7 Days 8 Nights', featured: false },
                    { duration: '7 Days 8 Nights', featured: false },  
                  ].map((tour, index) => (
                    <div key={index} style={{
                      padding: '20px 24px',
                      background: '#FBF4FF',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      textAlign: 'center',
                      fontWeight: tour.featured ? 600 : 400
                    }}>
                      {tour.duration}
                    </div>
                  ))}
                </div>

                {/* Rates Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Header */}
                  <div style={{ 
                    background: '#321E5D', 
                    padding: '20px 24px',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    borderRadius: '16px',
                    textAlign: 'right'
                  }}>
                    Rates
                  </div>
                  {/* Data Rows */}
                  {[
                    { rate: '₹50,000', featured: false },
                    { rate: '₹50,000', featured: false },
                    { rate: '₹50,000', featured: true },
                    { rate: '₹50,000', featured: false },
                    { rate: '₹50,000', featured: false },
                    { rate: '₹50,000', featured: false },
                  ].map((tour, index) => (
                    <div key={index} style={{
                      padding: '20px 24px',
                      background: '#FBF4FF',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      textAlign: 'right',
                      fontWeight: tour.featured ? 600 : 400
                    }}>
                      {tour.rate}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Must-Know Information Section */}
            <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ marginBottom: '0px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#000', margin: 0 }}>
                  Must-Know <span style={{ color: '#541c9c' }}>Information</span>
                </h2>
              </div>
              
              {/* Tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                <div
                  style={{
                    background: infoTab === 'important' ? '#541c9c' : 'white',
                    color: infoTab === 'important' ? 'white' : '#000',
                  padding: '10px 24px',
                  borderRadius: '50px',
                  fontWeight: 600,
                  cursor: 'pointer',
                    fontSize: '0.9rem',
                    border: infoTab === 'important' ? 'none' : '1px solid #541c9c',
                  }}
                  onClick={() => setInfoTab('important')}
                >
                  Important Info
                </div>
                <div
                  style={{
                    background: infoTab === 'documents' ? '#541c9c' : 'white',
                    color: infoTab === 'documents' ? 'white' : '#000',
                  padding: '10px 24px',
                  borderRadius: '50px',
                  fontWeight: 600,
                  cursor: 'pointer',
                    fontSize: '0.9rem',
                    border: infoTab === 'documents' ? 'none' : '1px solid #541c9c',
                  }}
                  onClick={() => setInfoTab('documents')}
                >
                  Documents Required
                </div>
                <div
                  style={{
                    background: infoTab === 'airline' ? '#541c9c' : 'white',
                    color: infoTab === 'airline' ? 'white' : '#000',
                  padding: '10px 24px',
                  borderRadius: '50px',
                  fontWeight: 600,
                  cursor: 'pointer',
                    fontSize: '0.9rem',
                    border: infoTab === 'airline' ? 'none' : '1px solid #541c9c',
                  }}
                  onClick={() => setInfoTab('airline')}
                >
                  Airline Guidelines
                </div>
              </div>
              
              {/* Content Box */}
              {infoTab === 'important' && (
              <div style={{ 
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                {/* Visa Validity Period */}
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ 
                    fontSize: '1rem', 
                    fontWeight: 600, 
                    color: '#000', 
                    margin: '0 0 12px 0',
                    textAlign: 'left'
                  }}>
                    Visa Validity Period
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '24px', textAlign: 'left' }}>
                    <li style={{ marginBottom: '4px', color: '#000' }}>
                      How long the visa is valid from the date of issue
                    </li>
                    <li style={{ marginBottom: '4px', color: '#000' }}>
                      The difference between single-entry double-entry and multiple-entry visas
                    </li>
                  </ul>
                </div>
                {/* Duration of Stay */}
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ 
                    fontSize: '1rem', 
                    fontWeight: 600, 
                    color: '#000', 
                    margin: '0 0 12px 0',
                    textAlign: 'left'
                  }}>
                    Duration of Stay
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '24px', textAlign: 'left' }}>
                    <li style={{ marginBottom: '4px', color: '#000' }}>
                      Maximum length of stay per visit (e.g. 90 days within a 180-day period for some visas).
                    </li>
                    <li style={{ marginBottom: '4px', color: '#000' }}>
                      Rules for short stays long stays and temporary residence visas
                    </li>
                  </ul>
                </div>
                {/* Permitted Activities */}
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ 
                    fontSize: '1rem', 
                    fontWeight: 600, 
                    color: '#000', 
                    margin: '0 0 12px 0',
                    textAlign: 'left'
                  }}>
                    Permitted Activities
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '24px', textAlign: 'left' }}>
                    <li style={{ marginBottom: '4px', color: '#000' }}>
                      What activities are allowed under the visa (e.g. work study tourism).
                    </li>
                    <li style={{ marginBottom: '4px', color: '#000' }}>
                      Restrictions on working on tourist or student visas
                    </li>
                  </ul>
                </div>
                {/* Entry Ban or Restrictions */}
                <div>
                  <h3 style={{ 
                    fontSize: '1rem', 
                    fontWeight: 600, 
                    color: '#000', 
                    margin: '0 0 12px 0',
                    textAlign: 'left'
                  }}>
                    Entry Ban or Restrictions
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '24px', textAlign: 'left' }}>
                    <li style={{ marginBottom: '4px', color: '#000' }}>
                      Certain nationalities or individuals may face restrictions, including travel bans or limited stay periods.
                    </li>
                    <li style={{ marginBottom: '4px', color: '#000' }}>
                      Conditions for transit visas and whether they allow temporary entry into the country.
                    </li>
                  </ul>
                </div>
              </div>
              )}
              {infoTab === 'documents' && (
                <div style={{ 
                  background: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#000', margin: '0 0 12px 0', textAlign: 'left' }}>
                    Documents Required for Bali Visa
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '24px', textAlign: 'left' }}>
                    <li style={{ marginBottom: '4px', color: '#000' }}>Valid passport with at least 6 months validity from date of arrival</li>
                    <li style={{ marginBottom: '4px', color: '#000' }}>Completed visa application form</li>
                    <li style={{ marginBottom: '4px', color: '#000' }}>Recent passport-size photographs</li>
                    <li style={{ marginBottom: '4px', color: '#000' }}>Proof of accommodation (hotel booking or invitation letter)</li>
                    <li style={{ marginBottom: '4px', color: '#000' }}>Proof of sufficient funds for stay</li>
                    <li style={{ marginBottom: '4px', color: '#000' }}>Confirmed return or onward flight ticket</li>
                    <li style={{ marginBottom: '4px', color: '#000' }}>Travel insurance (if required)</li>
                  </ul>
                </div>
              )}
              {infoTab === 'airline' && (
                <div style={{ 
                  background: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#000', margin: '0 0 12px 0', textAlign: 'left' }}>
                    Airline Guidelines
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '24px', textAlign: 'left' }}>
                    <li style={{ marginBottom: '4px', color: '#000' }}>Check-in at least 2 hours before departure</li>
                    <li style={{ marginBottom: '4px', color: '#000' }}>Carry a printed or digital copy of your ticket and visa</li>
                    <li style={{ marginBottom: '4px', color: '#000' }}>Follow airline baggage and safety regulations</li>
                    <li style={{ marginBottom: '4px', color: '#000' }}>Comply with COVID-19 protocols (if any)</li>
                  </ul>
                </div>
              )}
            </div>
            
            {/* Bali Attractions Section */}
            <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#000', margin: 0 }}>
                  Top Activities and <span style={{ color: '#541c9c' }}>Attractions</span>
                </h2>
              </div>
              
              {/* Attractions Carousel */}
              <div style={{ 
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px'
              }}>
                <div 
                  id="attractions-carousel"
                  style={{ 
                    display: 'flex',
                    transition: 'transform 0.5s ease-in-out',
                    gap: '16px'
                  }}
                >
                  {/* Kelingking Beach */}
                  <div style={{ 
                    minWidth: 'calc(20% - 12.8px)',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ 
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}>
                      <img 
                        src="https://images.unsplash.com/photo-1714577010622-5a379500a503?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Kelingking Beach"
                        style={{ 
                          width: '100%', 
                          height: '300px', 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease-in-out',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(-10px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      />
                    </div>
                    <h3 style={{
                      color: '#333',
                      fontSize: '0.9rem',
                      fontWeight: 400,
                      textAlign: 'center',
                      margin: 0,
                      fontFamily: '"Helvetica Neue", "Segoe UI", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      Kelingking Beach
                    </h3>
                  </div>

                  {/* Ulun Danu Beratan Temple */}
                  <div style={{ 
                    minWidth: 'calc(20% - 12.8px)',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ 
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}>
                      <img 
                        src="https://images.unsplash.com/photo-1680094513147-a9b7ce9b209b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Ulun Danu Beratan Temple"
                        style={{ 
                          width: '100%', 
                          height: '300px', 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease-in-out',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(-10px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      />
                    </div>
                    <h3 style={{
                      color: '#333',
                      fontSize: '0.9rem',
                      fontWeight: 400,
                      textAlign: 'center',
                      margin: 0,
                      fontFamily: '"Helvetica Neue", "Segoe UI", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      Ulun Danu Beratan Temple
                    </h3>
                  </div>

                  {/* Lempuyang Temple */}
                  <div style={{ 
                    minWidth: 'calc(20% - 12.8px)',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ 
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}>
                      <img 
                        src="https://images.unsplash.com/photo-1575573330964-db3dad170190?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Lempuyang Temple"
                        style={{ 
                          width: '100%', 
                          height: '300px', 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease-in-out',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(-10px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      />
                    </div>
                    <h3 style={{
                      color: '#333',
                      fontSize: '0.9rem',
                      fontWeight: 400,
                      textAlign: 'center',
                      margin: 0,
                      fontFamily: '"Helvetica Neue", "Segoe UI", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      Lempuyang Temple
                    </h3>
                  </div>

                  {/* Sekumpul Waterfall */}
                  <div style={{ 
                    minWidth: 'calc(20% - 12.8px)',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ 
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}>
                      <img 
                        src="https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Sekumpul Waterfall"
                        style={{ 
                          width: '100%', 
                          height: '300px', 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease-in-out',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(-10px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      />
                    </div>
                    <h3 style={{
                      color: '#333',
                      fontSize: '0.9rem',
                      fontWeight: 400,
                      textAlign: 'center',
                      margin: 0,
                      fontFamily: '"Helvetica Neue", "Segoe UI", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      Sekumpul Waterfall
                    </h3>
                  </div>

                  {/* Abian Desa Rice Terrace */}
                  <div style={{ 
                    minWidth: 'calc(20% - 12.8px)',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ 
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}>
                      <img 
                        src="https://images.unsplash.com/photo-1735991088706-08d545e36ee6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Abian Desa Rice Terrace"
                        style={{ 
                          width: '100%', 
                          height: '300px', 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease-in-out',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(-10px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      />
                    </div>
                    <h3 style={{
                      color: '#333',
                      fontSize: '0.9rem',
                      fontWeight: 400,
                      textAlign: 'center',
                      margin: 0,
                      fontFamily: '"Helvetica Neue", "Segoe UI", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      Abian Desa Rice Terrace
                    </h3>
                  </div>

                  {/* New Image 1 - Bali Beach */}
                  <div style={{ 
                    minWidth: 'calc(20% - 12.8px)',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ 
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}>
                      <img 
                        src="https://images.unsplash.com/photo-1642378327252-c235b8c60824?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Bali Beach"
                        style={{ 
                          width: '100%', 
                          height: '300px', 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease-in-out',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(-10px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      />
                    </div>
                    <h3 style={{
                      color: '#333',
                      fontSize: '0.9rem',
                      fontWeight: 400,
                      textAlign: 'center',
                      margin: 0,
                      fontFamily: '"Helvetica Neue", "Segoe UI", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      Bali Beach
                    </h3>
                  </div>

                  {/* New Image 2 - Bali Sunset */}
                  <div style={{ 
                    minWidth: 'calc(20% - 12.8px)',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ 
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}>
                      <img 
                        src="https://images.unsplash.com/photo-1736259762030-69d6ccff5cca?q=80&w=676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Bali Sunset"
                        style={{ 
                          width: '100%', 
                          height: '300px', 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease-in-out',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(-10px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      />
                    </div>
                    <h3 style={{
                      color: '#333',
                      fontSize: '0.9rem',
                      fontWeight: 400,
                      textAlign: 'center',
                      margin: 0,
                      fontFamily: '"Helvetica Neue", "Segoe UI", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      Bali Sunset
                    </h3>
                  </div>

                  {/* Duplicate first 2 images for seamless looping */}
                  {/* Kelingking Beach (duplicate) */}
                  <div style={{ 
                    minWidth: 'calc(20% - 12.8px)',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ 
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}>
                      <img 
                        src="https://images.unsplash.com/photo-1714577010622-5a379500a503?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Kelingking Beach"
                        style={{ 
                          width: '100%', 
                          height: '300px', 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease-in-out',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(-10px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      />
                    </div>
                    <h3 style={{
                      color: '#333',
                      fontSize: '0.9rem',
                      fontWeight: 400,
                      textAlign: 'center',
                      margin: 0,
                      fontFamily: '"Helvetica Neue", "Segoe UI", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      Kelingking Beach
                    </h3>
                  </div>

                  {/* Ulun Danu Beratan Temple (duplicate) */}
                  <div style={{ 
                    minWidth: 'calc(20% - 12.8px)',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ 
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}>
                      <img 
                        src="https://images.unsplash.com/photo-1680094513147-a9b7ce9b209b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Ulun Danu Beratan Temple"
                        style={{ 
                          width: '100%', 
                          height: '300px', 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease-in-out',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(-10px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      />
                    </div>
                    <h3 style={{
                      color: '#333',
                      fontSize: '0.9rem',
                      fontWeight: 400,
                      textAlign: 'center',
                      margin: 0,
                      fontFamily: '"Helvetica Neue", "Segoe UI", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      Ulun Danu Beratan Temple
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Special Seasonal Info Section */}
            <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#000', margin: 0 }}>
                  Special <span style={{ color: '#541c9c' }}>Seasonal Info</span>
                </h2>
              </div>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px',
                maxWidth: '100%'
              }}>
                {['Spring', 'Summer', 'Autumn', 'Winter'].map((season) => (
                  <div key={season} style={{ 
                  background: 'white',
                  borderRadius: '16px',
                  padding: '32px 24px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '20px',
                  border: '1px solid #f0f0f0'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: '#541c9c',
                    display: 'flex',
                    alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}>
                      {season === 'Spring' && (
                        <img src={springIcon} alt="Spring Icon" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                      )}
                      {season === 'Summer' && (
                        <img src={summerIcon} alt="Summer Icon" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                      )}
                      {season === 'Autumn' && (
                        <img src={autumnIcon} alt="Autumn Icon" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                      )}
                      {season === 'Winter' && (
                        <img src={winterIcon} alt="Winter Icon" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                      )}
                  </div>
                  <h3 style={{
                    color: '#666',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textAlign: 'center',
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                      {season}
                  </h3>
                  <button 
                      className="mt-4 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow hover:from-green-500 hover:to-blue-600 transition"
                      onClick={() => setShowSeasonModal({open: true, season})}
                    >
                    Read More
                  </button>
                </div>
                ))}
              </div>
            </div>
            {/* Blogs Related To Bali Section (blog card layout) */}
            <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#000', margin: 0 }}>
                  Blogs Related To <span style={{ color: '#541c9c' }}>Bali</span>
                </h2>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: '#fff',
                    border: 'none',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    color: '#541c9c',
                    fontSize: 22,
                  display: 'flex',
                  alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'background 0.2s'
                  }} aria-label="Previous">
                    {'<'}
                  </button>
                  <button style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: '#fff',
                    border: 'none',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    color: '#541c9c',
                    fontSize: 22,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                      cursor: 'pointer',
                    outline: 'none',
                    transition: 'background 0.2s'
                  }} aria-label="Next">
                    {'>'}
                  </button>
                </div>
              </div>
                <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px',
                maxWidth: '100%'
              }}>
                {['Spring', 'Summer', 'Autumn', 'Winter'].map((season) => (
                  <div key={season} style={{ 
                  background: 'white',
                  borderRadius: '16px',
                    padding: '0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                    alignItems: 'stretch',
                    border: '1px solid #f0f0f0',
                    height: '420px',
                    overflow: 'hidden'
                  }}>
                    {/* Upper part: gray background */}
                  <div style={{
                      background: '#f3f3f3',
                      height: '58%',
                      minHeight: 140,
                      width: '100%'
                    }} />
                    {/* Lower part: blog content */}
                <div style={{ 
                      flex: 1,
                  background: 'white',
                      padding: '24px 20px 20px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '42%'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 8 }}>
                        <span style={{ color: '#888', fontSize: 15, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <svg width="18" height="18" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24" style={{marginRight: 4}}><path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/><path d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4Z"/></svg>
                          By admin
                        </span>
                        <span style={{ color: '#888', fontSize: 15, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <svg width="18" height="18" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24" style={{marginRight: 4}}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/></svg>
                          Comments (05)
                        </span>
                  </div>
                      <div>
                        <h3 style={{ color: '#351c5c', fontWeight: 600, fontSize: 18, margin: '8px 0 6px 0', lineHeight: 1.2 }}>
                          Journeys of Discovery Uncovering Hidden Treasures
                  </h3>
                        <div style={{ color: '#888', fontWeight: 400, fontSize: 15, marginBottom: 18, lineHeight: 1.4 }}>
                          "Aliquam eros justo, posuere loborti viverra laoreet matti ullamcorper posuere viverra .Aliquam eros justo, posuere lobortis  viverra..."
                        </div>
                        <button style={{
                          background: '#351c5c',
                      color: 'white',
                      fontWeight: 600,
                          fontSize: 20,
                          border: 'none',
                          borderRadius: 999,
                          padding: '12px 40px',
                          marginTop: 12,
                      cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(80,40,120,0.08)'
                        }}>
                          View
                  </button>
                </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Main Content - show immediately, remove intro screen */}
            <div className="relative z-10">
                {/* Main Content */}
                <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Hero Section Centered */}
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="w-full max-w-6xl px-6">
                            {/* Headline Section */}
                            {/* Removed Vigovia title, subtitle, and image */}
                        </div>
                    </div>

                    {/* Seasonal Info Modal */}
                    {showSeasonalModal && selectedSeason && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="relative bg-white border-4 border-purple-700 rounded-2xl shadow-xl max-w-lg w-full p-8 flex flex-col items-center">
                                        <button 
                            className="absolute top-4 right-4 text-2xl text-purple-700 hover:text-purple-900"
                                            onClick={() => setShowSeasonalModal(false)}
                            aria-label="Close"
                                        >
                                            ×
                                        </button>
                          <div className="w-20 h-20 rounded-full bg-purple-700 flex items-center justify-center -mt-16 mb-4 shadow-lg">
                            {seasonalData[selectedSeason as SeasonKey].icon}
                                    </div>
                          <h2 className="text-xl font-bold mb-4 text-purple-700 uppercase tracking-wider">
                            {seasonalData[selectedSeason as SeasonKey].title}
                          </h2>
                          {seasonalData[selectedSeason as SeasonKey].sections.map((section, idx) => (
                            <div key={idx} className="mb-4 text-center">
                              <div className="font-semibold text-gray-900 mb-1">{section.title}</div>
                              <ul className="text-sm text-gray-700">
                                {section.items.map((item, i) => (
                                  <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                          {/* README Button */}
                          <button
                            className="mt-4 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition"
                            onClick={() => setShowReadmeModal(true)}
                          >
                            README
                          </button>
                                    </div>
                                </div>
                    )}
                    {/* README Modal (overlaid) */}
                    {showReadmeModal && selectedSeason && (
                      <div
                        className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-60"
                        tabIndex={-1}
                        onKeyDown={e => {
                          if (e.key === "Escape") setShowReadmeModal(false);
                        }}
                      >
                        <div
                          className="relative bg-white border-4 border-purple-700 rounded-2xl shadow-2xl max-w-md w-full p-8 grid gap-6"
                          role="dialog"
                          aria-modal="true"
                          aria-labelledby="readme-modal-title"
                        >
                          <button
                            className="absolute top-4 right-4 text-2xl text-purple-700 hover:text-purple-900"
                            onClick={() => setShowReadmeModal(false)}
                            aria-label="Close"
                          >
                            ×
                          </button>
                          <h2 id="readme-modal-title" className="text-2xl font-bold text-purple-700 mb-2">
                            README
                          </h2>
                          <p className="text-gray-700 mb-4">
                            {/* Place your README or extra info here */}
                            This is the README modal. You can add any content, images, or links here.
                          </p>
                          {/* Example: */}
                          <ul className="list-disc list-inside text-sm text-gray-700">
                            <li>Point 1 about {seasonalData[selectedSeason as SeasonKey].title}</li>
                            <li>Point 2 about {seasonalData[selectedSeason as SeasonKey].title}</li>
                            <li>Etc.</li>
                          </ul>
                            </div>
                        </div>
                    )}

                    {/* Booking Form Modal */}
                    {showBookingForm && (
                        <>
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
                            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="p-8">
                                    {/* Success Message */}
                                    {bookingSubmitted ? (
                                        <div className="text-center py-12">
                                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full mb-6">
                                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
                                            <p className="text-gray-600 mb-4">Your booking request has been submitted. We will contact you within 24 hours to confirm your appointment.</p>
                                            <p className="text-gray-700 font-medium mb-8">Great courage from your side for taking this step!</p>
                                            <button 
                                                onClick={() => {
                                                    setShowBookingForm(false);
                                                    setBookingSubmitted(false);
                                                    setBookingStep(1);
                                                    setBookingData({
                                                        sessionType: '',
                                                        preferredDay: '',
                                                        preferredTime: '',
                                                        urgency: '',
                                                        previousTherapy: '',
                                                        goals: '',
                                                        name: '',
                                                        email: '',
                                                        phone: ''
                                                    });
                                                }}
                                                className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Header */}
                                            <div className="flex justify-between items-center mb-8">
                                                <h2 className="text-3xl font-bold text-gray-900">Book Your Session</h2>
                                                <button 
                                                    onClick={() => setShowBookingForm(false)}
                                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                                >
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="mb-8">
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-600">Step {bookingStep} of 3</span>
                                                    <span className="text-sm font-medium text-gray-600">{Math.round((bookingStep / 3) * 100)}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className="bg-black h-2 rounded-full transition-all duration-300" 
                                                        style={{ width: `${(bookingStep / 3) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <form onSubmit={handleBookingSubmit}>
                                                {/* Step 1: Session Type and Preferences */}
                                                {bookingStep === 1 && (
                                                    <div className="space-y-6">
                                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Session Preferences</h3>
                                                        
                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                                What type of session are you interested in? *
                                                            </label>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                                                                    bookingErrors.sessionType ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-black'
                                                                }`}>
                                                                    <input
                                                                        type="radio"
                                                                        name="sessionType"
                                                                        value="individual"
                                                                        checked={bookingData.sessionType === 'individual'}
                                                                        onChange={(e) => {
                                                                            setBookingData({...bookingData, sessionType: e.target.value});
                                                                            if (bookingErrors.sessionType) {
                                                                                setBookingErrors({...bookingErrors, sessionType: ''});
                                                                            }
                                                                        }}
                                                                        className="mr-3"
                                                                    />
                                                                    <div>
                                                                        <div className="font-medium text-gray-900">Individual Session</div>
                                                                        <div className="text-sm text-gray-600">One-on-one therapy</div>
                                                                    </div>
                                                                </label>
                                                                <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                                                                    bookingErrors.sessionType ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-black'
                                                                }`}>
                                                                    <input
                                                                        type="radio"
                                                                        name="sessionType"
                                                                        value="couples"
                                                                        checked={bookingData.sessionType === 'couples'}
                                                                        onChange={(e) => {
                                                                            setBookingData({...bookingData, sessionType: e.target.value});
                                                                            if (bookingErrors.sessionType) {
                                                                                setBookingErrors({...bookingErrors, sessionType: ''});
                                                                            }
                                                                        }}
                                                                        className="mr-3"
                                                                    />
                                                                    <div>
                                                                        <div className="font-medium text-gray-900">Couples Session</div>
                                                                        <div className="text-sm text-gray-600">Relationship therapy</div>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                            {bookingErrors.sessionType && (
                                                                <p className="mt-2 text-sm text-red-600">{bookingErrors.sessionType}</p>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                                Preferred day of the week *
                                                            </label>
                                                            <select
                                                                value={bookingData.preferredDay}
                                                                onChange={(e) => {
                                                                    setBookingData({...bookingData, preferredDay: e.target.value});
                                                                    if (bookingErrors.preferredDay) {
                                                                        setBookingErrors({...bookingErrors, preferredDay: ''});
                                                                    }
                                                                }}
                                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 ${
                                                                    bookingErrors.preferredDay ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                                }`}
                                                            >
                                                                <option value="">Select a day</option>
                                                                <option value="monday">Monday (1 PM - 5 PM)</option>
                                                                <option value="tuesday">Tuesday (10 AM - 6 PM)</option>
                                                                <option value="wednesday">Wednesday (1 PM - 5 PM)</option>
                                                                <option value="thursday">Thursday (10 AM - 6 PM)</option>
                                                                <option value="friday">Friday (1 PM - 5 PM)</option>
                                                            </select>
                                                            {bookingErrors.preferredDay && (
                                                                <p className="mt-2 text-sm text-red-600">{bookingErrors.preferredDay}</p>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                                Preferred time *
                                                            </label>
                                                            <select
                                                                value={bookingData.preferredTime}
                                                                onChange={(e) => {
                                                                    setBookingData({...bookingData, preferredTime: e.target.value});
                                                                    if (bookingErrors.preferredTime) {
                                                                        setBookingErrors({...bookingErrors, preferredTime: ''});
                                                                    }
                                                                }}
                                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 ${
                                                                    bookingErrors.preferredTime ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                                }`}
                                                            >
                                                                <option value="">Select a time</option>
                                                                <option value="morning">Morning (10 AM - 12 PM)</option>
                                                                <option value="afternoon">Afternoon (1 PM - 3 PM)</option>
                                                                <option value="late-afternoon">Late Afternoon (3 PM - 5 PM)</option>
                                                                <option value="evening">Evening (5 PM - 6 PM)</option>
                                                            </select>
                                                            {bookingErrors.preferredTime && (
                                                                <p className="mt-2 text-sm text-red-600">{bookingErrors.preferredTime}</p>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                                How urgent is your need for therapy? *
                                                            </label>
                                                            <select
                                                                value={bookingData.urgency}
                                                                onChange={(e) => {
                                                                    setBookingData({...bookingData, urgency: e.target.value});
                                                                }}
                                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                                                            >
                                                                <option value="">Select urgency level</option>
                                                                <option value="low">Low - I can wait a few weeks</option>
                                                                <option value="medium">Medium - Within the next few weeks</option>
                                                                <option value="high">High - As soon as possible</option>
                                                            </select>
                                                        </div>

                                                        <div className="flex justify-end">
                                                            <button
                                                                type="submit"
                                                                className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300"
                                                            >
                                                                Next
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Step 2: Background and Goals */}
                                                {bookingStep === 2 && (
                                                    <div className="space-y-6">
                                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Tell Us About Yourself</h3>
                                                        
                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                                Have you had therapy before? *
                                                            </label>
                                                            <select
                                                                value={bookingData.previousTherapy}
                                                                onChange={(e) => {
                                                                    setBookingData({...bookingData, previousTherapy: e.target.value});
                                                                }}
                                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                                                            >
                                                                <option value="">Select an option</option>
                                                                <option value="yes">Yes, I have experience with therapy</option>
                                                                <option value="no">No, this would be my first time</option>
                                                                <option value="some">Some experience, but it&apos;s been a while</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                                What are your main goals for therapy? *
                                                            </label>
                                                            <textarea
                                                                value={bookingData.goals}
                                                                onChange={(e) => {
                                                                    setBookingData({...bookingData, goals: e.target.value});
                                                                    if (bookingErrors.goals) {
                                                                        setBookingErrors({...bookingErrors, goals: ''});
                                                                    }
                                                                }}
                                                                rows={4}
                                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none text-gray-900 placeholder-gray-500 ${
                                                                    bookingErrors.goals ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                                }`}
                                                                placeholder="Tell us about what you&apos;re hoping to achieve through therapy..."
                                                            />
                                                            {bookingErrors.goals && (
                                                                <p className="mt-2 text-sm text-red-600">{bookingErrors.goals}</p>
                                                            )}
                                                        </div>

                                                        <div className="flex justify-between">
                                                            <button
                                                                type="button"
                                                                onClick={prevStep}
                                                                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300"
                                                            >
                                                                Back
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300"
                                                            >
                                                                Next
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Step 3: Contact Information */}
                                                {bookingStep === 3 && (
                                                    <div className="space-y-6">
                                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                                                        
                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                                Full Name *
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={bookingData.name}
                                                                onChange={(e) => {
                                                                    setBookingData({...bookingData, name: e.target.value});
                                                                    if (bookingErrors.name) {
                                                                        setBookingErrors({...bookingErrors, name: ''});
                                                                    }
                                                                }}
                                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 placeholder-gray-500 ${
                                                                    bookingErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                                }`}
                                                                placeholder="Enter your full name"
                                                            />
                                                            {bookingErrors.name && (
                                                                <p className="mt-2 text-sm text-red-600">{bookingErrors.name}</p>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                                Email Address *
                                                            </label>
                                                            <input
                                                                type="email"
                                                                value={bookingData.email}
                                                                onChange={(e) => {
                                                                    setBookingData({...bookingData, email: e.target.value});
                                                                    if (bookingErrors.email) {
                                                                        setBookingErrors({...bookingErrors, email: ''});
                                                                    }
                                                                }}
                                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 placeholder-gray-500 ${
                                                                    bookingErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                                }`}
                                                                placeholder="your.email@example.com"
                                                            />
                                                            {bookingErrors.email && (
                                                                <p className="mt-2 text-sm text-red-600">{bookingErrors.email}</p>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                                Phone Number *
                                                            </label>
                                                            <input
                                                                type="tel"
                                                                value={bookingData.phone}
                                                                onChange={(e) => {
                                                                    setBookingData({...bookingData, phone: e.target.value});
                                                                    if (bookingErrors.phone) {
                                                                        setBookingErrors({...bookingErrors, phone: ''});
                                                                    }
                                                                }}
                                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 placeholder-gray-500 ${
                                                                    bookingErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                                }`}
                                                                placeholder="(555) 123-4567"
                                                            />
                                                            {bookingErrors.phone && (
                                                                <p className="mt-2 text-sm text-red-600">{bookingErrors.phone}</p>
                                                            )}
                                                        </div>

                                                        <div className="flex justify-between">
                                                            <button
                                                                type="button"
                                                                onClick={prevStep}
                                                                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300"
                                                            >
                                                                Back
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300"
                                                            >
                                                                Submit Booking
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </form>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        </>
                    )}
                </div>
            </div>
            {/* FAQ Section */}
            <div style={{ background: '#faf9fa', padding: '60px 0 40px 0', width: '100%' }}>
              <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 32 }}>
                  <span style={{ color: '#111' }}>Frequently Asked </span><span style={{ color: '#6c2eb7' }}>Questions</span>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 36 }}>
                  {[1,2,3,4].map((i) => (
                    <div key={i} style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 16px rgba(80,40,120,0.08)', padding: 32, display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#f5edfa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                        <svg width="28" height="28" fill="#6c2eb7" viewBox="0 0 24 24"><path d="M17 10.5V7A5 5 0 0 0 7 7v3.5M12 17v.01M12 13v2" stroke="#6c2eb7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="10.5" width="18" height="10" rx="2" fill="none" stroke="#6c2eb7" strokeWidth="1.5"/></svg>
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 18, color: '#222', marginBottom: 6 }}>How do I check order delivery status ?</div>
                        <div style={{ color: '#666', fontSize: 15 }}>Please tap on "My Orders" section under main menu of App/Website/M-site to check your order status.</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
                  <button style={{
                    background: '#6c2eb7',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: 18,
                    border: 'none',
                    borderRadius: 999,
                    padding: '12px 40px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(80,40,120,0.08)'
                  }} onClick={() => setShowDestinationsModal(true)}>
                    Explore Tours
                  </button>
                </div>
              </div>
            </div>
            {/* Explore More Section */}
            <div style={{ background: '#faf9fa', padding: '40px 0 60px 0', width: '100%' }}>
              <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>
                    <span style={{ color: '#111' }}>Explore </span><span style={{ color: '#6c2eb7' }}>More</span>
                  </h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
                  {[
                    { label: 'MALAYSIA', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=400&facepad=2' },
                    { label: 'SRILANKA', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=facearea&w=400&h=400&facepad=2' },
                    { label: 'PARIS', img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=facearea&w=400&h=400&facepad=2' },
                    { label: 'BARCELONA', img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&h=400&facepad=2' },
                    { label: 'ROME', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=400&facepad=2' }
                  ].map((item, idx) => (
                    <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/' + item.label.toLowerCase())}>
                      <div style={{ width: 110, height: 110, borderRadius: '50%', overflow: 'hidden', marginBottom: 12, boxShadow: '0 2px 8px rgba(80,40,120,0.08)' }}>
                        <img src={item.img} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ color: '#111', fontWeight: 700, fontSize: 15, letterSpacing: 1, display: 'flex' }}>{item.label}</div>
                    </div>
                  ))}
                  <button style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: '#fff',
                    border: 'none',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    color: '#541c9c',
                    fontSize: 22,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'background 0.2s',
                    marginLeft: 8
                  }} aria-label="Next">
                    {'>'}
                  </button>
                </div>
              </div>
            </div>
        </div>
    );
}

// FAQ Accordion Component
const FAQAccordion = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "Do you accept insurance?",
            answer: "No, but a superbill is provided for self-submission."
        },
        {
            question: "Are online sessions available?",
            answer: "Yes—all virtual sessions via Zoom."
        },
        {
            question: "What is your cancellation policy?",
            answer: "24-hour notice required."
        }
    ];

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                    <button
                        className="w-full px-8 py-6 text-left bg-gradient-to-r from-white to-gray-50/50 hover:from-sky-50 hover:to-blue-50/50 transition-all duration-300 flex justify-between items-center group"
                        onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                    >
                        <div className="flex items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                openIndex === index 
                                    ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-500 group-hover:bg-sky-100 group-hover:text-sky-600'
                            }`}>
                                <span className="text-sm font-semibold">{index + 1}</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 pr-4 group-hover:text-sky-800 transition-colors duration-300">
                                {faq.question}
                            </h3>
                        </div>
                        <div className="flex-shrink-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                openIndex === index 
                                    ? 'bg-gradient-to-r from-sky-400 to-blue-500' 
                                    : 'bg-gray-100 group-hover:bg-sky-100'
                            }`}>
                                <svg
                                    className={`w-4 h-4 transition-all duration-300 ${
                                        openIndex === index ? 'rotate-180 text-white' : 'text-gray-500 group-hover:text-sky-600'
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="px-8 pb-6 pt-2">
                            <div className="border-l-4 border-sky-400 pl-6">
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Contact Form Component
const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        preferredTime: '',
        agreeToContact: false
    });
    
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Please tell us what brings you here';
        }
        
        if (!formData.preferredTime.trim()) {
            newErrors.preferredTime = 'Preferred contact time is required';
        }
        
        if (!formData.agreeToContact) {
            newErrors.agreeToContact = 'You must agree to be contacted';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({
                name: '',
                phone: '',
                email: '',
                message: '',
                preferredTime: '',
                agreeToContact: false
            });
            setErrors({});
        }, 2000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    if (isSubmitted) {
        return (
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">Your message has been sent. I&apos;ll get back to you within 24 hours.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h3>
                <p className="text-gray-600">Tell me about yourself and what brings you here</p>
            </div>
            
            {/* Name Field */}
            <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-sky-300'
                    }`}
                    placeholder="Enter your full name"
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.name}
                    </p>
                )}
            </div>

            {/* Phone Field */}
            <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                        errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-sky-300'
                    }`}
                    placeholder="(555) 123-4567"
                />
                {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                    </p>
                )}
            </div>

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-sky-300'
                    }`}
                    placeholder="your.email@example.com"
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                    </p>
                )}
            </div>

            {/* Message Field */}
            <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    What brings you here? *
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 resize-none text-gray-900 placeholder-gray-500 ${
                        errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-sky-300'
                    }`}
                    placeholder="Tell me about what you&apos;re looking for in therapy..."
                />
                {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.message}
                    </p>
                )}
            </div>

            {/* Preferred Time Field */}
            <div>
                <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred time to reach you *
                </label>
                <input
                    type="text"
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                        errors.preferredTime ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-sky-300'
                    }`}
                    placeholder="e.g., Weekdays after 6 PM, Weekends anytime"
                />
                {errors.preferredTime && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.preferredTime}
                    </p>
                )}
            </div>

            {/* Checkbox Field */}
            <div className="flex items-start space-x-3">
                <input
                    type="checkbox"
                    id="agreeToContact"
                    name="agreeToContact"
                    checked={formData.agreeToContact}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-400 focus:ring-2"
                />
                <div className="flex-1">
                    <label htmlFor="agreeToContact" className="text-sm text-gray-700">
                        I agree to be contacted by phone or email regarding my inquiry *
                    </label>
                    {errors.agreeToContact && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.agreeToContact}
                        </p>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white font-semibold py-4 px-6 rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
            >
                {isSubmitting ? (
                    <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                    </div>
                ) : (
                    'Send Message'
                )}
            </button>
        </form>
    );
};

// Services Section with vertical scrollable list
const servicesData = [
  {
    title: 'Anxiety and Stress Management',
    subtitle: 'Therapy for Healthcare Providers and Students',
    image: 'https://images.unsplash.com/photo-1589954704644-d8945d4906cb?q=80&w=800&h=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: `The care you provide for others may be driving you to seek therapy, whether due to burnout, compassion fatigue, imposter syndrome, people-pleasing tendencies, or perfectionism. Whether you're in pre-professional school, undergoing training, or reflecting on a long career in healthcare, we can address the unique stressors of your professional environment along with any challenges you may be facing in other areas of your life.`
  },
  {
    title: 'Relationship Counselling',
    subtitle: '',
    image: 'https://images.unsplash.com/photo-1720960531544-cbfb1e659506?q=80&w=1040&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: `Relationships can bring joy and connection—but also frustration, miscommunication, or emotional strain. In therapy, we work together to improve communication, deepen understanding, and rebuild trust so your relationship can thrive.`
  },
  {
    title: 'Trauma Healing',
    subtitle: 'Trauma Recovery',
    image: 'https://plus.unsplash.com/premium_photo-1676550908118-bc60d813104a?q=80&w=800&h=600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: `Trauma can leave lasting emotional imprints that affect how you think, feel, and connect with others. Through compassionate, trauma-informed therapy, we'll create a safe space to process your experiences and support your healing at your own pace.`
  }
];

const ServicesSection = () => {
  return (
    <div className="mt-20 w-full max-w-[1200px] px-6 mx-auto flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight" style={{ letterSpacing: '-0.02em' }}>
          Services
        </h1>
      </div>
      {/* Scrollable vertical container for one service card at a time */}
      <div className="h-96 overflow-y-scroll px-4 py-2 bg-white rounded-lg shadow w-full max-w-[900px] flex flex-col">
        {servicesData.map((service) => (
          <div key={service.title} className="flex flex-row items-center h-[480px] min-h-[400px] max-h-[600px] py-10">
            {/* Image */}
            <div className="w-1/3 flex items-center justify-center min-w-[180px] h-full">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover rounded-2xl shadow-lg max-h-[420px] min-h-[220px]"
              />
            </div>
            {/* Content */}
            <div className="w-2/3 flex flex-col justify-center min-w-[300px] h-full pl-8">
              <h2 className="text-3xl font-bold text-gray-900 leading-tight tracking-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
                {service.title}
              </h2>
              <div className="border-l-4 border-blue-500 pl-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {service.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Add/replace the footer at the bottom of the page
const Footer = () => (
  <footer className="w-full bg-black text-gray-100 py-10 mt-20">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Phone */}
        <div>
          <div className="text-lg font-semibold mb-2">Phone</div>
          <div className="text-base">(555) 123-4567</div>
        </div>
        {/* Email */}
        <div>
          <div className="text-lg font-semibold mb-2">Email</div>
          <div className="text-base">info@growmytherapy.com</div>
        </div>
        {/* Address */}
        <div>
          <div className="text-lg font-semibold mb-2">Address</div>
          <div className="text-base">123 Main St, Los Angeles, CA 90001</div>
        </div>
      </div>
    </div>
  </footer>
);

export default HeroPage;

export {};