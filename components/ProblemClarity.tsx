"use client";

import SubscriptionForm from "./SubscriptionForm";

export default function ProblemClarity() {
  const problems = [
    {
      title: "The \"Ghost Town\" Website",
      description: "Your website looks fine, but doesn't clearly communicate value",
      sub: "Visitors come conversations don't",
    },
    {
      title: "The \"Manual Hustle\" Loop",
      description: "Leads depend on referrals, DMs, or constant outreach",
      sub: "The moment you stop pushing, everything slows down",
    },
    {
      title: "The \"CEO Bottleneck\"",
      description: "The business works only when you're involved in everything",
      sub: "Growth feels heavy because nothing runs without you",
    },
  ];

  const cardConfig = {
    gradient: "from-white/35 via-white/18 to-white/8",
    shadow: "shadow-[0_20px_50px_-28px_rgba(15,23,42,0.25)]",
    hoverShadow: "hover:shadow-[0_28px_60px_-32px_rgba(15,23,42,0.28)]",
  };

  return (
    <section className="relative isolate overflow-hidden bg-transparent pt-16 lg:pt-24 pb-8 lg:pb-10">
      {/* Distinct soft tint (cool → warm) for this section */}
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(206,233,246,0.92)_0%,rgba(242,247,253,0.9)_40%,rgba(255,207,153,0.88)_100%)]"
        aria-hidden
      />

      {/* Top/bottom fades to blend into adjacent sections */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f7f9fc]/95 to-transparent -z-0" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f7f9fc]/95 to-transparent -z-0" aria-hidden />

      {/* Global flow now handles the vertical band */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-10 h-64 w-64 rounded-full bg-cyan-500/6 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-purple-500/6 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 space-y-2">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#0f1024]">
            If growth feels stuck, it&apos;s usually because of one of these.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {problems.map((problem, idx) => {
            return (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-[24px] bg-white/65 backdrop-blur-lg transition-all duration-300 ${cardConfig.shadow} ${cardConfig.hoverShadow} hover:-translate-y-1`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cardConfig.gradient}`} aria-hidden />

                <div className="relative p-6 md:p-8 flex flex-col gap-4 min-h-[240px]">
                  {/* Title */}
                  <div className="space-y-3">
                    <h3 className="font-poppins text-xl md:text-2xl font-semibold text-[#0f1024] leading-tight">
                      {problem.title}
                    </h3>
                  </div>

                  {/* Main Description */}
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                    {problem.description}
                  </p>

                  {/* Sub Description */}
                  <div className="relative pt-3">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" aria-hidden />
                    <p className="text-sm font-medium text-slate-600">
                      {problem.sub}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subscription CTA */}
        <div className="mt-12 text-center space-y-4">
          <p className="font-inter text-sm text-[#003366] max-w-md mx-auto leading-relaxed">
            Get occasional insights on building clarity, inbound systems, and automation
          </p>
          <p className="font-inter text-xs text-[#00407a]/60 max-w-md mx-auto">
            Shared with founders who want growth without chaos.
          </p>
          <SubscriptionForm />
        </div>
      </div>
    </section>
  );
}
