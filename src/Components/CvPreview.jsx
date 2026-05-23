import React from "react";

const CVPages = ["/cv/1.webp", "/cv/2.webp", "/cv/3.webp"];

export default function CvPreview() {
  return (
    <div className="space-y-4 text-theme-tc">
      <p className="text-sm text-theme-lc">Scroll to view all pages</p>
      <div className="carousel carousel-vertical rounded-2xl h-[70vh] w-full border border-white/[0.06]">
        {CVPages.map((image, index) => (
          <div className="carousel-item h-full flex items-center justify-center bg-theme-b" key={image}>
            <img src={image} alt={`Resume page ${index + 1}`} className="w-full" />
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-center pt-2">
        {CVPages.map((_, index) => (
          <span key={index} className="h-1.5 w-6 rounded-full bg-gradient-to-r from-theme-p/30 to-theme-a/30" />
        ))}
      </div>
    </div>
  );
}