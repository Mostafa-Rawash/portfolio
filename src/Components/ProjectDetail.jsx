import React from "react";

export default function ProjectDetail({ project }) {
  return (
    <div className="space-y-6 text-theme-tc">
      {project.img && (
        <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-theme-b">
          <div className="h-72 overflow-hidden">
            <img
              src={project.img}
              alt={project.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {project.gallary && project.gallary.length > 0 && (
            <div className="carousel carousel-vertical rounded-none h-72 w-full">
              {project.gallary.map((img, key) => (
                <div className="carousel-item" key={key}>
                  <img src={"/projects/" + img + ".png"} alt={img + ".png"} loading="lazy" className="w-full" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {project.badges && (
        <div className="flex flex-wrap gap-2">
          {project.badges.map((badge, key) => (
            <span className="px-3 py-1 rounded-lg text-xs font-semibold border border-theme-p/10 bg-gradient-to-r from-theme-p/8 to-violet-500/6 text-theme-p" key={key}>
              {badge}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {project.impact && (
          <p className="text-sm font-bold bg-gradient-to-r from-theme-p to-theme-a bg-clip-text text-transparent">{project.impact}</p>
        )}
        {project.period && (
          <span className="text-xs font-semibold text-theme-lc rounded-lg px-3 py-1 border border-white/[0.06] bg-white/[0.02]">
            {project.period}
          </span>
        )}
      </div>

      <div className="w-full space-y-3">
        {project.des && project.des.map((desc, key) => (
          <div key={key} className="space-y-1.5">
            <p className="leading-relaxed text-sm text-theme-tc font-semibold">{desc.main}</p>
            {desc.sub && (
              <ul className="space-y-1.5">
                {desc.sub.map((sub, subkey) => (
                  <li key={subkey} className="flex gap-2.5 text-sm text-theme-lc">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-theme-p to-theme-a flex-shrink-0" />
                    {sub}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {!project.des && project.description && (
          <p className="leading-relaxed text-sm text-theme-lc">{project.description}</p>
        )}
      </div>

      {project.gitUrl && (
        <a href={project.gitUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-theme-a hover:text-theme-p transition-colors mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          View source on GitHub
        </a>
      )}
    </div>
  );
}