import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import { generateMetadata as genMeta } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export async function generateMetadata() {
  return genMeta('services/growth-system-foundation');
}

interface StepCardProps {
  step: string;
  title: string;
  desc: string;
  outcome: string;
}

function StepCard({ step, title, desc, outcome }: StepCardProps) {
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
      <p className="font-inter text-xs text-[#003366] leading-relaxed mb-4 flex-grow">
        {desc}
      </p>
      <div className="bg-[#f0f7fb] rounded-lg p-3 border-l-2 border-[#1ba9e8]">
        <p className="font-inter text-xs font-semibold text-[#00407a]">
          ✓ {outcome}
        </p>
      </div>
    </div>
  );
}

export default function GrowthSystemFoundation() {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Header & Hero Image */}
        <div className="mb-14">
          <p className="font-inter text-sm uppercase tracking-[0.2em] text-[#00407a]/60 mb-3">Service</p>
          <h1 className="font-poppins text-4xl md:text-5xl font-bold text-[#001f3f] mb-6">Growth System Foundation</h1>
          <div className="mb-8 rounded-2xl overflow-hidden border border-[#e8f1f7] shadow-lg bg-gradient-to-br from-[#f0f7fb] to-[#e6f7ff]">
            <Image
              src="/growth_system_foundation.png"
              alt="Growth System Foundation - Clarity before growth"
              width={900}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <p className="font-inter text-lg text-[#003366] leading-relaxed">
            Clarity before growth. The first and most critical phase of how we work — nothing else is built until this layer is right.
          </p>
        </div>

        {/* Core Principle */}
        <div className="bg-white rounded-2xl border border-[#e8f1f7] p-6 md:p-8 mb-12">
          <p className="font-inter text-base text-[#003366] leading-relaxed italic">
            &ldquo;No amount of marketing or automation works if the business itself is unclear.&rdquo;
          </p>
        </div>

        {/* What the Foundation Is Responsible For */}
        <div className="mb-14">
          <h2 className="font-poppins text-3xl font-bold text-[#001f3f] mb-8">What the Foundation Phase is Responsible For</h2>
          <p className="font-inter text-base text-[#003366] leading-relaxed mb-6">
            The Foundation phase exists to answer three questions clearly:
          </p>
          <div className="space-y-4 ml-4 mb-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1ba9e8] text-white flex items-center justify-center font-semibold">1</div>
              <div>
                <p className="font-inter text-base text-[#003366]">
                  <span className="font-semibold">What does this business actually do — and for whom?</span>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1ba9e8] text-white flex items-center justify-center font-semibold">2</div>
              <div>
                <p className="font-inter text-base text-[#003366]">
                  <span className="font-semibold">Why should someone choose it over alternatives?</span>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1ba9e8] text-white flex items-center justify-center font-semibold">3</div>
              <div>
                <p className="font-inter text-base text-[#003366]">
                  <span className="font-semibold">What should a visitor do next, without confusion?</span>
                </p>
              </div>
            </div>
          </div>
          <p className="font-inter text-base text-[#003366] leading-relaxed italic">
            If any of these are unclear, growth will always feel forced.
          </p>
        </div>

        {/* Step-by-Step Map - Compact Card Grid */}
        <div className="mb-14">
          <h2 className="font-poppins text-3xl font-bold text-[#001f3f] mb-10">Step-by-Step Map: How We Build the Foundation</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <StepCard
              step="1"
              title="Business Context & Diagnosis"
              desc="Understand the business as it really operates, not as described online."
              outcome="Clear picture of where confusion exists"
            />
            <StepCard
              step="2"
              title="Positioning & Message Clarity"
              desc="Define audience, core problem, outcomes, and customer language."
              outcome="One clear narrative"
            />
            <StepCard
              step="3"
              title="Website Structure & Conversion Flow"
              desc="Design decision flow, trust-building, and when to invite action."
              outcome="Website that explains and converts"
            />
            <StepCard
              step="4"
              title="Trust & Credibility Signals"
              desc="Place proof, selectivity, and process clarity intentionally."
              outcome="Visitors feel safe moving forward"
            />
            <StepCard
              step="5"
              title="Lead Capture & First Touch"
              desc="Structure inquiries with context, low friction, and clear routing."
              outcome="Leads enter with clarity and intent"
            />
          </div>
        </div>

        {/* What the Foundation Avoids */}
        <div className="mb-14">
          <h2 className="font-poppins text-3xl font-bold text-[#001f3f] mb-6">What the Foundation Phase Deliberately Avoids</h2>
          <p className="font-inter text-base text-[#003366] leading-relaxed mb-4">
            We do not start with:
          </p>
          <ul className="space-y-2 ml-4 mb-6">
            <li className="font-inter text-base text-[#003366]">• Ads</li>
            <li className="font-inter text-base text-[#003366]">• Automation</li>
            <li className="font-inter text-base text-[#003366]">• Campaigns</li>
            <li className="font-inter text-base text-[#003366]">• Tools</li>
          </ul>
          <p className="font-inter text-base text-[#003366] leading-relaxed italic">
            Those come later. The Foundation is about getting the thinking right before scaling effort.
          </p>
        </div>

        {/* When Foundation is Complete */}
        <div className="mb-14">
          <h2 className="font-poppins text-3xl font-bold text-[#001f3f] mb-6">When the Foundation is Considered &ldquo;Complete&rdquo;</h2>
          <p className="font-inter text-base text-[#003366] leading-relaxed mb-4">
            The Foundation phase is done when:
          </p>
          <ul className="space-y-3 ml-4 mb-6">
            <li className="font-inter text-base text-[#003366]">✓ The business can be explained clearly in one minute</li>
            <li className="font-inter text-base text-[#003366]">✓ The website guides visitors without confusion</li>
            <li className="font-inter text-base text-[#003366]">✓ Leads understand what they&apos;re inquiring about</li>
            <li className="font-inter text-base text-[#003366]">✓ The founder feels less mental friction explaining the business</li>
          </ul>
          <p className="font-inter text-base text-[#003366] leading-relaxed italic">
            At this point, growth stops feeling chaotic — and becomes buildable.
          </p>
        </div>

        {/* Why This Matters */}
        <div className="bg-gradient-to-br from-[#e6f7ff] to-[#eef0ff] rounded-2xl border border-[#d5e6f3] p-8 md:p-10">
          <h2 className="font-poppins text-3xl font-bold text-[#001f3f] mb-6">Why This Phase Matters More Than Anything Else</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-poppins text-lg font-semibold text-[#001f3f] mb-4">Without a Solid Foundation:</h3>
              <ul className="space-y-2">
                <li className="font-inter text-base text-[#003366]">• Inbound will be inconsistent</li>
                <li className="font-inter text-base text-[#003366]">• Automation will amplify confusion</li>
                <li className="font-inter text-base text-[#003366]">• The founder remains the bottleneck</li>
              </ul>
            </div>
            <div>
              <h3 className="font-poppins text-lg font-semibold text-[#001f3f] mb-4">With It:</h3>
              <ul className="space-y-2">
                <li className="font-inter text-base text-[#003366]">• Marketing works faster</li>
                <li className="font-inter text-base text-[#003366]">• Systems stick</li>
                <li className="font-inter text-base text-[#003366]">• Growth feels calmer and predictable</li>
              </ul>
            </div>
          </div>

          <p className="font-inter text-base text-[#003366] leading-relaxed mt-8 pt-8 border-t border-[#d5e6f3] italic">
            The Growth System Foundation creates clarity — so every next step in growth actually works.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-20 pt-16">
          <div className="bg-gradient-to-r from-[#1ba9e8]/10 to-[#0066cc]/10 rounded-2xl border border-[#1ba9e8]/20 p-8 md:p-12 text-center">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f] mb-4">Ready to build a clearer foundation?</h2>
            <p className="font-inter text-lg text-[#003366] mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how the Growth System Foundation can transform your business clarity and lead flow.
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
              <h2 className="font-poppins text-3xl font-bold text-[#001f3f] mb-4">Let&apos;s Start Building Your Foundation</h2>
              <p className="font-inter text-lg text-[#003366]">
                Fill out the form below and we&apos;ll reach out to discuss how the Growth System Foundation can transform your business.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
