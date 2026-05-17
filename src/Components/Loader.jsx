import React from "react";

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-theme-b">
      <div className="absolute inset-0 bg-gradient-to-br from-theme-p/[0.04] via-transparent to-theme-a/[0.04]" />
      <div className="relative flex flex-col items-center gap-5">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-xl border-2 border-theme-p/20 border-t-theme-p animate-spin" />
          <div className="absolute inset-3 rounded-lg bg-theme-p/10 animate-pulse" />
        </div>
        <p className="text-theme-tc font-bold tracking-wide text-sm">Loading experience...</p>
      </div>
    </div>
  );
}

export default Loader;