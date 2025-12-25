import React from 'react'

export default function FAQ() {

  const faqData = [
    {
      question: "Can I personalize my order?",
      answer:
        "Absolutely! You can add your name, a special message, or even a short quote to any diary, poster, bookmark, or calendar. Just tell us your customization when you order via WhatsApp.",
    },
    {
      question: "How do I place an order?",
      answer:
        "Simply click the 'Buy Now' button on our website, and you'll be redirected to our WhatsApp chat. We'll guide you step by step to finalize your personalized design.",
    },
    {
      question: "How long will it take to receive my item?",
      answer:
        "Since each item is personalized and made to order, please allow 3–7 business days for processing. Delivery time depends on your location, and we’ll share tracking info once it’s shipped.",
    },
    {
      question: "What products can I customize?",
      answer:
        "Currently, you can customize diaries, posters, bookmarks, calendars, and birthday or special occasion prints. We’re constantly adding more designs based on customer feedback!",
    },
    {
      question: "Can I request a design that's not on the website?",
      answer:
        "Yes! If you have a special idea in mind, share it with us on WhatsApp and we’ll do our best to create a custom design just for you.",
    },
  ];

  return (
    <>
      <div className="mx-auto max-w-lg text-center px-6">
        <h2 className="text-3xl/tight font-semibold text-gray-900 sm:text-4xl my-8">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="flow-root max-w-3xl mx-auto px-8">
        <div className="my-6 flex flex-col divide-y divide-gray-200">
          {faqData.map((faq, index) => (
            <details
              key={index}
              className="group py-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
            >
              <summary className="flex items-center justify-between gap-1.5 text-gray-900">
                <h2 className="font-semibold">{faq.question}</h2>
                <svg
                  className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </summary>

              <p className="pt-4 text-gray-900">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
