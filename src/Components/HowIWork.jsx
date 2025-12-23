import React from "react";

const principles = [
  {
    title: "Architecture first",
    detail: "Start with clear system boundaries, scalability, and operability.",
  },
  {
    title: "Metrics-driven",
    detail: "Define success metrics early and ship with instrumentation.",
  },
  {
    title: "Fast iteration",
    detail: "Short delivery cycles with crisp feedback loops.",
  },
  {
    title: "Product mindset",
    detail: "Prioritize user value, roadmap clarity, and business outcomes.",
  },
];

export default function HowIWork() {
  return (
    <section id="HowIWork" className="container mx-auto pt-16">
      <div className="section-shell">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              How I work
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-theme-tc leading-tight">
              Calm execution, measurable outcomes.
            </h2>
            <p className="text-lg text-theme-lc">
              A predictable delivery system that supports founders and teams.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
          {principles.map((item) => (
            <div key={item.title} className="surface-card card-accent p-4">
              <h3 className="text-base font-semibold text-theme-tc">{item.title}</h3>
              <p className="text-sm text-theme-lc mt-2">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
