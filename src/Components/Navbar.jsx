import React from "react";

const navigation = [
  { name: "Dashboard", href: "#top" },
  { name: "Skills", href: "#Skills" },
  { name: "Work", href: "#Work" },
  { name: "Volunteering", href: "#Volunteering" },
  { name: "Projects", href: "#Projects" },
];

export default function Navbar() {
  return (
    <div id="top" className="sticky top-0 z-50 backdrop-blur-xl">
      <div className="navbar container mx-auto mt-4 px-4 lg:px-6 surface-card backdrop-blur-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-2 shadow bg-theme-cc/95 rounded-box w-56 border border-white/10">
              {navigation.map((val) => (
                <li key={val.name}>
                  <a
                    className="text-lg font-semibold text-theme-tc hover:text-theme-p"
                    href={val.href}
                  >
                    {val.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <a href="#top" className="btn btn-ghost normal-case text-xl font-black text-theme-tc">
            MR<span className="text-theme-p">.</span>
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navigation.map((val) => (
              <li key={val.name}>
                <a
                  className="text-sm font-semibold px-3 py-2 rounded-full transition text-theme-tc hover:text-theme-p hover:bg-gradient-to-r hover:from-theme-p/20 hover:to-theme-a/20 hover:border hover:border-white/10"
                  href={val.href}
                >
                  {val.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <a
            href="https://linkedin.com/in/mostafa-rawash"
            target="_blank"
            rel="noreferrer"
            aria-label="social-linkedin"
            className="btn btn-sm rounded-full bg-gradient-to-r from-theme-p to-theme-a text-theme-b border-0 font-semibold"
          >
            Let&apos;s connect
          </a>
        </div>
      </div>
    </div>
  );
}
