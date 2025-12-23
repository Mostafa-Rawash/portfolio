import React from "react";

export default function WorkExperience({ profileData, experiences }) {
  const workExperiences =
    experiences && experiences.length
      ? experiences
      : profileData?.portfolioSite?.workExperiences && profileData.portfolioSite.workExperiences.length
        ? profileData.portfolioSite.workExperiences
        : [];
  return (
    <section id="Work" className="container mx-auto pt-24 pb-16">
      <div className="section-shell">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start">
          <div className="space-y-6">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Experience
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-theme-tc leading-tight">
              Experience crafted for shipping velocity.
            </h2>
            <p className="text-lg text-theme-lc max-w-xl">
              Layered, tactile cards with subtle gradients and masonry flow to surface outcomes at a glance.
            </p>

            <div className="relative overflow-hidden surface-card p-8 backdrop-blur">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-theme-p/12 blur-3xl" />
              <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-theme-a/12 blur-3xl" />
              <p className="text-sm text-theme-lc mb-2">Latest Role</p>
              <h3 className="text-2xl font-bold text-theme-tc">
                {workExperiences[0]?.title || "Technical Leadership"}
              </h3>
              <p className="text-theme-lc">{workExperiences[0]?.company || "SaaS / Product / DevOps"}</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="surface-card px-4 py-3 bg-transparent">
                  <p className="text-xs text-theme-lc">Roles shipped</p>
                  <p className="text-2xl font-bold text-theme-tc">{workExperiences.length}</p>
                </div>
                <div className="rounded-2xl bg-theme-p text-white px-4 py-3 shadow-lg shadow-theme-p/30">
                  <p className="text-xs opacity-80">Focus</p>
                  <p className="text-lg font-semibold">Product-led delivery</p>
                </div>
              </div>
            </div>
          </div>

        <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6 [column-fill:_balance]">
          {workExperiences.map((work, index) => (
            <article
              key={`${work.company}-${work.title}-${index}`}
              className="group relative overflow-hidden surface-card backdrop-blur transition-transform duration-300 hover:-translate-y-1 break-inside-avoid hover:border-theme-p/50"
            >
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-theme-a/12 blur-3xl" />
              <div className="absolute -left-12 bottom-0 h-24 w-24 rounded-full bg-theme-p/10 blur-3xl" />

              <div className="relative p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold muted-chip uppercase tracking-[0.1em]">
                      {work.company}
                    </span>
                    <div>
                      <p className="text-xs text-theme-lc">{work.period}</p>
                      <h3 className="text-xl font-bold text-theme-tc mt-1 leading-snug">{work.title}</h3>
                    </div>
                  </div>
                  <span className="px-3 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-theme-p/40 to-theme-a/40 border border-white/10 text-theme-tc shadow-inner">
                    #{(index + 1).toString().padStart(2, "0")}
                  </span>
                </div>

                {work.achievements && (
                  <ul className="space-y-3">
                    {work.achievements.map((item, achIndex) => (
                      <li
                        key={`${work.company}-ach-${achIndex}`}
                        className="relative pl-4 text-sm leading-relaxed text-theme-tc"
                      >
                        <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-theme-p shadow-[0_0_0_6px_rgba(91,214,198,0.12)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center justify-between text-[11px] text-theme-lc pt-1">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full muted-chip font-semibold">
                    {work.achievements ? work.achievements.length : 1} Highlights
                  </span>
                  <span className="px-3 py-1 rounded-full bg-base-100/40 border border-white/10 text-theme-lc">
                    Product / Engineering / Leadership
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
