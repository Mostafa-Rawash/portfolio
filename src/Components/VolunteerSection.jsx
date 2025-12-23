import React from "react";

export default function VolunteerSection({ profileData }) {
  const VolunteerList = profileData?.volunteering || [];
  return (
    <section id="Volunteering" className="container mx-auto pt-20 pb-10">
      <div className="section-shell space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Volunteering
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-theme-tc leading-tight">Communities & competitions.</h2>
            <p className="text-lg text-theme-lc max-w-2xl">
              Giving back through mentorship, competitions, and community projects.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {VolunteerList.map((work, key) => {
            return (
              <article
                key={key}
                className="relative overflow-hidden surface-card card-accent p-5 transition-colors duration-200 hover:border-theme-p/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-theme-lc">{work.period || `${work.startDate || ""} ${work.endDate ? `- ${work.endDate}` : ""}`}</p>
                    <h3 className="text-2xl font-bold text-theme-tc">{work.organization}</h3>
                    <p className="text-theme-lc text-sm">{work.position}</p>
                  </div>
                  <span className="px-3 py-2 rounded-full text-xs font-semibold muted-chip">
                    Impact
                  </span>
                </div>
                {work.description && (
                  <p className="mt-4 text-theme-tc leading-relaxed">{work.description}</p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
