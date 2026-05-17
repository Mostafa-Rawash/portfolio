import { Routes, Route } from "react-router-dom";

import Footer from "./Components/Footer.jsx";
import Home from "./Pages/Home.jsx";
import { fetchProfile, fetchProjects, fetchExperience } from "./services/api.js";

import "./App.css";

const profileData = fetchProfile();
const projectsData = fetchProjects();
const experienceData = fetchExperience();

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Home
                profileData={profileData}
                projectsData={projectsData}
                experienceData={experienceData}
              />
            </main>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;