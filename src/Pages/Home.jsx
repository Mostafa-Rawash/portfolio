import HeroSection from "../Components/HeroSection.jsx";
import SkillsSection from "../Components/SkillsSection.jsx";
import WorkExperience from "../Components/WorkExperience.jsx";
import VolunteerSection from "../Components/VolunteerSection.jsx";
import Projects from "../Components/Projects.jsx";
import Loader from "../Components/Loader.jsx";

function Home({ profileData, projectsData, experienceData, isLoading }) {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeroSection profileData={profileData} />
      <SkillsSection profileData={profileData} />
      <WorkExperience profileData={profileData} experiences={experienceData} />
      <VolunteerSection profileData={profileData} />
      <Projects profileData={profileData} projects={projectsData} />
    </>
  );
}

export default Home;
