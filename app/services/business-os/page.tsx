import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import { generateMetadata as genMeta } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export async function generateMetadata() {
  return genMeta('services/business-os');
}

interface PillarProps {
  step: string;
  title: string;
  desc: string;
}

function Pillar({ step, title, desc }: PillarProps) {
  return (
    <div className="bg-white rounded-xl border border-[#e8f1f7] p-5 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1ba9e8] flex items-center justify-center">
          <span className="font-poppins font-bold text-white text-sm">{step}</span>
        </div>
        <h3 className="font-poppins font-semibold text-[#001f3f] text-sm leading-tight pt-0.5">
          {title}
        </h3>
      </div>
      <p className="font-inter text-xs text-[#003366] leading-relaxed flex-grow">
        {desc}
      </p>
    </div>
  );
}

export default function BusinessOS() {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Header & Hero Image */}
        <div className="mb-14">
          <p className="font-inter text-sm uppercase tracking-[0.2em] text-[#00407a]/60 mb-3">Service</p>
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-[#001f3f] mb-2">Business OS</h1>
          <p className="font-inter text-lg text-[#1ba9e8] font-semibold mb-6">Automation & operational clarity</p>
          
          <div className="mb-8 rounded-2xl overflow-hidden border border-[#e8f1f7] shadow-lg bg-gradient-to-br from-[#f0f7fb] to-[#e6f7ff]">
            <Image
              src="/Business_os.png"
              alt="Business OS - Automation and operational clarity"
              width={900}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          
          <p className="font-inter text-lg text-[#003366] leading-relaxed">
            Business OS is the layer that removes manual dependency from the business. Once clarity and inbound are in place, we build systems that handle leads, follow-ups, and operations — so growth doesn&apos;t rely on the founder being involved in everything.
          </p>
        </div>

        {/* Core Principle */}
        <div className="bg-white rounded-2xl border border-[#e8f1f7] p-6 md:p-8 mb-12">
          <p className="font-inter text-base text-[#003366] leading-relaxed italic">
            &ldquo;This is where growth becomes sustainable.&rdquo;
          </p>
        </div>

        {/* What This Does */}
        <div className="mb-14">
          <h2 className="font-poppins text-3xl font-bold text-[#001f3f] mb-8">What Business OS Is Designed to Do</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 pt-1">
                <span className="inline-block w-6 h-6 rounded-full bg-[#1ba9e8] text-white text-sm font-semibold flex items-center justify-center">•</span>
              </div>
              <p className="font-inter text-base text-[#003366] leading-relaxed">
                Reduce manual work across operations
              </p>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 pt-1">
                <span className="inline-block w-6 h-6 rounded-full bg-[#1ba9e8] text-white text-sm font-semibold flex items-center justify-center">•</span>
              </div>
              <p className="font-inter text-base text-[#003366] leading-relaxed">
                Ensure no lead or task is missed
              </p>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 pt-1">
                <span className="inline-block w-6 h-6 rounded-full bg-[#1ba9e8] text-white text-sm font-semibold flex items-center justify-center">•</span>
              </div>
              <p className="font-inter text-base text-[#003366] leading-relaxed">
                Let the business run smoothly, even when you step away
              </p>
            </div>
          </div>
        </div>

        {/* How We Build It */}
        <div className="mb-14">
          <h2 className="font-poppins text-3xl font-bold text-[#001f3f] mb-10">How We Build the Business OS</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Pillar
              step="1"
              title="Workflow Clarity"
              desc="Map how work actually moves — from inquiry to delivery."
            />
            <Pillar
              step="2"
              title="Automation Where It Matters"
              desc="Manual steps are replaced with simple, reliable systems."
            />
            <Pillar
              step="3"
              title="Central Control"
              desc="Information, leads, and operations live in one place — not in the founder's head."
            />
            <Pillar
              step="4"
              title="Calm Scale"
              desc="The business grows without increasing chaos."
            />
          </div>
        </div>

        {/* Before & After */}
        <div className="mb-14">
          <h2 className="font-poppins text-3xl font-bold text-[#001f3f] mb-8">What This Phase Replaces vs. Creates</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-[#e8f1f7] p-8">
              <h3 className="font-poppins text-xl font-semibold text-[#d32f2f] mb-6">Without the Business OS:</h3>
              <ul className="space-y-3">
                <li className="font-inter text-base text-[#003366] flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5">❌</span>
                  <span>Founder as the system</span>
                </li>
                <li className="font-inter text-base text-[#003366] flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5">❌</span>
                  <span>Manual follow-ups and tracking</span>
                </li>
                <li className="font-inter text-base text-[#003366] flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5">❌</span>
                  <span>Operational guesswork</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl border border-[#e8f1f7] p-8">
              <h3 className="font-poppins text-xl font-semibold text-[#00a86b] mb-6">With It:</h3>
              <ul className="space-y-3">
                <li className="font-inter text-base text-[#003366] flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5">✅</span>
                  <span>Stability</span>
                </li>
                <li className="font-inter text-base text-[#003366] flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5">✅</span>
                  <span>Time leverage</span>
                </li>
                <li className="font-inter text-base text-[#003366] flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5">✅</span>
                  <span>Control without micromanagement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Closing Callout */}
        <div className="bg-gradient-to-br from-[#e6f7ff] to-[#eef0ff] rounded-2xl border border-[#d5e6f3] p-8 md:p-10 mb-16">
          <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">The Business OS in Action</h2>
          <p className="font-inter text-base text-[#003366] leading-relaxed">
            This is the final layer that makes the whole growth system work together. With Foundation clarity, Inbound Engine visibility, and Business OS automation — your business becomes predictable, scalable, and independent of you.
          </p>
          <p className="font-inter text-base text-[#003366] leading-relaxed mt-4 italic">
            Systems that keep the business running — without everything depending on you.
          </p>
        </div>

        {/* CTA Section */}
        <div>
          <div className="bg-gradient-to-r from-[#1ba9e8]/10 to-[#0066cc]/10 rounded-2xl border border-[#1ba9e8]/20 p-8 md:p-12 text-center">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f] mb-4">Ready to build systems that scale?</h2>
            <p className="font-inter text-lg text-[#003366] mb-8 max-w-2xl mx-auto">
              Let&apos;s audit your operations and design a Business OS that removes founder bottlenecks and scales without chaos.
            </p>
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1ba9e8] text-white font-semibold rounded-lg hover:bg-[#1592d3] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start a Conversation
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Contact Form Section */}
        <div id="contact-form" className="mt-20 pt-16 border-t border-[#e8f1f7]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-poppins text-3xl font-bold text-[#001f3f] mb-4">Let&apos;s Build Your Business OS</h2>
              <p className="font-inter text-lg text-[#003366]">
                Fill out the form below and we&apos;ll discuss how to automate your operations and scale without founder dependency.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
