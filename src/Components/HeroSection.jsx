import React from "react";
import personalImage from "/src/assets/Imgs/MyImg/MyHeadPic.png";
const CV_LINK = "https://docs.google.com/document/d/1CLJD3bJbjpe35vzvNBKqY8OexdnHGqwr/edit";
const CVPages = ["/src/assets/Imgs/CV/1.webp", "/src/assets/Imgs/CV/2.webp", "/src/assets/Imgs/CV/3.webp"];

export default function HeroSection({ profileData }) {
  const heroCopy = profileData?.portfolioSite?.hero;
  const contact = profileData?.profile;
  return (
    <section className="container mx-auto pt-12 lg:pt-16">
      <div className="section-shell">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <div className="space-y-6">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Product + Tech leadership
            </div>
            <h1 className="text-3xl lg:text-5xl font-black leading-tight text-theme-tc">
              {heroCopy?.title || "Technical Leadership for high-velocity teams."}
            </h1>
            <p className="text-lg text-theme-lc max-w-3xl">
              {heroCopy?.summary ||
                "Strategic technology leader architecting scalable platforms, accelerating product delivery, and mentoring teams to ship with confidence."}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={CV_LINK}
                target="_blank"
                rel="noreferrer"
                className="btn border-0 rounded-full bg-gradient-to-r from-theme-p to-theme-a text-theme-b font-semibold px-6 shadow-lg shadow-theme-p/20"
              >
                View my CV
              </a>
              <label
                htmlFor="CV-drawer"
                className="btn rounded-full border border-white/10 bg-transparent text-theme-tc font-semibold px-6"
              >
                Preview CV
              </label>
              <a
                href="https://wa.me/201099129550"
                target="_blank"
                rel="noreferrer"
                className="btn rounded-full border border-white/10 bg-theme-cc text-theme-tc font-semibold px-6"
              >
                Book a call
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="surface-card px-4 py-3">
                <p className="text-xs text-theme-lc">Followers</p>
                <p className="text-2xl font-bold text-theme-tc">{contact?.followers || "1K+"}</p>
              </div>
              <div className="surface-card px-4 py-3">
                <p className="text-xs text-theme-lc">Connections</p>
                <p className="text-2xl font-bold text-theme-tc">{contact?.connections || "500+"}</p>
              </div>
              <div className="surface-card px-4 py-3">
                <p className="text-xs text-theme-lc">Location</p>
                <p className="text-xl font-semibold text-theme-tc">{contact?.location || "Remote-friendly"}</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-theme-p/12 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-44 w-44 rounded-full bg-theme-a/10 blur-3xl" />
            <div className="relative mx-auto max-w-md surface-card p-6 backdrop-blur">
              <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-b from-theme-p/10 to-theme-a/10 p-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(91,214,198,0.25),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(156,107,255,0.2),transparent_40%)]" />
                <img
                  src={personalImage}
                  alt="Mostafa Rawash"
                  className="relative mx-auto mask mask-circle shadow-3xl shadow-black/40 w-48 h-48 object-cover"
                  loading="lazy"
                />
                <div className="relative mt-4 flex flex-col items-center gap-1 text-center">
                  <span className="px-4 py-2 rounded-full bg-theme-p text-theme-b text-xs font-semibold">
                    CTO / Tech Lead
                  </span>
                  <h2 className="text-2xl font-bold text-theme-tc">{heroCopy?.name || "Mostafa M. Rawash"}</h2>
                  <p className="text-theme-lc text-sm">Building calm, scalable products.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="drawer z-50">
        <input id="CV-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="CV-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 min-h-full bg-theme-cc text-theme-tc w-10/12 md:w-6/12 lg:w-6/12 xl:5/12 carousel carousel-vertical rounded-box border border-white/10">
            <li>
              {CVPages.map((image) => {
                return (
                  <div className="carousel-item h-full" key={image}>
                    <img src={image} alt={"CV-" + image} />
                  </div>
                );
              })}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
