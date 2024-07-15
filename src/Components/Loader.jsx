import React from "react";

function Loader() {
  return (
    <div class="h-screen w-full content-center text-center top-0 fixed bg-theme-b">
      <img
        src="/src/assets/preloader/welcome.gif"
        alt="Your GIF"
        className=" m-auto w-96"
      />
    </div>
  );
}

export default Loader;
