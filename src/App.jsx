// Component Calling
import Navbar from "./Components/Navbar.jsx";
import HeroSection from "./Components/HeroSection.jsx";
import Projects from "./Components/Projects.jsx";
import Footer from "./Components/Footer.jsx";

// Pages Calling
import Home from "./Pages/Home.jsx"
import Skills from "./Pages/Skills.jsx"
import Experiences from "./Pages/Experiences.jsx"
import Resume from "./Pages/Resume.jsx"

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

function App() {  return (
        <Router>
          <Navbar />
          <HeroSection />
          <Routes>
            <Route path="/" element={ <Home />}/>
            <Route path="/skills" element={<Skills />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
          <Footer />
        </Router>
  );
}

export default App;
