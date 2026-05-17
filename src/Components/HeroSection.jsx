import React from "react";
import personalImage from "/src/assets/Imgs/MyImg/MyHeadPic.png";
const CV_LINK = "https://docs.google.com/document/d/1CLJD3bJbjpe35vzvNBKqY8OexdnHGqwr/edit";

export default function HeroSection({ profileData, onOpenCV }) {
  const heroCopy = profileData?.portfolioSite?.hero;
  const contact = profileData?.profile;
  return (
    <section className="container mx-auto pt-16 lg:pt-24 pb-12">
      <div className="section-shell">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div className="space-y-7">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              PM / Technical Product Manager
            </div>
            <h1 className="text-4xl lg:text-6xl font-black leading-[1.08] tracking-tight text-theme-tc">
              {heroCopy?.title || "Shipping products that move metrics — from roadmap to release."}
            </h1>
            <p className="text-lg lg:text-xl text-theme-lc max-w-3xl leading-relaxed">
              {heroCopy?.summary ||
                "Product manager and technical leader who turns ambiguous problems into shipped outcomes."}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={CV_LINK}
                target="_blank"
                rel="noreferrer"
                className="btn border-0 rounded-xl bg-gradient-to-r from-theme-p to-violet-500 text-white font-bold px-7 shadow-glow"
              >
                Resume
              </a>
              <a
                href="#Projects"
                className="btn rounded-xl border border-white/10 bg-white/[0.03] text-theme-tc font-bold px-7"
              >
                Projects
              </a>
              <button
                onClick={onOpenCV}
                className="btn rounded-xl border border-white/10 bg-white/[0.03] text-theme-tc font-bold px-7"
              >
                Preview CV
              </button>
              <a
                href="https://wa.me/201099129550"
                target="_blank"
                rel="noreferrer"
                className="btn rounded-xl bg-theme-a/10 border border-theme-a/20 text-theme-a font-bold px-7"
              >
                Book a call
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-3">
              <div className="surface-card px-4 py-3 text-center">
                <p className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-theme-p to-violet-400 bg-clip-text text-transparent">{contact?.followers || "1K+"}</p>
                <p className="text-xs text-theme-lc mt-1">Followers</p>
              </div>
              <div className="surface-card px-4 py-3 text-center">
                <p className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-theme-a to-cyan-300 bg-clip-text text-transparent">{contact?.connections || "500+"}</p>
                <p className="text-xs text-theme-lc mt-1">Connections</p>
              </div>
              <div className="surface-card px-4 py-3 text-center">
                <p className="text-lg lg:text-xl font-bold text-theme-tc">{contact?.location || "Remote"}</p>
                <p className="text-xs text-theme-lc mt-1">Location</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative max-w-sm w-full">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-theme-p/12 via-transparent to-theme-a/8 blur-3xl" />
              <div className="relative surface-card p-6 backdrop-blur-xl">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-theme-p/6 to-theme-a/4 p-5">
                  <img
                    src={personalImage}
                    alt="Mostafa Rawash portrait"
                    className="relative mx-auto mask mask-circle shadow-3xl shadow-black/40 w-44 h-44 object-cover"
                    loading="lazy"
                  />
                  <div className="relative mt-5 flex flex-col items-center gap-2 text-center">
                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-theme-p/12 to-theme-a/8 text-theme-p text-xs font-bold tracking-wide border border-theme-p/15">
                      PM · Technical PM · Delivery Lead
                    </span>
                    <h2 className="text-2xl font-black text-theme-tc">{heroCopy?.name || "Mostafa M. Rawash"}</h2>
                    <p className="text-theme-lc text-sm">Shipping products that move metrics — from roadmap to release.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}