import React from "react";

export default function VolunteerSection({ profileData }) {
  const VolunteerList = profileData?.volunteering || [];
  return (
    <section id="Volunteering" className="container mx-auto pt-20 pb-12">
      <div className="section-shell space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Volunteering
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-theme-tc leading-tight tracking-tight">Community leadership and product impact.</h2>
            <p className="text-lg text-theme-lc max-w-2xl">
              Mentorship, community programs, and impact-driven initiatives that build stronger teams.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {VolunteerList.map((work, key) => {
            return (
              <article
                key={key}
                className="relative overflow-hidden surface-card card-accent p-5 transition-all duration-300 hover:border-theme-p/20 hover:shadow-glow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-theme-lc font-semibold">{work.period || `${work.startDate || ""} ${work.endDate ? `- ${work.endDate}` : ""}`}</p>
                    <h3 className="text-xl font-black text-theme-tc">{work.organization}</h3>
                    <p className="text-theme-lc text-sm">{work.position || work.role}</p>
                  </div>
                  <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-theme-p/10 to-theme-a/8 text-theme-p border border-theme-p/10">
                    Impact
                  </span>
                </div>
                {work.description && (
                  <p className="mt-4 text-theme-tc leading-relaxed text-sm">{work.description}</p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}