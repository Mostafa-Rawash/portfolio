import Navbar from "./Components/Navbar.jsx";
import HeroSection from "./Components/HeroSection.jsx";
import SkillsSection from "./Components/SkillsSection.jsx";
import WorkExperience from "./Components/WorkExperience.jsx";
import VolunteerSection from "./Components/VolunteerSection.jsx";
import Projects from "./Components/Projects.jsx";
import Footer from "./Components/Footer.jsx";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main className="space-y-16 lg:space-y-20">
        <HeroSection />
        <SkillsSection />
        <WorkExperience />
        <VolunteerSection />
        <Projects />
      </main>
      <Footer />
    </>
  );
}

export default App;
