import React from "react";

export default function MidCta() {
  return (
    <section className="container mx-auto pt-16">
      <div className="section-shell">
        <div className="surface-card p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl lg:text-3xl font-semibold text-theme-tc">
              Planning a scale-up or a new product launch?
            </h2>
            <p className="text-theme-lc">
              I help founders and teams align architecture, roadmap, and execution.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:mostafa@rawash.com"
              className="btn rounded-full bg-theme-p text-theme-b border-0 font-semibold"
            >
              Start a project brief
            </a>
            <a
              href="https://wa.me/201099129550"
              target="_blank"
              rel="noreferrer"
              className="btn rounded-full border border-white/10 bg-transparent text-theme-tc font-semibold"
            >
              Schedule a call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
