'use client';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f5f9fc] to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#001f3f] to-[#003366] text-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="prose prose-lg max-w-none font-inter text-[#003366] space-y-8">
          
          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              LumeWave Digital ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site").
            </p>
          </section>

          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">2. Information We Collect</h2>
            <p className="leading-relaxed mb-4">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            
            <h3 className="font-poppins text-xl font-semibold text-[#003366] mb-3">Personal Data</h3>
            <p className="leading-relaxed mb-3">Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</p>
            
            <h3 className="font-poppins text-xl font-semibold text-[#003366] mb-3">Derivative Data</h3>
            <p className="leading-relaxed mb-3">Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your referring URLs, and pages you visited before navigating to the Site.</p>
            
            <h3 className="font-poppins text-xl font-semibold text-[#003366] mb-3">Financial Data</h3>
            <p className="leading-relaxed mb-3">Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.</p>
            
            <h3 className="font-poppins text-xl font-semibold text-[#003366] mb-3">Cookie Data</h3>
            <p className="leading-relaxed">Information collected through cookies, including essential cookies (sessions, security, forms) and optional analytics cookies (Google Analytics, Meta Pixel). You can manage your cookie preferences at any time on our <a href="/cookie-settings" className="text-[#1ba9e8] hover:underline">Cookie Settings</a> page.</p>
          </section>

          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">3. Use of Your Information</h2>
            <p className="leading-relaxed mb-4">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Process your transactions and send you related information</li>
              <li>Email you regarding your account or order</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site</li>
              <li>Generate a personal profile about you</li>
              <li>Increase the efficiency and operation of the Site</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site</li>
              <li>Notify you of updates to the Site</li>
              <li>Offer new products, services, and/or recommendations to you</li>
            </ul>
          </section>

          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">4. Disclosure of Your Information</h2>
            <p className="leading-relaxed mb-4">We may share your information in the following situations:</p>
            
            <h3 className="font-poppins text-xl font-semibold text-[#003366] mb-3">By Law or to Protect Rights</h3>
            <p className="leading-relaxed mb-4">If we believe the release of information about you is necessary to comply with the law, enforce our Site policies, or protect ours or others' rights, property, or safety.</p>
            
            <h3 className="font-poppins text-xl font-semibold text-[#003366] mb-3">Third-Party Service Providers</h3>
            <p className="leading-relaxed">We may share your information with parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</p>
          </section>

          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">5. Security of Your Information</h2>
            <p className="leading-relaxed">
              We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">6. Contact Us Regarding Privacy</h2>
            <p className="leading-relaxed mb-4">
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-[#f0f7ff] border-l-4 border-[#1ba9e8] p-4 rounded">
              <p className="font-semibold text-[#001f3f]">LumeWave Digital</p>
              <p className="text-[#003366]">Email: info@lumewavedigital.com</p>
              <p className="text-[#003366]">Phone: +91 9217727015</p>
            </div>
          </section>

          

          <section>
            <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">8. Your Rights</h2>
            <p className="leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access personal data we hold about you</li>
              <li>Request correction of inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request restriction of processing of your personal data</li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
