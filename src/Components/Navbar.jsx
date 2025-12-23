import React from "react";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/#top" },
  { name: "Skills", href: "/#Skills" },
  { name: "How I Work", href: "/#HowIWork" },
  { name: "Experience", href: "/#Work" },
  { name: "Projects", href: "/#Projects" },
  { name: "Community", href: "/#Volunteering" },
  { name: "Blogs", href: "/blogs" },
];

export default function Navbar() {
  return (
    <div id="top" className="sticky top-0 z-50">
      <div className="navbar container mx-auto mt-4 px-4 lg:px-6 border border-white/10 rounded-2xl bg-white/5">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-2 bg-base-100/90 rounded-box w-56 border border-white/10">
              {navigation.map((val) => (
                <li key={val.name}>
                  {val.href.startsWith("/") ? (
                    <Link className="text-base font-semibold text-theme-tc hover:text-theme-p" to={val.href}>
                      {val.name}
                    </Link>
                  ) : (
                    <a className="text-base font-semibold text-theme-tc hover:text-theme-p" href={val.href}>
                      {val.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <a href="#top" className="btn btn-ghost normal-case text-xl font-black text-theme-tc">
            MR<span className="text-theme-p">.</span>
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {navigation.map((val) => (
              <li key={val.name}>
                {val.href.startsWith("/") ? (
                  <Link
                    className="text-sm font-semibold px-3 py-2 rounded-full transition text-theme-tc hover:text-theme-p hover:bg-white/5"
                    to={val.href}
                  >
                    {val.name}
                  </Link>
                ) : (
                  <a
                    className="text-sm font-semibold px-3 py-2 rounded-full transition text-theme-tc hover:text-theme-p hover:bg-white/5"
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
            className="btn btn-sm rounded-full bg-theme-p text-theme-b border-0 font-semibold"
          >
            Send a brief
          </a>
        </div>
      </div>
    </div>
  );
}
