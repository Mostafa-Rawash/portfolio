import React from "react";

const principles = [
  {
    title: "Roadmap first",
    detail: "Start with clear outcomes, stakeholder alignment, and prioritized scope.",
    icon: "M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z",
  },
  {
    title: "Metrics-driven",
    detail: "Define success metrics early and ship with instrumentation.",
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  },
  {
    title: "Fast iteration",
    detail: "Short delivery cycles with crisp feedback loops.",
    icon: "M16.023 9.348h.008l.008-.008-.008-.008h-.008l-.008.008zm1.712 1.097l.01-.01-.01-.01-.01.01zM3.75 21h16.5M12 3v3.75m0 0l-4.243-1.5M12 6.75l4.243-1.5M5.636 18.364a9 9 0 0112.728 0M5.636 12a9 9 0 0112.728 0",
  },
  {
    title: "Product mindset",
    detail: "Prioritize user value, roadmap clarity, and business outcomes.",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z",
  },
];

export default function HowIWork() {
  return (
    <section id="HowIWork" className="container mx-auto pt-20 pb-12">
      <div className="section-shell">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              How I work
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-theme-tc leading-tight tracking-tight">
              Calm execution, measurable outcomes.
            </h2>
            <p className="text-lg text-theme-lc">
              A predictable delivery system that turns product vision into shipped features.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
          {principles.map((item, index) => (
            <div key={item.title} className="surface-card card-accent p-5 transition-all duration-300 hover:border-theme-p/20 hover:shadow-glow">
              <div className="skill-icon-box mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-theme-p">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
              </div>
              <h3 className="text-base font-bold text-theme-tc">{item.title}</h3>
              <p className="text-sm text-theme-lc mt-2 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}