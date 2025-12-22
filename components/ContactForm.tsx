'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    requirement: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  const services = [
    'Growth System Foundation',
    'Inbound Engine',
    'Business OS',
    'Free Website Audit',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    if (!accessKey) {
      console.error('Missing NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.requirement,
          from_name: 'LumeWave Digital Website',
          subject: `New Contact Form Submission - ${formData.service}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          requirement: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section className="relative bg-transparent pt-8 lg:pt-10 pb-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="font-inter text-sm uppercase tracking-[0.2em] text-[#1ba9e8] mb-4 flex items-center gap-3">
          <span className="text-[#1ba9e8]">READY TO GROW?</span>
          <span className="w-8 h-1 bg-gradient-to-r from-[#1ba9e8] to-[#0a66a9]"></span>
        </p>
        <h2 className="font-poppins text-4xl md:text-5xl font-bold text-[#001f3f] mb-4">
          Let&apos;s Make This Work.
        </h2>
        <p className="font-inter text-base md:text-lg text-[#003366] max-w-2xl leading-relaxed">
          Get a free consultation and project quote today. Let&apos;s discuss how we can bring your vision to life with a powerful, custom website.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-poppins text-lg font-semibold text-[#001f3f] block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name / Company name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-full border border-[#e8f1f7] bg-white font-inter text-[#003366] placeholder-[#999999] focus:outline-none focus:border-[#1ba9e8] focus:ring-1 focus:ring-[#1ba9e8] transition-all"
                  required
                />
              </div>
              <div>
                <label className="font-poppins text-lg font-semibold text-[#001f3f] block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-full border border-[#e8f1f7] bg-white font-inter text-[#003366] placeholder-[#999999] focus:outline-none focus:border-[#1ba9e8] focus:ring-1 focus:ring-[#1ba9e8] transition-all"
                  required
                />
              </div>
            </div>

            {/* Phone and Service Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-poppins text-lg font-semibold text-[#001f3f] block mb-2">Mobile Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded-full border border-[#e8f1f7] bg-white font-inter text-[#003366] placeholder-[#999999] focus:outline-none focus:border-[#1ba9e8] focus:ring-1 focus:ring-[#1ba9e8] transition-all"
                  required
                />
              </div>
              <div>
                <label className="font-poppins text-lg font-semibold text-[#001f3f] block mb-2">Select Service</label>
                <div className="relative">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-full border border-[#e8f1f7] bg-white font-inter text-[#003366] focus:outline-none focus:border-[#1ba9e8] focus:ring-1 focus:ring-[#1ba9e8] transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select a service</option>
                    {services.map((service, idx) => (
                      <option key={idx} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#1ba9e8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirement Textarea */}
            <div>
              <label className="font-poppins text-lg font-semibold text-[#001f3f] block mb-2">Your Requirement</label>
              <textarea
                name="requirement"
                placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                value={formData.requirement}
                onChange={handleChange}
                rows={6}
                className="w-full px-5 py-4 rounded-3xl border border-[#e8f1f7] bg-white font-inter text-[#003366] placeholder-[#999999] focus:outline-none focus:border-[#1ba9e8] focus:ring-1 focus:ring-[#1ba9e8] transition-all resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#1ba9e8] to-[#0a66a9] hover:from-[#0a66a9] hover:to-[#003366] text-white font-poppins text-lg font-semibold py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Get Consultation'}
            </button>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-2xl">
                <p className="text-green-800 font-inter text-sm">
                  ✓ Thank you! We&apos;ve received your message and will get back to you soon.
                </p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-red-800 font-inter text-sm">
                  ✗ Something went wrong. Please try again or email us directly at info@lumewavedigital.com
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-1">
          <div className="space-y-8">
            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1ba9e8] to-[#0a66a9] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.686l2.524 1.262a1 1 0 001.502-1.341L9.939 5m0 0V3m0 2L5.939 9m14.938-4.02a2 2 0 00-2.117.196l-.016.009c-.87.659-1.738 1.32-2.608 1.98-.11.088-.221.177-.33.266a2 2 0 01-2.94-1.304l-.663-3.315a2 2 0 00-3.909 0l-.663 3.315a2 2 0 01-2.94 1.304c-.11-.089-.22-.178-.33-.266-.87-.66-1.738-1.32-2.608-1.98a2 2 0 00-2.117-.196" />
                </svg>
              </div>
              <div>
                <p className="font-poppins text-sm uppercase tracking-[0.1em] text-[#00407a]/60 mb-1">Phone</p>
                <a href="tel:+919217727015" className="font-poppins text-lg font-semibold text-[#001f3f] hover:text-[#1ba9e8] transition-colors">
                   +91 9217727015
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF4B4B] to-[#f33a3a] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-poppins text-sm uppercase tracking-[0.1em] text-[#00407a]/60 mb-1">Email</p>
                <a href="mailto:info@lumewavedigital.com" className="font-poppins text-lg font-semibold text-[#001f3f] hover:text-[#1ba9e8] transition-colors">
                  info@lumewavedigital.com
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-[#e8f1f7] to-transparent"></div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-br from-[#e6f7ff] to-[#eef0ff] rounded-2xl p-6">
              <p className="font-poppins text-sm font-semibold text-[#001f3f] mb-2">Quick Response</p>
              <p className="font-inter text-sm text-[#003366] leading-relaxed">
                We typically respond within 2 hours during business hours. Looking forward to collaborating with you!
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
