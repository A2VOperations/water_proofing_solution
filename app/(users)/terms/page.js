"use client";
import React, { useState, useEffect } from "react";
import { getAdminDetailsAction } from "@/app/actions/admin";

export default function TermsAndConditions() {
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

  const companyName = adminDetails?.companyTitle || "RWPC RAS CARE Waterproofing Solutions";

  return (
    <main className="min-h-screen bg-white pt-32 pb-24 font-sans text-gray-800">
      {/* Header Section */}
      <section className="max-w-4xl mx-auto px-6 mb-20 text-center">
        <span className="inline-block px-6 py-2.5 rounded-full bg-[#fdf2f2] text-[#f43f5e] text-[12px] font-black uppercase tracking-[0.3em] mb-8">
          Agreement
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-[#0A1A2F] tracking-tighter leading-none mb-8 uppercase">
          Terms & <br /> Conditions
        </h1>
        <p className="text-gray-500 text-lg font-medium">
          Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-3xl mx-auto px-6 relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#f43f5e] to-transparent opacity-10 hidden md:block"></div>
        
        <div className="space-y-12 md:pl-10">
          <div>
            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4 uppercase tracking-tight">1. Acceptance of Terms</h2>
            <p className="leading-relaxed text-gray-600 mb-4">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. Additionally, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4 uppercase tracking-tight">2. Service Description</h2>
            <p className="leading-relaxed text-gray-600 mb-4">
              {companyName} provides professional waterproofing, grouting, and flooring services. All estimates provided through the website are preliminary and subject to on-site inspection.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4 uppercase tracking-tight">3. User Responsibilities</h2>
            <p className="leading-relaxed text-gray-600 mb-4">
              You agree to use the website only for lawful purposes. You are prohibited from:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Using the site in any way that causes, or may cause, damage to the website.</li>
              <li>Using the site for any fraudulent or illegal activity.</li>
              <li>Attempting to gain unauthorized access to our systems or database.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4 uppercase tracking-tight">4. Intellectual Property</h2>
            <p className="leading-relaxed text-gray-600 mb-4">
              The website and its original content, features, and functionality are owned by {companyName} and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4 uppercase tracking-tight">5. Limitation of Liability</h2>
            <p className="leading-relaxed text-gray-600 mb-4">
              {companyName} shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4 uppercase tracking-tight">6. Governing Law</h2>
            <p className="leading-relaxed text-gray-600 mb-4">
              These terms shall be governed and construed in accordance with the laws of the jurisdiction in which {companyName} operates, without regard to its conflict of law provisions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4 uppercase tracking-tight">8. Payment Terms</h2>
            <p className="leading-relaxed text-gray-600 mb-4">
              Our standard payment structure is as follows:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>60% Advance:</strong> Against confirmed order for purchase of material.</li>
              <li><strong>30% Progress Payment:</strong> Will be made according to running bills as work progresses.</li>
              <li><strong>10% Balance:</strong> To be paid after final completion of the work.</li>
              <li><strong>Final Settlement:</strong> Final payment should be released within 3-4 days after completion of work.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4 uppercase tracking-tight">9. Taxes and GST</h2>
            <p className="leading-relaxed text-gray-600 mb-4">
              GST tax will be paid to us extra as applicable. Original bills will be provided upon request as required for compliance.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4 uppercase tracking-tight">10. Site Requirements</h2>
            <p className="leading-relaxed text-gray-600 mb-4">
              The client is responsible for providing essential utilities at the site, including but not limited to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Uninterrupted Water and Electricity supply.</li>
              <li>Secure Store-room for materials and equipment.</li>
              <li>Safe access to all work areas.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4 uppercase tracking-tight">11. Work Schedule and Measurement</h2>
            <p className="leading-relaxed text-gray-600 mb-4">
              The work will be mobilized and started within 7 days once the formal order is placed and advance payment is received. Actual measurement for billing will be considered as per application after site completion.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0A1A2F] mb-4 uppercase tracking-tight">12. Warranty</h2>
            <p className="leading-relaxed text-gray-600 mb-4">
              A 10-Years performance warranty will be issued by us upon final completion and full settlement of dues.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <p className="text-gray-500 italic text-sm">
              If you have any questions about these Terms, please contact us through our contact page.
            </p>
          </div>
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="fixed bottom-0 left-0 -z-10 opacity-[0.03] pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="100" fill="#f43f5e" />
        </svg>
      </div>
    </main>
  );
}
