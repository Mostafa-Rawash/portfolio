import SkillsSection from "../Components/SkillsSection.jsx";
import WorkExperience from "../Components/WorkExperience.jsx";
import VolunteerSection from "../Components/VolunteerSection.jsx";

import Loader from "../Components/Loader.jsx";

import { useState , useEffect, Suspense, lazy } from "react";

const Projects = lazy(() => import("../Components/Projects.jsx"));


function Home() {
  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    setScreenLoading(true);
    setTimeout(() => {
      setScreenLoading(false);
    }, 1200);
  }, []);

  return (
    <>
      {screenLoading ? (<Loader />) : 
      (
        <>
        <SkillsSection />
        <WorkExperience />
        <VolunteerSection />
        <Suspense fallback={<Loader />}>
          <Projects />
        </Suspense>
      </>
      )
      }
    </>
  );
}

export default Home;
