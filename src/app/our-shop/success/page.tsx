import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Thank you for your order from Ship Bottom Brewery!",
};

export default function OrderSuccessPage() {
  return (
    <>
      <section className="bg-navy-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber text-xs font-bold uppercase tracking-[0.35em] mb-3">
            Order Confirmed
          </p>
          <h1 className="text-5xl sm:text-6xl tracking-wide mb-4">Thank You!</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Your order has been received and we&apos;re getting it ready for you.
          </p>
        </div>
      </section>

      <section className="py-24 bg-sand min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-lg mx-auto">
            {/* Checkmark icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-navy-dark mb-3">
              Order Received!
            </h2>
            <p className="text-gray-600 mb-2">
              A confirmation email is on its way to your inbox. If you have
              any questions about your order, reach out to us anytime.
            </p>
            <p className="text-gray-500 text-sm mb-10">
              Orders are typically ready for pickup or shipping within 2–3 business
              days. Stop by a taproom to pick up in person!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/our-shop" className="btn-primary">
                Continue Shopping
              </Link>
              <Link href="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
