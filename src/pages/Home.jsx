import React from "react";
import { Carousel } from "antd";
import AboutImage from '../assets/about-madhav-crackers.png'
import BannerOne from '../assets/bannerOne.png'
import BannerTwo from '../assets/bannerTwo.png'
import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQ";
import WhyChooseUsOne from '../assets/why-choose-us-1.png'
import WhyChooseUsTwo from '../assets/why-choose-us-2.png'
import WhyChooseUsThree from '../assets/why-choose-us-3.png'
import WhyChooseUsFour from '../assets/why-choose-us-4.png'
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { FaWhatsapp } from "react-icons/fa";

export default function HomePage() {

    const category = [
        {
            title:"Sound Crackers",
            image:'https://ik.imagekit.io/pz2oagln5/categories/category1.png?updatedAt=1756631742573'
        },
        {
            title:"Flower Pots",
            image:'https://ik.imagekit.io/pz2oagln5/categories/category2.png?updatedAt=1756631742573'
        },
        {
            title:"Ground Chakkars",
            image:'https://ik.imagekit.io/pz2oagln5/categories/category3.png?updatedAt=1756631742573'
        },
        {
            title:"Twinkling Star",
            image:'https://ik.imagekit.io/pz2oagln5/categories/category4.png?updatedAt=1756631742573'
        },
        {
            title:"Bijili Crackers",
            image:'https://ik.imagekit.io/pz2oagln5/categories/category5.png?updatedAt=1756631742573'
        },
        {
            title:"Sound Bomb",
            image:'https://ik.imagekit.io/pz2oagln5/categories/category6.png?updatedAt=1756631742573'
        },
        {
            title:"Rockets",
            image:'https://ik.imagekit.io/pz2oagln5/categories/category7.png?updatedAt=1756631742573'
        },
        {
            title:"Repeating Shots",
            image:'https://ik.imagekit.io/pz2oagln5/categories/category8.png?updatedAt=1756631742573'
        },
    ]

    const handleSubmit = () => {
        const rawMessage = `Hello, I am interested to purchase crackers `;
        const encodedMessage = encodeURIComponent(rawMessage);
        const whatsappLink = `https://wa.me/+918438404886?text=${encodedMessage}`;
        window.open(whatsappLink, '_blank');
    };

    const navigate = useNavigate()
    return (
        <div className="relative">
            <button
                onClick={handleSubmit}
                className="z-12 fixed bottom-12 right-6 bg-green-600 text-white p-3 rounded-full shadow cursor-pointer hover:bg-green-700"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
            >
                <FaWhatsapp size={20} />
            </button>
            <Helmet>
                {/* Primary Meta Tags */}
                <title>Madhav Crackers | Buy Crackers Online in Sivakasi at Best Price</title>
                <meta
                    name="description"
                    content="Madhav Crackers in Sivakasi - Buy fireworks & crackers online at wholesale price. Safe, quality-assured, eco-friendly crackers with doorstep delivery. Celebrate your festivals with joy!"
                />
                <meta
                    name="keywords"
                    content="Madhav Crackers Sivakasi, Buy Crackers Online, Sivakasi Crackers Shop, Fireworks Online Shopping, Wholesale Crackers, Diwali Crackers Sivakasi"
                />
                <meta name="author" content="Madhav Crackers" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.madhavcrackers.com/" />
                <meta
                    property="og:title"
                    content="Madhav Crackers | Crackers Shop in Sivakasi"
                />
                <meta
                    property="og:description"
                    content="Shop Sivakasi fireworks & crackers online at Madhav Crackers. High quality, safe, eco-friendly crackers at wholesale prices."
                />
            </Helmet>
            <Header />
            <main className="bg-white text-gray-800">
                {/* Hero Section */}
                {/* <section className="bg-blue-900 text-white py-20 px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Madhav Crackers – Best Fireworks Shop in Sivakasi
                        </h1>
                        <p className="text-lg mb-6">
                            Buy 100% Genuine, BIS Certified Sivakasi Crackers Online at Best
                            Prices. Safe Packaging, On-time Delivery, and Festive Offers for
                            Diwali, Weddings & Celebrations.
                        </p>
                        <a
                            href="/products"
                            className="bg-yellow-400 text-blue-900 px-6 py-3 font-semibold rounded-lg shadow hover:bg-yellow-300 transition"
                        >
                            Shop Now
                        </a>
                    </div>
                </section> */}
                <Carousel autoplay={true} >
                    <img src={BannerOne} alt="Madhav Crackers" />
                    <img src={BannerTwo} alt="Best Crackers shop" />
                </Carousel>

                {/* About Section */}
                <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <div className="flex justify-center" >
                        <img
                            src={AboutImage}
                            alt="Sivakasi Crackers Collection"
                            className="w-[300px] h-[300px] rounded-xl"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-blue-900 mb-4">
                            About Madhav Crackers
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Madhav Crackers, based in Sivakasi – the Fireworks Capital of India,
                            is a trusted supplier of high-quality firecrackers. We bring joy to
                            your celebrations with sparklers, chakkars, rockets, flower pots,
                            aerial shots, fancy crackers, and complete gift boxes.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            With years of experience and BIS-certified products, we ensure safe
                            celebrations with vibrant collections at wholesale prices.
                        </p>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="bg-blue-50 py-16 px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-blue-900 mb-10">
                            Explore Our Crackers Categories
                        </h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {category.map((item) => (
                                <div
                                    key={item}
                                    className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
                                >
                                    <img className="mb-3 rounded-md" loading='lazy' src={item?.image} alt={item?.title} />
                                    <h3 className="text-xl font-semibold text-blue-800 mb-2">
                                        {item?.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Premium Sivakasi {item?.title.toLowerCase()} at best wholesale price.
                                    </p>
                                </div>
                            ))}
                        </div>
                        <button className="px-8 py-2 mt-8 cursor-pointer text-md bg-blue-600 rounded-md text-white" onClick={() => {
                            navigate('/quick-purchase')
                        }} >Purchase Now</button>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-16 px-6 max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-blue-900 mb-10">
                        Why Choose Madhav Crackers?
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { title: "BIS Certified", desc: "100% safe & genuine crackers", image: WhyChooseUsOne },
                            { title: "Wholesale Prices", desc: "Direct from Sivakasi factories", image: WhyChooseUsTwo },
                            { title: "Safe Packaging", desc: "Tamper-proof & weather resistant", image: WhyChooseUsThree },
                            { title: "On-Time Delivery", desc: "Across India parcel services", image: WhyChooseUsFour }
                        ].map((f) => (
                            <div
                                key={f.title}
                                className="flex flex-col items-center p-6 rounded-xl shadow hover:shadow-lg transition"
                            >
                                <img className="w-20 my-2" src={f.image} alt="best crackers shop from sivakasi" />
                                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                                    {f.title}
                                </h3>
                                <p className="text-gray-700 text-sm">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <img className="py-8" loading='lazy' src='https://ik.imagekit.io/pz2oagln5/bottom.gif?updatedAt=1756632143015' alt="" />
                <FAQSection />
            </main>
            <Footer />
        </div>
    );
}
