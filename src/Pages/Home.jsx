import Projects from "../Components/Projects.jsx";
import SkillsSection from "../Components/SkillsSection.jsx";
import WorkExperience from "../Components/WorkExperience.jsx";
import VolunteerSection from "../Components/VolunteerSection.jsx";

import Loader from "../Components/Loader.jsx";

import { useState , useEffect } from "react";


function Home() {
  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    setScreenLoading(true);
    setTimeout(() => {
      setScreenLoading(false);
    }, 4900);
  }, []);

  return (
    <>
      {screenLoading ? (<Loader />) : 
      (
        <>
        <SkillsSection />
        <WorkExperience />
        <VolunteerSection />
        <Projects />
      </>
      )
      }
    </>
  );
}

export default Home;
