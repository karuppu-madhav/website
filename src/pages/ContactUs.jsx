import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet'

export default function ContactUs() {
    return (
        <div>
            <Helmet>
                <title>Contact Us | Madhav Crackers Sivakasi</title>
                <meta
                    name="description"
                    content="Get in touch with Madhav Crackers Sivakasi for bulk orders, pricing, and delivery details. We are happy to assist you with your cracker shopping."
                />
                <meta name="keywords" content="Madhav Crackers, contact, Sivakasi crackers, fireworks, bulk crackers order" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.madhavcrackers.com/contact-us" />
            </Helmet>
            <Header />
            <div className='flex flex-col items-center py-20 bg-gradient-to-r from-blue-800 to-indigo-600' >
                <h1 className='text-3xl font-bold text-white' >Contact Us</h1>
            </div>
            <section
                id="contact-us"
                className="bg-gray-50 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Contact Madhav Crackers – Sivakasi
                        </h1>
                        <p className="text-gray-700 mb-6">
                            Have questions about orders, wholesale pricing, or deliveries? Reach
                            out to <strong>Madhav Crackers Sivakasi</strong> – we’re here to help
                            you with Diwali, wedding, and festive fireworks bookings.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <h2 className="text-lg font-semibold">Address</h2>
                                <p className="text-gray-700">
                                    2/544B, Muthalnayagan Patti Vilakku,
                                    <br />
                                    Mettamalai Sattur Road,
                                    <br />
                                    Sivakasi, Tamil Nadu – 626189
                                </p>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold">Phone & WhatsApp</h2>
                                <p className="text-gray-700">
                                    <a
                                        href="tel:+918438404886"
                                        className="hover:underline font-medium"
                                    >
                                        +91-8438404886
                                    </a>
                                </p>
                                <p className="text-gray-700">
                                    <a
                                        href="tel:+918637614077"
                                        className="hover:underline font-medium"
                                    >
                                        +91-8637614077
                                    </a>
                                </p>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold">Email</h2>
                                <p className="text-gray-700">
                                    <a
                                        href="mailto:madhavcrackers2025@gmail.com"
                                        className="hover:underline font-medium"
                                    >
                                        madhavcrackers2025@gmail.com
                                    </a>
                                </p>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold">Business Hours</h2>
                                <p className="text-gray-700">Mon – Sun : 9:00 AM – 8:00 PM</p>
                            </div>
                        </div>

                        <script type="application/ld+json" dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "LocalBusiness",
                                "name": "Madhav Crackers",
                                "image": "https://madhavcrackers.com/og-image.jpg",
                                "url": "https://madhavcrackers.com/contact",
                                "telephone": "+918438404886",
                                "email": "madhavcrackers2025@gmail.com",
                                "address": {
                                    "@type": "PostalAddress",
                                    "streetAddress": "2/544B, Muthalnayagan Patti Vilakku, Mettamalai Sattur Road,",
                                    "addressLocality": "Sivakasi",
                                    "addressRegion": "TN",
                                    "postalCode": "626189",
                                    "addressCountry": "IN"
                                },
                                "openingHours": "Mo-Su 09:00-20:00",
                                "priceRange": "₹₹",
                                "sameAs": [
                                    "https://www.instagram.com/madhav_crackers"
                                ]
                            })
                        }} />
                    </div>

                    <div className="space-y-8">
                        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow">
                            <iframe
                                title="Madhav Crackers Location"
                                src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAPS_EMBED_CODE"
                                width="600"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                className="w-full h-80"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
