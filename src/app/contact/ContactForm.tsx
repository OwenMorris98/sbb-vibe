"use client";

import { useState } from "react";

const inquiryTypes = [
  "General Inquiry",
  "Private Event",
  "Wholesale / Distribution",
  "Employment",
  "Charitable Donation Request",
  "Media / Press",
  "Other",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "General Inquiry",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production: POST to an API route or form service
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-navy-dark mb-2">
          Message Sent!
        </h3>
        <p className="text-gray-600">
          Thanks for reaching out. We&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-navy-dark mb-1.5"
          >
            Name <span className="text-amber">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border border-sand-dark rounded-lg px-4 py-2.5 text-sm text-navy-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-navy-dark mb-1.5"
          >
            Email <span className="text-amber">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border border-sand-dark rounded-lg px-4 py-2.5 text-sm text-navy-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-navy-dark mb-1.5"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-sand-dark rounded-lg px-4 py-2.5 text-sm text-navy-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition-colors"
            placeholder="(555) 555-5555"
          />
        </div>
        <div>
          <label
            htmlFor="inquiry"
            className="block text-sm font-medium text-navy-dark mb-1.5"
          >
            Inquiry Type <span className="text-amber">*</span>
          </label>
          <select
            id="inquiry"
            name="inquiry"
            required
            value={form.inquiry}
            onChange={handleChange}
            className="w-full border border-sand-dark rounded-lg px-4 py-2.5 text-sm text-navy-dark focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition-colors bg-white"
          >
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-navy-dark mb-1.5"
        >
          Message <span className="text-amber">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full border border-sand-dark rounded-lg px-4 py-2.5 text-sm text-navy-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber transition-colors resize-none"
          placeholder="Tell us how we can help..."
        />
      </div>

      <button type="submit" className="btn-primary w-full text-center">
        Send Message
      </button>
    </form>
  );
}
