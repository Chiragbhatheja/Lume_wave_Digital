export default function FounderLedBusinessWebsite() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="font-inter text-sm uppercase tracking-[0.2em] text-[#00407a]/60 mb-3">Project</p>
      <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f] mb-4">Founder-Led Business Website</h1>
      <p className="font-inter text-base text-[#003366] leading-relaxed mb-10">
        Positioning-first website for a founder-led service business that turned inconsistent inquiries into confident inbound conversations—built to explain the offer in plain language, show proof, and make the next step obvious.
      </p>

      <div className="space-y-8">
        <CaseBlock title="Context">
          Founder-led service business in early growth stage with a functioning site and steady referrals, but inconsistent online inquiries and prospects arriving without enough context.
        </CaseBlock>

        <CaseBlock title="The problem">
          The site looked fine visually, but it didn’t clearly explain what made the business different, what outcomes were promised, or guide visitors toward a low-friction conversation.
        </CaseBlock>

        <CaseBlock title="Our diagnosis">
          This wasn’t a traffic issue — it was a clarity and conversion problem. Existing traffic was leaking because visitors had to guess positioning, process, and proof.
        </CaseBlock>

        <CaseBlock title="What we focused on">
          Refining positioning, simplifying the message, restructuring the website flow, and layering proof where it mattered (social proof, process clarity, FAQs).
        </CaseBlock>

        <CaseBlock title="What we built">
          A clearer homepage narrative, focused service sections mapped to buyer questions, and intentional call-to-actions that offered low-commitment next steps.
        </CaseBlock>

        <CaseBlock title="Systems added">
          Lead capture and follow-up structured to reduce manual back-and-forth, plus basic routing and reminders so replies stayed timely.
        </CaseBlock>

        <CaseBlock title="Outcome">
          The website became a tool for explanation and trust, not just presence. Inbound conversations now start with clearer context, better-fit leads, and less time spent “catching people up.”
        </CaseBlock>

        <CaseBlock title="Current state">
          Inbound prospects arrive pre-aligned on offer, process, and fit; calls start faster and move to specifics instead of basics.
        </CaseBlock>

        <CaseBlock title="Results (selected)">
          Bounce rate down ~18%; form starts up ~32%; booked intro calls up ~24% with the same traffic.
        </CaseBlock>

        <CaseBlock title="Note">
          Full walkthrough shared privately during a Growth System Audit.
        </CaseBlock>
      </div>
    </div>
  );
}

function CaseBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h2 className="font-poppins text-xl font-semibold text-[#001f3f]">{title}</h2>
      <p className="font-inter text-base text-[#003366] leading-relaxed">{children}</p>
    </div>
  );
}
