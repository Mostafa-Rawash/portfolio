import React from "react";
import profileData from "../../profile_data.json";

const VolunteerList = profileData?.volunteering || [];

export default function VolunteerSection() {
  return (
    <section id="Volunteering" className="container mx-auto pt-20 pb-10">
      <div className="section-shell space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Volunteering
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-theme-tc leading-tight">Communities & competitions.</h2>
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
                className="relative overflow-hidden surface-card p-6 hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-theme-p via-theme-a to-theme-lc" />
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
