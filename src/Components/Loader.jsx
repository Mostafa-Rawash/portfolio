import React from "react";

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_20%,rgba(91,214,198,0.12),transparent),radial-gradient(140%_140%_at_80%_0%,rgba(156,107,255,0.14),transparent),radial-gradient(100%_100%_at_50%_70%,rgba(247,183,51,0.1),transparent)] bg-theme-b backdrop-blur" />
      <div className="relative flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-theme-p/30 border-t-theme-p animate-spin" />
          <div className="absolute inset-3 rounded-full bg-theme-cc/80 blur-sm" />
        </div>
        <p className="text-theme-tc font-semibold tracking-wide">Loading experience...</p>
      </div>
    </div>
  );
}

export default Loader;
