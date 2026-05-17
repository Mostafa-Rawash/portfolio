import React from "react";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/#top" },
  { name: "Skills", href: "/#Skills" },
  { name: "How I Work", href: "/#HowIWork" },
  { name: "Experience", href: "/#Work" },
  { name: "Projects", href: "/#Projects" },
  { name: "Community", href: "/#Volunteering" },
];

export default function Navbar() {
  return (
    <div id="top" className="sticky top-0 z-50">
      <div className="container mx-auto mt-4 px-4 lg:px-6">
        <div className="navbar rounded-2xl border border-white/[0.06] bg-theme-b/70 backdrop-blur-2xl px-4 lg:px-6 shadow-glow">
          <div className="navbar-start">
            <label htmlFor="nav-drawer" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <a href="#top" className="btn btn-ghost normal-case text-xl font-black text-theme-tc hover:bg-transparent">
              MR<span className="text-theme-p">.</span>
            </a>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-0.5">
              {navigation.map((val) => (
                <li key={val.name}>
                  {val.href.startsWith("/") ? (
                    <Link
                      className="text-[13px] font-semibold px-3 py-2 rounded-lg transition-all text-theme-lc hover:text-theme-p hover:bg-theme-p/5"
                      to={val.href}
                    >
                      {val.name}
                    </Link>
                  ) : (
                    <a
                      className="text-[13px] font-semibold px-3 py-2 rounded-lg transition-all text-theme-lc hover:text-theme-p hover:bg-theme-p/5"
                      href={val.href}
                    >
                      {val.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="navbar-end gap-2">
            <a
              href="mailto:mostafa@rawash.com"
              className="btn btn-sm rounded-xl bg-gradient-to-r from-theme-p to-violet-500 text-white border-0 font-bold shadow-glow"
            >
              Send a brief
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}