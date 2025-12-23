import React from 'react'

export default function Project(props) {
  const hasDrawer = props.project?.badges || props.project?.img || props.project?.des;
  const drawerId = (props.project?.name || "project")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return (
    <div className="group relative overflow-hidden surface-card card-accent my-4 transition-colors duration-200 hover:border-theme-p/50 h-full flex flex-col">
      <div className="flex flex-col h-full">
        {props.project.img && (
          <figure className='relative h-48 overflow-hidden'>
            <img
              src={props.project.img}
              alt={props.project.name}
              className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </figure>
        )}
        <div className="card-body w-full gap-3">
          <h2 className="card-title text-base text-theme-tc font-semibold">
            {hasDrawer ? (
              <label htmlFor={`${drawerId}-drawer`} className="cursor-pointer hover:text-theme-p transition">
                {props.project.name}
              </label>
            ) : (
              props.project.name
            )}
          </h2>
          {props.project.impact && (
            <p className="text-sm font-semibold text-theme-tc">{props.project.impact}</p>
          )}
          <p className="text-theme-lc text-sm">{props.project.description || props.project.des?.[0]?.main}</p>
          {props.project.period && (
            <span className="text-xs font-semibold text-theme-tc rounded-full px-3 py-1 w-max border border-white/10 bg-white/5">
              {props.project.period}
            </span>
          )}
          {props.project.badges && (
            <div className="flex flex-wrap gap-2">
              <span className="text-[11px] uppercase tracking-[0.14em] text-theme-lc w-full">Stack</span>
              {props.project.badges.slice(0, 4).map((badge, key) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-theme-tc"
                >
                  <img src={"/src/assets/Imgs/Skills/" + badge + ".png"} className='w-5 h-5 object-contain' alt={badge+".png"} />
                  {badge}
                </span>
              ))}
              {props.project.badges.length > 4 && (
                <span className="px-3 py-1 rounded-full bg-theme-p text-theme-b text-xs font-semibold">
                  +{props.project.badges.length - 4} more
                </span>
              )}
            </div>
          )}
          {props.project.gitUrl && (
            <a
              href={props.project.gitUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-theme-lc hover:text-theme-p"
            >
              View GitHub →
            </a>
          )}
        </div>
      </div>

      {hasDrawer && (
        <div className="drawer z-50 absolute">
          <input id={`${drawerId}-drawer`} type="checkbox" className="drawer-toggle" />
          <div className="drawer-side text-theme-tc">
            <label
              htmlFor={`${drawerId}-drawer`}
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="menu p-4 min-h-full bg-theme-cc text-base-content w-10/12 md:w-6/12 lg:w-6/12 xl:5/12 border border-white/10">
              {props.project.img && <div className="mockup-browser border bg-base-300 shadow-md w-full">
                <div className="mockup-browser-toolbar">
                  <div className="input text-center">Scroll to explore visuals</div>
                </div>

                <div className="h-96 carousel carousel-vertical rounded-box w-full text-center ">
                  <div className="carousel-item self-center " >
                    <img className='' src={props.project.img} alt={props.project.img} loading="lazy" />
                  </div>
                  {props.project.gallary && props.project.gallary.map((img, key) => {
                    return (
                      <div className="carousel-item" key={key}>
                        <img src={"/src/assets/Imgs/Projects/" + img + ".png"}  alt={img + ".png"} loading="lazy"/>
                      </div>
                    )
                  })}
                </div>
              </div>}
              {props.project.badges && (
                <div className="flex flex-wrap gap-3 bg-base-100 rounded-3xl shadow-xl w-full p-4 border border-white/10">
                  {props.project.badges.map((badge, key) => {
                    return (
                      <div className="inline-flex items-center gap-2 rounded-full bg-theme-cc/80 border border-white/10 px-3 py-1 text-xs font-semibold text-theme-tc" key={key}>
                        <img src={"/src/assets/Imgs/Skills/" + badge + ".png" } alt={badge + ".png"}  className='w-6 h-6' />
                        {badge}
                      </div>
                    )
                  })}
                </div>
              )}
              <div className='py-8 flex justify-between items-center w-full'>
                <h2 className='text-3xl font-bold text-theme-tc'>{props.project.name}</h2>
                {props.project.gitUrl && <a href={props.project.gitUrl} target='_blank' rel="noreferrer" className='text-md flex items-center gap-1 text-theme-lc hover:text-theme-a'>
                  View GitHub
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>}
              </div>
              <div className='w-full'>
                <ol className='w-full list-decimal text-theme-tc space-y-2'>
                  {props.project.des && props.project.des.map((desc, key) => {
                    return (
                      <li className='w-full leading-relaxed' key={key}>
                        {desc.main}
                        <ul className='w-full list-disc pl-5'>
                          {desc.sub && desc.sub.map((sub, subkey) => {
                            return (
                              <li key={subkey} className='w-full whitespace-break-spaces text-theme-lc'>
                                 {sub}
                              </li>
                            )
                          })}
                        </ul>
                      </li>
                    )
                  })}
                  {!props.project.des && props.project.description && (
                    <li className="leading-relaxed text-theme-lc list-none">{props.project.description}</li>
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>

  )
}
