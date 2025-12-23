import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import Home from "./Pages/Home.jsx";
import Blogs from "./Pages/Blogs.jsx";
import BlogDetail from "./Pages/BlogDetail.jsx";
import Admin from "./Pages/Admin.jsx";
import fallbackProfileData from "../profile_data.json";
import fallbackProjects from "./data/data.json";
import { fetchExperience, fetchProfile, fetchProjects } from "./services/api.js";

import "./App.css";

function App() {
  const [profileData, setProfileData] = useState(fallbackProfileData);
  const [projectsData, setProjectsData] = useState(fallbackProjects);
  const [experienceData, setExperienceData] = useState(
    fallbackProfileData?.portfolioSite?.workExperiences || []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchProfile(), fetchProjects(), fetchExperience()])
      .then(([profile, projects, experience]) => {
        if (!isMounted) {
          return;
        }
        if (profile) {
          setProfileData(profile);
        }
        if (projects?.length) {
          setProjectsData(projects);
        }
        if (experience?.length) {
          setExperienceData(experience);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <main className="space-y-16 lg:space-y-20" aria-busy={isLoading}>
              <Home
                profileData={profileData}
                projectsData={projectsData}
                experienceData={experienceData}
                isLoading={isLoading}
              />
            </main>
          }
        />
        <Route
          path="/blogs"
          element={
            <main className="space-y-16 lg:space-y-20">
              <Blogs />
            </main>
          }
        />
        <Route
          path="/blogs/:slug"
          element={
            <main className="space-y-16 lg:space-y-20">
              <BlogDetail />
            </main>
          }
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
