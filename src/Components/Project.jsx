import React from 'react'

export default function Project({ project }) {
  return (
    <div className="group relative overflow-hidden surface-card card-accent my-2 transition-all duration-300 hover:border-theme-p/20 hover:shadow-glow h-full flex flex-col">
      <div className="flex flex-col h-full">
        {project.img && (
          <figure className='relative h-44 overflow-hidden'>
            <img
              src={project.img}
              alt={project.name}
              className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </figure>
        )}
        <div className="card-body w-full gap-3 p-5">
          <h2 className="text-base text-theme-tc font-bold">{project.name}</h2>
          {project.impact && (
            <p className="text-xs font-bold bg-gradient-to-r from-theme-p to-theme-a bg-clip-text text-transparent">{project.impact}</p>
          )}
          <p className="text-theme-lc text-sm leading-relaxed">{project.description || project.des?.[0]?.main}</p>
          {project.period && (
            <span className="text-xs font-bold text-theme-lc rounded-lg px-3 py-1 w-max border border-white/[0.06] bg-white/[0.02]">
              {project.period}
            </span>
          )}
          {project.badges && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.badges.slice(0, 5).map((badge, key) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[11px] font-semibold text-theme-lc"
                >
                  {badge}
                </span>
              ))}
              {project.badges.length > 5 && (
                <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-theme-p/10 to-theme-a/8 text-theme-p text-xs font-bold">
                  +{project.badges.length - 5}
                </span>
              )}
            </div>
          )}
          {project.gitUrl && (
            <a
              href={project.gitUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-theme-a hover:text-theme-p transition-colors mt-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}