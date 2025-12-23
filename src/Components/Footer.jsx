import React from 'react'
import SocialIcon from "./SocialIcon.jsx";

export default function Footer() {
    return (
<footer className="bg-theme-cc/80 text-base px-6 lg:px-8 py-12 mt-12 border-t border-white/5">
<SocialIcon />
  <div className="max-w-screen-xl mx-auto">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      <div className="space-y-3">
        <h3 className="text-3xl font-black text-theme-tc">Let&apos;s build calm, scalable products.</h3>
        <p className="text-theme-lc max-w-xl">From roadmap to release, I help teams ship with confidence.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a href="mailto:mostafa@rawash.com" className="btn rounded-full bg-gradient-to-r from-theme-p to-theme-a text-theme-b border-0 font-semibold">Email me</a>
        <a href="https://wa.me/201099129550" className="btn rounded-full border border-white/10 bg-transparent text-theme-tc font-semibold">Book a call</a>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      <div className="rounded-2xl border border-white/10 bg-base-100/5 p-5">
        <h5 className="text-lg font-semibold text-theme-tc">Contact</h5>
        <ul className="mt-3 space-y-2 text-theme-lc">
          <li>mostafa@rawash.com</li>
          <li>+20 109 912 9550</li>
        </ul>
      </div>
      <div className="rounded-2xl border border-white/10 bg-base-100/5 p-5">
        <h5 className="text-lg font-semibold text-theme-tc">Social</h5>
        <ul className="mt-3 space-y-2 text-theme-lc">
          <li><a href="https://linkedin.com/in/mostafa-rawash" target="_blank" rel="noreferrer" className="hover:text-theme-p">LinkedIn</a></li>
          <li><a href="https://github.com/Mostafa-Rawash" target="_blank" rel="noreferrer" className="hover:text-theme-p">GitHub</a></li>
        </ul>
      </div>
      <div className="rounded-2xl border border-white/10 bg-base-100/5 p-5">
        <h5 className="text-lg font-semibold text-theme-tc">Location</h5>
        <p className="mt-3 text-theme-lc">Al Jizah, Egypt · Remote-friendly</p>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 mt-10 border-t border-white/5 pt-6">
      <p className="text-sm text-theme-lc">© {new Date().getFullYear()} Mostafa Rawash. Built with care.</p>
      <p className="text-sm text-theme-lc">Open to: CTO · Product Engineering · DevOps.</p>
    </div>
  </div>
</footer>
    )
  } 
