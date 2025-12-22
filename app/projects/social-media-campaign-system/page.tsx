export default function SocialMediaCampaignSystem() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="font-inter text-sm uppercase tracking-[0.2em] text-[#00407a]/60 mb-3">Project</p>
      <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f] mb-4">Social Media + Campaign System</h1>
      <p className="font-inter text-base text-[#003366] leading-relaxed mb-10">
        Consistency and campaign structure that turned scattered posting into a predictable path from content to inquiry for a referral-reliant business—anchored to offers, capacity, and clear next steps.
      </p>

      <div className="space-y-8">
        <CaseBlock title="Context">
          Small business relying heavily on referrals and manual outreach with inconsistent, disconnected social activity across platforms.
        </CaseBlock>

        <CaseBlock title="The problem">
          Effort was high, but visibility didn’t translate into predictable inquiries. Content and campaigns weren’t tied to offers or capacity.
        </CaseBlock>

        <CaseBlock title="Our diagnosis">
          There was no inbound structure — only isolated posting and campaigns. No consistent bridge from attention to conversation.
        </CaseBlock>

        <CaseBlock title="What we focused on">
          Creating consistency, clarity of message, and a clear path from content to inquiry, mapped to actual services and availability.
        </CaseBlock>

        <CaseBlock title="What we built">
          A content structure aligned with business goals, targeted campaigns to support it, and clear CTAs that funneled interest into booking and follow-up.
        </CaseBlock>

        <CaseBlock title="Systems added">
          Tracking and basic automation to handle responses and follow-ups, including light routing so hot replies weren’t missed.
        </CaseBlock>

        <CaseBlock title="Outcome">
          Visibility became intentional, and lead flow stopped depending entirely on manual effort. Inquiries now arrive with context and intent.
        </CaseBlock>

        <CaseBlock title="Results (selected)">
          Publishing cadence held at 4–5 posts/week; campaign CTR improved ~22%; qualified replies and bookings up ~18% without increasing spend.
        </CaseBlock>

        <CaseBlock title="Note">
          Details shared privately during a Growth System Audit.
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
