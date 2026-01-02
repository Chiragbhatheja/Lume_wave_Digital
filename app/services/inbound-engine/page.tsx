import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import { generateMetadata as genMeta } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export async function generateMetadata() {
  return genMeta('services/inbound-engine');
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

export default function InboundEngine() {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Header & Hero Image */}
        <div className="mb-14">
          <p className="font-inter text-sm uppercase tracking-[0.2em] text-[#00407a]/60 mb-3">Service</p>
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-[#001f3f] mb-2">Inbound Engine</h1>
          <p className="font-inter text-lg text-[#1ba9e8] font-semibold mb-6">Predictable visibility → inbound leads</p>
          
          <div className="mb-8 rounded-2xl overflow-hidden border border-[#e8f1f7] shadow-lg bg-gradient-to-br from-[#f0f7fb] to-[#e6f7ff]">
            <Image
              src="/Inbound_engine.png"
              alt="Inbound Engine - Predictable visibility and leads"
              width={900}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          
          <p className="font-inter text-lg text-[#003366] leading-relaxed">
            The Inbound Engine is where clarity turns into consistent lead flow. Once the foundation is set, we focus on building a system that attracts the right attention and converts it into inbound conversations — without constant manual chasing.
          </p>
        </div>

        {/* Core Principle */}
        <div className="bg-white rounded-2xl border border-[#e8f1f7] p-6 md:p-8 mb-12">
          <p className="font-inter text-base text-[#003366] leading-relaxed italic">
            &ldquo;Growth should continue even when you&apos;re not actively pushing.&rdquo;
          </p>
        </div>

        {/* What This Is Designed To Do */}
        <div className="mb-14">
          <h2 className="font-poppins text-3xl font-bold text-[#001f3f] mb-8">What the Inbound Engine Is Designed to Do</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 pt-1">
                <span className="inline-block w-6 h-6 rounded-full bg-[#1ba9e8] text-white text-sm font-semibold flex items-center justify-center">•</span>
              </div>
              <p className="font-inter text-base text-[#003366] leading-relaxed">
                Create visibility where your ideal clients already are
              </p>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 pt-1">
                <span className="inline-block w-6 h-6 rounded-full bg-[#1ba9e8] text-white text-sm font-semibold flex items-center justify-center">•</span>
              </div>
              <p className="font-inter text-base text-[#003366] leading-relaxed">
                Turn attention into inbound inquiries
              </p>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 pt-1">
                <span className="inline-block w-6 h-6 rounded-full bg-[#1ba9e8] text-white text-sm font-semibold flex items-center justify-center">•</span>
              </div>
              <p className="font-inter text-base text-[#003366] leading-relaxed">
                Reduce dependency on referrals and daily outreach
              </p>
            </div>
          </div>
        </div>

        {/* How We Build It */}
        <div className="mb-14">
          <h2 className="font-poppins text-3xl font-bold text-[#001f3f] mb-10">How We Build the Inbound Engine</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Pillar
              step="1"
              title="Channel Focus"
              desc="Identify where inbound actually makes sense for your business — not everywhere, just where it works."
            />
            <Pillar
              step="2"
              title="Message Alignment"
              desc="Content and campaigns are aligned with your positioning, not generic marketing trends."
            />
            <Pillar
              step="3"
              title="Conversion Paths"
              desc="Every touchpoint leads somewhere intentional — no dead ends, no confusion."
            />
            <Pillar
              step="4"
              title="Consistency Over Spikes"
              desc="The goal is predictable flow, not short-term bursts."
            />
          </div>
        </div>

        {/* Before & After */}
        <div className="mb-14">
          <h2 className="font-poppins text-3xl font-bold text-[#001f3f] mb-8">What This Phase Replaces vs. Creates</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-[#e8f1f7] p-8">
              <h3 className="font-poppins text-xl font-semibold text-[#d32f2f] mb-6">Without the Inbound Engine:</h3>
              <ul className="space-y-3">
                <li className="font-inter text-base text-[#003366] flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5">❌</span>
                  <span>Manual lead chasing</span>
                </li>
                <li className="font-inter text-base text-[#003366] flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5">❌</span>
                  <span>Random posting or disconnected campaigns</span>
                </li>
                <li className="font-inter text-base text-[#003366] flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5">❌</span>
                  <span>Growth that stops when effort stops</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl border border-[#e8f1f7] p-8">
              <h3 className="font-poppins text-xl font-semibold text-[#00a86b] mb-6">With It:</h3>
              <ul className="space-y-3">
                <li className="font-inter text-base text-[#003366] flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5">✅</span>
                  <span>A clear inbound path</span>
                </li>
                <li className="font-inter text-base text-[#003366] flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5">✅</span>
                  <span>Better-fit leads</span>
                </li>
                <li className="font-inter text-base text-[#003366] flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5">✅</span>
                  <span>Growth that feels controlled, not forced</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Closing Callout */}
        <div className="bg-gradient-to-br from-[#e6f7ff] to-[#eef0ff] rounded-2xl border border-[#d5e6f3] p-8 md:p-10 mb-16">
          <h2 className="font-poppins text-2xl font-bold text-[#001f3f] mb-4">The Inbound Engine in Action</h2>
          <p className="font-inter text-base text-[#003366] leading-relaxed">
            This phase turns your clarity (from the Foundation) into visible, consistent inbound flow. Ideal clients find you, they&apos;re pre-educated, and the conversations that start are the ones most likely to convert.
          </p>
          <p className="font-inter text-base text-[#003366] leading-relaxed mt-4 italic">
            A system that turns visibility into inbound leads — without constant outreach.
          </p>
        </div>

        {/* CTA Section */}
        <div>
          <div className="bg-gradient-to-r from-[#1ba9e8]/10 to-[#0066cc]/10 rounded-2xl border border-[#1ba9e8]/20 p-8 md:p-12 text-center">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f] mb-4">Ready to turn visibility into leads?</h2>
            <p className="font-inter text-lg text-[#003366] mb-8 max-w-2xl mx-auto">
              Let&apos;s design an Inbound Engine that brings predictable, qualified inquiries without constant outreach.
            </p>
            <a
              href="/#contact"
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
              <h2 className="font-poppins text-3xl font-bold text-[#001f3f] mb-4">Ready to Build Your Inbound Engine?</h2>
              <p className="font-inter text-lg text-[#003366]">
                Fill out the form below and we&apos;ll discuss how to turn your visibility into predictable, qualified leads.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
