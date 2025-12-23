import React from 'react'

import Project from './Project'
import richProjects from "../data/data.json";

export default function Projects({ profileData, projects }) {
  const ProjectsList =
    projects && projects.length
      ? projects
      : profileData?.projects?.length
        ? profileData.projects
        : richProjects || [];
  return (
    <section id='Projects' className="pt-24 container mx-auto">
      <div className="section-shell">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-10">
          <div className="space-y-3">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Projects
            </div>
            <h2 className='text-3xl lg:text-5xl font-black text-theme-tc leading-tight'>Launches, experiments, and real-world impact.</h2>
            <p className="text-theme-lc max-w-2xl text-lg">
              A mix of SaaS, automation, and product builds. Hover to explore the stack, click to dive deeper.
            </p>
          </div>
          <div className="surface-card px-6 py-5">
            <p className="text-sm text-theme-lc">Shipping style</p>
            <div className="flex flex-wrap gap-3 mt-3">
              <span className="px-4 py-2 rounded-full muted-chip text-xs font-semibold">Fast MVPs</span>
              <span className="px-4 py-2 rounded-full muted-chip text-xs font-semibold">CI/CD</span>
              <span className="px-4 py-2 rounded-full muted-chip text-xs font-semibold">Data-first</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
          {ProjectsList.map((project, key) => (
            <Project project={project} key={key} />
          ))}
        </div>
      </div>
    </section>
  );
}
