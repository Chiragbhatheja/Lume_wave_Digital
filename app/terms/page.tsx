'use client';

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f5f9fc] to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#001f3f] to-[#003366] text-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="font-inter text-lg text-[#e8f3ff]">Please read these terms carefully.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="prose prose-lg max-w-none font-inter text-[#003366] space-y-8">

          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing or using the website and services provided by LumeWave Digital ("we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">2. Changes to Terms</h2>
            <p className="leading-relaxed">
              We may update these Terms from time to time. Changes are effective when posted on this page. Your continued use of the site after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">3. Use of the Site</h2>
            <p className="leading-relaxed">
              You agree to use the site only for lawful purposes and in accordance with these Terms. You are responsible for ensuring that your use complies with all applicable laws, rules, and regulations.
            </p>
          </section>

          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">4. Accounts and Security</h2>
            <p className="leading-relaxed">
              If any part of our services requires account creation, you must provide accurate information and maintain the security of your credentials. You are responsible for all activities under your account.
            </p>
          </section>

          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">5. Payments and Billing</h2>
            <p className="leading-relaxed">
              If you purchase services from us, you agree to pay all applicable fees and charges. Specific terms for engagement, deliverables, and billing will be outlined in separate agreements where applicable.
            </p>
          </section>

          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">6. Intellectual Property</h2>
            <p className="leading-relaxed">
              The content on this site, including text, graphics, logos, and design, is owned by or licensed to LumeWave Digital and is protected by intellectual property laws. You may not copy, reproduce, or distribute any content without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">7. Prohibited Uses</h2>
            <p className="leading-relaxed">
              You agree not to misuse the site, including but not limited to engaging in any activity that could damage, disable, overburden, or impair the site, or interfere with any other party's use of the site.
            </p>
          </section>

          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">8. Disclaimer of Warranties</h2>
            <p className="leading-relaxed">
              The site and its content are provided on an "as is" and "as available" basis without warranties of any kind, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
          </section>

          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">9. Limitation of Liability</h2>
            <p className="leading-relaxed">
              To the fullest extent permitted by law, LumeWave Digital shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">10. Indemnification</h2>
            <p className="leading-relaxed">
              You agree to defend, indemnify, and hold harmless LumeWave Digital and its affiliates from and against any claims, damages, liabilities, costs, and expenses arising out of your use of the site or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">11. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms are governed by the laws of the jurisdiction where LumeWave Digital is established, without regard to its conflict of law principles. Any disputes shall be resolved in the competent courts of that jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">12. Contact Us</h2>
            <p className="leading-relaxed mb-4">
              For questions about these Terms, please contact us:
            </p>
            <div className="bg-[#f0f7ff] border-l-4 border-[#1ba9e8] p-4 rounded">
              <p className="font-semibold text-[#001f3f]">LumeWave Digital</p>
              <p className="text-[#003366]">Email: info@lumewavedigital.com</p>
              <p className="text-[#003366]">Phone: +91 9217727015</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
