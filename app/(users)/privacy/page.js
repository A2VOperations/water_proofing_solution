"use client";
import React, { useState, useEffect } from "react";
import { getAdminDetailsAction } from "@/app/actions/admin";

export default function PrivacyPolicy() {
  const [adminDetails, setAdminDetails] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      const result = await getAdminDetailsAction();
      if (result.success) {
        setAdminDetails(result.admin);
      }
    };
    fetchAdmin();
  }, []);

  const companyName = adminDetails?.companyTitle || "Feexaro Waterproofing Solutions";

  return (
    <main className="min-h-screen bg-white pt-32 pb-24 font-sans text-gray-800">
      {/* Header Section */}
      <section className="max-w-4xl mx-auto px-6 mb-20 text-center">
        <span className="inline-block px-6 py-2.5 rounded-full bg-[#f0f7ff] text-[#0088ff] text-[12px] font-black uppercase tracking-[0.3em] mb-8">
          Legal Document
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-[#0A1A2F] tracking-tighter leading-none mb-8 uppercase">
          Privacy <br /> Policy
        </h1>
        <p className="text-gray-500 text-lg font-medium">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-3xl mx-auto px-6 relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#0088ff] to-transparent opacity-10 hidden md:block"></div>
        
        <div className="space-y-12 md:pl-10">
          <div>
            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4 uppercase tracking-tight">1. Introduction</h2>
            <p className="leading-relaxed text-gray-600 mb-4">
              Welcome to {companyName}. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4 uppercase tracking-tight">2. The Data We Collect</h2>
            <p className="leading-relaxed text-gray-600 mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>Identity Data:</strong> includes first name, last name, and title.</li>
              <li><strong>Contact Data:</strong> includes email address, telephone numbers, and property address.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, and time zone setting.</li>
              <li><strong>Usage Data:</strong> includes information about how you use our website and services.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4 uppercase tracking-tight">3. How We Use Your Data</h2>
            <p className="leading-relaxed text-gray-600 mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>To provide you with a waterproofing quote or service.</li>
              <li>To contact you regarding your project.</li>
              <li>To improve our website, products/services, and customer relationships.</li>
              <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4 uppercase tracking-tight">4. Data Security</h2>
            <p className="leading-relaxed text-gray-600 mb-4">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees and contractors who have a business need to know.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4 uppercase tracking-tight">5. Cookies</h2>
            <p className="leading-relaxed text-gray-600 mb-4">
              Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4 uppercase tracking-tight">6. Contact Us</h2>
            <p className="leading-relaxed text-gray-600 mb-6">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-[#f9fafb] p-8 rounded-3xl border border-gray-100 shadow-sm">
              <p className="font-bold text-[#0A1A2F] mb-1">{companyName}</p>
              <p className="text-gray-600 mb-1">{adminDetails?.address}</p>
              <p className="text-gray-600 mb-1">Email: {adminDetails?.email}</p>
              <p className="text-gray-600">Phone: {adminDetails?.numbers?.[0]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 -z-10 opacity-[0.03] pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 200 200">
            <path d="M100 0L200 100L100 200L0 100Z" fill="#0088ff" />
        </svg>
      </div>
    </main>
  );
}
