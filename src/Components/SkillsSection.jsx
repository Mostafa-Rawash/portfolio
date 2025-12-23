import React from 'react'

export default function SkillsSection({ profileData }) {
  const skillsFromProfile = profileData?.portfolioSite?.techSkills || {};
  const skillList = Object.entries(skillsFromProfile).map(([stackName, stackTech]) => ({
    stackName,
    stackTech,
  }));
  return (

    <section id='Skills' className="container mx-auto pt-24">
      <div className="section-shell space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Skills
            </div>
            <h2 className='text-5xl lg:text-7xl font-black text-theme-tc leading-tight'>Tech toolkit for building, scaling, and shipping.</h2>
            <p className="text-lg text-theme-lc max-w-2xl">
              A blend of product-minded engineering and DevOps craft to keep delivery fast and reliable.
            </p>
          </div>
          <div className="surface-card px-6 py-5">
            <p className="text-sm text-theme-lc">Primary stacks</p>
            <div className="flex flex-wrap gap-3 mt-3">
              <span className="px-4 py-2 rounded-full muted-chip text-xs font-semibold">MERN</span>
              <span className="px-4 py-2 rounded-full muted-chip text-xs font-semibold">DevOps</span>
              <span className="px-4 py-2 rounded-full muted-chip text-xs font-semibold">Product</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            skillList.map((skills, key) => {
              return (
                <div className="relative overflow-hidden surface-card p-6 hover:-translate-y-1 transition-transform duration-200" key={key}>
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-theme-p via-theme-a to-theme-lc" />
                  <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-theme-a/10 blur-3xl" />
                  <div className="relative">
                    <h2 className="text-2xl font-extrabold pb-4 text-theme-tc">{skills.stackName}</h2>
                    <ul className="space-y-3">
                      {skills.stackTech.map((tech, liKey) => {
                        return (
                          <li key={liKey} className='flex items-center gap-3'>
                            <div className="h-9 w-9 rounded-2xl bg-base-100/70 border border-white/10 grid place-items-center">
                              <img src={"/src/assets/Imgs/Skills/"+ tech + ".png"} className='h-6 w-6 object-contain' alt={tech + ".png"} />
                            </div>
                            <h3 className='text-lg font-semibold text-theme-tc'>
                            {tech}
                            </h3>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}
