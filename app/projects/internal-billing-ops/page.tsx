export default function InternalBillingOps() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="font-inter text-sm uppercase tracking-[0.2em] text-[#00407a]/60 mb-3">Project</p>
      <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f] mb-4">Internal Billing & Operations System</h1>
      <p className="font-inter text-base text-[#003366] leading-relaxed mb-10">
        Lightweight internal OS to end manual invoicing, tracking, and ops backlogs for a founder-run team—built to replace sticky notes and spreadsheets with one source of truth.
      </p>

      <div className="space-y-8">
        <CaseBlock title="Context">
          Founder-run business managing invoices, tracking, and records manually, leading to delays, errors, and slow responses to customers.
        </CaseBlock>

        <CaseBlock title="The problem">
          Operational work was consuming time meant for growth — the founder was the system, and every handoff required memory and manual follow-up.
        </CaseBlock>

        <CaseBlock title="Our diagnosis">
          Lack of a simple internal system and a single source of truth. Data lived in email threads, sheets, and heads.
        </CaseBlock>

        <CaseBlock title="What we focused on">
          Reducing manual steps, creating one source of truth, and adding safeguards so invoices and follow-ups couldn’t slip.
        </CaseBlock>

        <CaseBlock title="What we built">
          A custom billing and tracking tool tailored to the workflow with status visibility, reminders, and light automation for recurring tasks.
        </CaseBlock>

        <CaseBlock title="Outcome">
          Operations became faster, clearer, and less dependent on memory. Billing cycles shortened and customer updates got faster.
        </CaseBlock>

        <CaseBlock title="Results (selected)">
          Invoice prep time down ~40%; overdue follow-ups cut ~35%; customer update response time improved ~28%.
        </CaseBlock>

        <CaseBlock title="Note">
          Internal systems are demonstrated privately.
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
