import Navbar from "./Components/Navbar.jsx";
import HeroSection from "./Components/HeroSection.jsx";
import Home from "./Pages/Home.jsx"
import SocialIcon from "./Components/Social Icon.jsx";
import Projects from "./Components/Projects.jsx";
import SkillsSection from "./Components/SkillsSection.jsx";
import WorkExperience from "./Components/WorkExperience.jsx";
import Footer from "./Components/Footer.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState , useEffect } from "react";
import "./App.css";

function App() {  return (
        <Router>
          <Navbar />
          <HeroSection />
          <Routes>
            {/* In home page will display all Components
            In each page display
              <Navbar />
              <HeroSection />
                  {page content}
              <SocialIcon />
              <Footer/>
    */}
            <Route
              path="/"
              element={
                <>
                  <Home />
                </>
              }
            />
            <Route path="/skills" element={<SkillsSection />} />
            <Route path="/work" element={<WorkExperience />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
          <SocialIcon />
          <Footer />
        </Router>
  );
}

export default App;
