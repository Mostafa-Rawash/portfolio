import React from "react";

export default function MidCta() {
  return (
    <section className="container mx-auto pt-20 pb-12">
      <div className="section-shell">
        <div className="relative overflow-hidden surface-card p-8 lg:p-12 border border-white/[0.06]">
          <div className="absolute inset-0 bg-gradient-to-r from-theme-p/6 via-transparent to-theme-a/4 pointer-events-none" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <h2 className="text-2xl lg:text-3xl font-black text-theme-tc leading-tight">Planning a scale-up or a new product launch?</h2>
              <p className="text-theme-lc text-lg">I help teams align on scope, ship faster, and measure what matters.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:mostafa@rawash.com" className="btn rounded-xl bg-gradient-to-r from-theme-p to-violet-500 text-white border-0 font-bold shadow-glow">Start a project brief</a>
              <a href="https://wa.me/201099129550" target="_blank" rel="noreferrer" className="btn rounded-xl bg-theme-a/10 border border-theme-a/20 text-theme-a font-bold">Schedule a call</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}