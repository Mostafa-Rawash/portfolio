import Navbar from "./Components/Navbar.jsx";
import HeroSection from "./Components/HeroSection.jsx";
import Home from "./Pages/Home.jsx"
import Skills from "./Pages/Skills.jsx"
import Experiences from "./Pages/Experiences.jsx"

import Projects from "./Components/Projects.jsx";
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
            <Route path="/" element={ <Home />}/>
            <Route path="/skills" element={<Skills />} />
            <Route path="/experiances" element={<Experiences />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
          <Footer />
        </Router>
  );
}

export default App;
