import React from "react";

export default function FAQSection() {
  const faqs = [
    {
      q: "Why should I buy crackers from Madhav Crackers Sivakasi?",
      a: "Madhav Crackers provides 100% genuine, BIS-certified Sivakasi fireworks at wholesale prices with safe packaging and on-time delivery across India."
    },
    {
      q: "Do you provide home delivery of crackers?",
      a: "Yes, we deliver Sivakasi crackers to your doorstep through reliable parcel services. We ensure safe packaging to prevent any damage during transport."
    },
    {
      q: "Are your crackers safe and certified?",
      a: "Absolutely! All our products are BIS-certified and manufactured under strict quality control to ensure safe celebrations for families and kids."
    },
    {
      q: "Do you offer discounts on bulk cracker orders?",
      a: "Yes, we provide special festive discounts and wholesale pricing for bulk orders of Diwali crackers, weddings, and corporate celebrations."
    },
    {
      q: "How can I place an order with Madhav Crackers?",
      a: "You can place your order online through our website or contact our sales team via phone or WhatsApp. We will guide you with product selection and delivery options."
    }
  ];

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              {item.q}
            </h3>
            <p className="text-gray-700">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
