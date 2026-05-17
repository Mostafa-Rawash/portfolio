import React, { useState } from "react";
import HeroSection from "../Components/HeroSection.jsx";
import SkillsSection from "../Components/SkillsSection.jsx";
import WorkExperience from "../Components/WorkExperience.jsx";
import Projects from "../Components/Projects.jsx";
import VolunteerSection from "../Components/VolunteerSection.jsx";
import Sidebar from "../Components/Sidebar.jsx";
import CvPreview from "../Components/CvPreview.jsx";

function Home({ profileData, projectsData, experienceData }) {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <>
      <HeroSection profileData={profileData} onOpenCV={() => setCvOpen(true)} />
      <SkillsSection profileData={profileData} />
      <WorkExperience profileData={profileData} experiences={experienceData} />
      <Projects profileData={profileData} projects={projectsData} />
      <VolunteerSection profileData={profileData} />

      <Sidebar isOpen={cvOpen} onClose={() => setCvOpen(false)}>
        <CvPreview />
      </Sidebar>
    </>
  );
}

export default Home;