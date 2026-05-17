import React from 'react'
import SocialIcon from "./SocialIcon.jsx";

export default function Footer() {
  return (
<footer className="bg-theme-cc/40 backdrop-blur-sm text-base px-6 lg:px-8 py-16 mt-8 border-t border-white/[0.04]">
<SocialIcon />
  <div className="max-w-screen-xl mx-auto">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
      <div className="space-y-4">
        <h3 className="text-3xl lg:text-4xl font-black text-theme-tc leading-tight">Ready to ship your next product milestone?</h3>
        <p className="text-theme-lc max-w-xl text-lg">Let's align on roadmap, metrics, and delivery — and get it out the door.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a href="mailto:mostafa@rawash.com" className="btn rounded-xl bg-gradient-to-r from-theme-p to-violet-500 text-white border-0 font-bold shadow-glow">Send a brief</a>
        <a href="https://wa.me/201099129550" className="btn rounded-xl bg-theme-a/10 border border-theme-a/20 text-theme-a font-bold">Book a call</a>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
      <div className="surface-card p-6">
        <h5 className="text-base font-bold text-theme-tc">Contact</h5>
        <ul className="mt-4 space-y-3 text-theme-lc text-sm">
          <li>mostafa@rawash.com</li>
          <li>+20 109 912 9550</li>
        </ul>
      </div>
      <div className="surface-card p-6">
        <h5 className="text-base font-bold text-theme-tc">Social</h5>
        <ul className="mt-4 space-y-3 text-sm">
          <li><a href="https://linkedin.com/in/mostafa-rawash" target="_blank" rel="noreferrer" className="text-theme-a hover:text-theme-p font-semibold transition-colors">LinkedIn</a></li>
          <li><a href="https://github.com/Mostafa-Rawash" target="_blank" rel="noreferrer" className="text-theme-a hover:text-theme-p font-semibold transition-colors">GitHub</a></li>
        </ul>
      </div>
      <div className="surface-card p-6">
        <h5 className="text-base font-bold text-theme-tc">Location</h5>
        <p className="mt-4 text-theme-lc text-sm">Al Jizah, Egypt — Remote-friendly</p>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 mt-12 border-t border-white/[0.04] pt-8">
      <p className="text-sm text-theme-lc">&copy; {new Date().getFullYear()} Mostafa Rawash. Built with care.</p>
      <p className="text-sm text-theme-lc">Open to: PM &middot; Technical PM &middot; Product Engineering</p>
    </div>
  </div>
</footer>
  )
}