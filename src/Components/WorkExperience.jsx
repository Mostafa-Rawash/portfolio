import React, { useRef, useState } from "react";

function parseStartYear(period) {
  const match = period?.match(/(\d{4})/);
  return match ? parseInt(match[1]) : 0;
}

export default function WorkExperience({ profileData, experiences }) {
  const workExperiences =
    experiences && experiences.length
      ? experiences
      : profileData?.portfolioSite?.workExperiences && profileData.portfolioSite.workExperiences.length
        ? profileData.portfolioSite.workExperiences
        : [];

  const sorted = [...workExperiences].sort(
    (a, b) => parseStartYear(b.period) - parseStartYear(a.period)
  );

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <section id="Work" className="container mx-auto pt-20 pb-12">
      <div className="section-shell">
        <div className="space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                Experience
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-theme-tc leading-tight tracking-tight">
                Shipping products, leading teams, and delivering outcomes.
              </h2>
              <p className="text-lg text-theme-lc">
                A clear timeline of roles, scope, and measurable results.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid grid-cols-2 gap-4 w-full lg:w-[420px]">
                <div className="surface-card p-4">
                  <p className="text-xs text-theme-lc font-semibold">Latest role</p>
                  <h3 className="text-lg font-bold text-theme-tc mt-2">
                    {sorted[0]?.title || "Technical Leadership"}
                  </h3>
                  <p className="text-sm text-theme-lc">{sorted[0]?.company || "SaaS / Product / DevOps"}</p>
                </div>
                <div className="surface-card p-4">
                  <p className="text-xs text-theme-lc font-semibold">Roles shipped</p>
                  <p className="text-3xl font-black bg-gradient-to-r from-theme-p to-theme-a bg-clip-text text-transparent mt-2">{sorted.length}</p>
                  <p className="text-sm text-theme-lc">Product-led delivery</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Fade edges */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-theme-b to-transparent z-10 pointer-events-none" />
            )}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-theme-b to-transparent z-10 pointer-events-none" />
            )}

            {/* Scroll arrows */}
            {canScrollLeft && (
              <button
                onClick={() => scroll(-1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-theme-cc/90 border border-white/[0.08] grid place-items-center text-theme-tc hover:text-theme-p hover:border-theme-p/20 transition-all shadow-lg"
                style={{ boxShadow: "none", padding: 0 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => scroll(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-theme-cc/90 border border-white/[0.08] grid place-items-center text-theme-tc hover:text-theme-p hover:border-theme-p/20 transition-all shadow-lg"
                style={{ boxShadow: "none", padding: 0 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            )}

            <div
              ref={scrollRef}
              onScroll={updateScrollButtons}
              className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 -mx-1 px-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {sorted.map((work, index) => (
                <article
                  key={`${work.company}-${work.title}-${index}`}
                  className="surface-card card-accent p-5 transition-all duration-300 hover:border-theme-p/20 hover:shadow-glow flex-shrink-0 w-[320px] snap-start"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-theme-lc font-semibold">{work.period}</p>
                      <h3 className="text-base font-bold text-theme-tc mt-1">{work.title}</h3>
                      <p className="text-sm text-theme-lc mt-0.5">{work.company}</p>
                    </div>
                    <span className="text-xs font-black bg-gradient-to-r from-theme-p to-theme-a bg-clip-text text-transparent">#{(index + 1).toString().padStart(2, "0")}</span>
                  </div>

                  {work.achievements && work.achievements.length > 0 && (
                    <ul className="mt-4 space-y-2.5">
                      {work.achievements.map((item, achIndex) => (
                        <li
                          key={`${work.company}-ach-${achIndex}`}
                          className="relative pl-4 text-sm leading-relaxed text-theme-tc"
                        >
                          <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-theme-p to-theme-a" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-theme-lc pt-4 mt-auto">
                    <span className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1 font-bold">
                      {work.achievements ? work.achievements.length : 1} Highlights
                    </span>
                    <span className="rounded-lg bg-theme-p/8 px-3 py-1 font-bold text-theme-p border border-theme-p/10">
                      PM / TPM
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}