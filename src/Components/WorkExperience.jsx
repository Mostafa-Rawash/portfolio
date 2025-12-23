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
        <div className="space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                Experience
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-theme-tc leading-tight">
                Delivery-focused leadership across product and engineering.
              </h2>
              <p className="text-lg text-theme-lc">
                A clear timeline of roles, scope, and measurable outcomes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full lg:w-[420px]">
              <div className="surface-card p-4">
                <p className="text-xs text-theme-lc">Latest role</p>
                <h3 className="text-lg font-semibold text-theme-tc mt-2">
                  {workExperiences[0]?.title || "Technical Leadership"}
                </h3>
                <p className="text-sm text-theme-lc">{workExperiences[0]?.company || "SaaS / Product / DevOps"}</p>
              </div>
              <div className="surface-card p-4">
                <p className="text-xs text-theme-lc">Roles shipped</p>
                <p className="text-2xl font-bold text-theme-tc mt-2">{workExperiences.length}</p>
                <p className="text-sm text-theme-lc">Product-led delivery</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {workExperiences.map((work, index) => (
              <article
                key={`${work.company}-${work.title}-${index}`}
                className="surface-card card-accent p-5 transition-colors duration-200 hover:border-theme-p/50 h-full flex flex-col"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-theme-lc">{work.period}</p>
                    <h3 className="text-base font-semibold text-theme-tc mt-1">{work.title}</h3>
                    <p className="text-sm text-theme-lc mt-1">{work.company}</p>
                  </div>
                  <span className="text-xs font-semibold text-theme-lc">#{(index + 1).toString().padStart(2, "0")}</span>
                </div>

                {work.achievements && (
                  <ul className="mt-4 space-y-2">
                    {work.achievements.map((item, achIndex) => (
                      <li
                        key={`${work.company}-ach-${achIndex}`}
                        className="relative pl-4 text-sm leading-relaxed text-theme-tc"
                      >
                        <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-theme-p" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center justify-between text-[11px] text-theme-lc pt-4 mt-auto">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-semibold">
                    {work.achievements ? work.achievements.length : 1} Highlights
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Product / Engineering
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
