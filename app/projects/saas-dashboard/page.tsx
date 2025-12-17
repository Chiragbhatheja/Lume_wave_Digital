export default function SaasDashboardPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="font-inter text-sm uppercase tracking-[0.2em] text-[#00407a]/60 mb-3">Project</p>
      <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#001f3f] mb-4">SaaS Dashboard</h1>
      <p className="font-inter text-base text-[#003366] leading-relaxed mb-8">
        Analytics platform built for enterprise clients with real-time data visualization and advanced reporting capabilities.
      </p>
      <div className="rounded-2xl border border-[#e8f1f7] bg-white p-6 shadow-sm">
        <h2 className="font-poppins text-xl font-semibold text-[#001f3f] mb-3">Case Study</h2>
        <p className="font-inter text-base text-[#003366] leading-relaxed">
          Share your approach to data architecture, UI/UX design decisions, performance optimization, and business impact (user adoption, retention, revenue).
        </p>
      </div>
    </div>
  );
}
