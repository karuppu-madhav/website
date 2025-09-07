import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QR from '../assets/qr.jpeg'
import { Helmet } from "react-helmet";

export default function PaymentInfo() {
    return (
        <div>
            <Helmet>
                <title>Payment Information | Madhav Crackers Sivakasi</title>
                <meta
                    name="description"
                    content="Secure and easy payment options at Madhav Crackers Sivakasi. Learn about UPI, bank transfer, and other safe methods to pay for your cracker orders."
                />
                <meta
                    name="keywords"
                    content="Madhav Crackers, payment information, crackers online payment, Sivakasi crackers, UPI, bank transfer"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.madhavcrackers.com/payment-info" />
            </Helmet>
            <Header />
            <div className='flex flex-col items-center py-20 bg-gradient-to-r from-blue-800 to-indigo-600' >
                <h1 className='text-3xl font-bold text-white' >Payment Information</h1>
            </div>
            <section className="bg-blue-50 text-gray-800 py-12 px-6">
                <div className="mx-auto grid grid-cols-12 space-y-8 gap-6">
                    <div className="col-span-12 md:col-span-6 lg:col-span-8" >
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                                UPI & Mobile Payments
                            </h2>
                            <ul className="space-y-2 text-gray-700">
                                <li>
                                    <strong>UPI ID:</strong>{" "}
                                    <span className="font-medium">mariyappanj041-2@okhdfcbank</span>
                                </li>
                                <li>
                                    <strong>Google Pay Number:</strong>{" "}
                                    <span className="font-medium">9786504886</span>
                                </li>
                            </ul>
                        </div>
                        {/* Bank Details */}
                        {/* <div className="bg-white shadow rounded-lg p-6 mt-4">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                                Bank Account Details
                            </h2>
                            <ul className="space-y-2 text-gray-700">
                                <li>
                                    <strong>Account Holder Name:</strong> Mariappan V
                                </li>
                                <li>
                                    <strong>Account Number:</strong> 003100660000344
                                </li>
                                <li>
                                    <strong>Bank:</strong> Tamilnad Mercantile Bank
                                </li>
                                <li>
                                    <strong>Branch:</strong> Meenampatti
                                </li>
                                <li>
                                    <strong>IFSC Code:</strong> TMBL0000521
                                </li>
                            </ul>
                        </div> */}

                        {/* Instructions */}
                        <div className="bg-white shadow rounded-lg p-6 mt-6">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                                How to Make a Payment
                            </h2>
                            <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                <li>
                                    Add your desired fireworks to the cart and place the order/quotation request.
                                </li>
                                <li>
                                    Transfer the payment using the above bank account or your preferred UPI option.
                                </li>
                                <li>
                                    After payment, submit the payment proof on our whatsapp number.
                                </li>
                                <li>
                                    Once verified, we’ll dispatch your order from Sivakasi directly to your nearest parcel center.
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-4" >
                        {/* Digital Payments */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                                Scan & Pay
                            </h2>
                            {/* Optional: UPI QR code image */}
                            <div className="mt-4">
                                <img src={QR} alt="UPI QR code" className="w-full" />
                            </div>
                        </div>
                    </div>

                    {/* SEO & Branding */}
                    <div className="text-gray-600 col-span-12">
                        <p>
                            Madhav Crackers is a trusted Sivakasi-based fireworks supplier offering
                            over 150+ varieties of BIS-certified crackers, including sparklers, chakkars, mega fountains,
                            gift boxes, and more—perfect for Diwali, weddings, and festive events.
                        </p>
                        <p className="mt-3">
                            With safe packaging, prompt customer service, and transparent payment channels,
                            we aim to make your celebrations bright and hassle-free. Order today and experience the
                            joy of Sivakasi fireworks delivered to your doorstep.
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
