import React from "react";
import { Link } from "react-router-dom"; // import Link

export default function Footer() {
    return (
        <footer className="bg-blue-900 text-white pt-12 pb-6 px-6">
            <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-4">
                {/* Brand Info */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Madhav Crackers</h2>
                    <p className="text-blue-100 leading-relaxed">
                        Madhav Crackers in <strong>Sivakasi</strong> offers BIS/ISI certified
                        fireworks at wholesale and retail prices. Shop online for Diwali,
                        weddings, birthdays, and festive events with safe packaging and
                        doorstep delivery.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg text-yellow-500 font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-blue-100">
                        <li><Link to="/" className=" !text-white !hover:text-yellow-300">Home</Link></li>
                        <li><Link to="/quick-purchase" className=" !text-white !hover:text-yellow-300">Quick Purchase</Link></li>
                        <li><Link to="/track-order" className=" !text-white !hover:text-yellow-300">Track Order</Link></li>
                        <li><Link to="/payment-info" className=" !text-white !hover:text-yellow-300">Payment Info</Link></li>
                        <li><Link to="/contact-us" className=" !text-white !hover:text-yellow-300">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg text-yellow-500 font-semibold mb-4">Contact</h3>
                    2/544B, Muthalnayagan Patti Vilakku,
                    <br />
                    Mettamalai Sattur Road,
                    <br />
                    Sivakasi, Tamil Nadu – 626189
                    <p className="mt-2">
                        Phone:{" "}
                        {/* External links like tel: or mailto: should stay <a> */}
                        <a href="tel:+918438404886" className="!text-white hover:text-yellow-300">
                            +91-8438404886
                        </a>
                    </p>
                    <p>
                        Email:{" "}
                        <a href="mailto:madhavcrackers2025@gmail.com" className="!text-white hover:text-yellow-300">
                            madhavcrackers2025@gmail.com
                        </a>
                    </p>
                    <p className="mt-2">Open: Mon–Sun, 9 AM – 8 PM</p>
                </div>

                {/* Service Areas */}
                <div>
                    <h3 className="text-lg text-yellow-500 font-semibold mb-4">We Deliver In</h3>
                    <ul className="space-y-2 text-blue-100">
                        <li>Tamil Nadu</li>
                        <li>Kerala</li>
                        <li>Karnataka</li>
                        <li>Andhra Pradesh</li>
                        <li>Puducherry</li>
                        <li>and All over India.</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 border-t border-blue-700 pt-4 flex flex-col md:flex-row items-center justify-between text-sm text-blue-200">
                <p className="text-center" >
                    © {new Date().getFullYear()} Madhav Crackers, Sivakasi. All Rights
                    Reserved.
                </p>
                <p className="mt-2 md:mt-0">
                    Powered by{" "}
                    <span className="text-yellow-300 font-semibold">Madhav Crackers Online</span>
                </p>
            </div>
        </footer>
    );
}
