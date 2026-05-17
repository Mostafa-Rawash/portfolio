import React from 'react'

export default function SkillsSection({ profileData }) {
  const skillsFromProfile = profileData?.portfolioSite?.techSkills || {};
  const skillList = Object.entries(skillsFromProfile).map(([stackName, stackTech]) => ({
    stackName,
    stackTech,
  }));
  const primaryStacks = [
    ...(skillsFromProfile.productAndDelivery || []),
  ].slice(0, 8);
  const secondaryStacks = [
    ...(skillsFromProfile.frontEnd || []),
    ...(skillsFromProfile.backEnd || []),
    ...(skillsFromProfile.databases || []),
    ...(skillsFromProfile.devOps || []),
    ...(skillsFromProfile.design || []),
  ].slice(0, 10);

  const labelMap = {
    productAndDelivery: "Product & Delivery",
    frontEnd: "Frontend",
    backEnd: "Backend",
    databases: "Databases",
    devOps: "DevOps & Cloud",
    design: "Design",
  };

  return (
    <section id='Skills' className="container mx-auto pt-20 pb-12">
      <div className="section-shell space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Skills
            </div>
            <h2 className='text-3xl lg:text-5xl font-black text-theme-tc leading-tight tracking-tight'>Product skills up front, technical depth below.</h2>
            <p className="text-lg text-theme-lc max-w-2xl">
              Strategy and delivery tools alongside the engineering stack.
            </p>
          </div>
          <div className="surface-card px-6 py-5 lg:w-[380px]">
            <p className="text-sm text-theme-lc font-semibold">Product & delivery</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {primaryStacks.map((item) => (
                <span key={item} className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-theme-p/10 to-violet-500/8 text-theme-p text-xs font-bold border border-theme-p/10">
                  {item}
                </span>
              ))}
            </div>
            {secondaryStacks.length > 0 && (
              <>
                <p className="text-xs text-theme-lc mt-4 font-semibold">Engineering stack</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {secondaryStacks.map((item) => (
                    <span key={item} className="px-2.5 py-1 rounded-lg border border-white/[0.06] bg-white/[0.02] text-[11px] font-semibold text-theme-lc">
                      {item}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillList.map((skills, key) => {
            const label = labelMap[skills.stackName] || skills.stackName;
            return (
              <div className="relative overflow-hidden surface-card card-accent p-5 transition-all duration-300 hover:border-theme-p/20 hover:shadow-glow" key={key}>
                <div className="relative">
                  <h2 className="text-base font-bold pb-3 text-theme-tc">{label}</h2>
                  <ul className="space-y-2.5">
                    {skills.stackTech.map((tech, liKey) => {
                      return (
                        <li key={liKey} className='flex items-center gap-3 group/skill'>
                          <div className="skill-icon-box">
                            <img src={"/skills/"+ tech + ".svg"} onError={(e) => { e.target.onerror = null; e.target.src = "/skills/"+ tech + ".png" }} className='h-5 w-5 object-contain' alt={tech} />
                          </div>
                          <h3 className='text-sm font-semibold text-theme-tc group-hover/skill:text-theme-p transition-colors'>
                          {tech}
                          </h3>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}