import React, { Component } from 'react'


import SkillsSection from "../Components/SkillsSection.jsx";
import CourseSection from "../Components/CourcesSection.jsx";



export class Skills extends Component {
  render() {
    return (
        <>
        <SkillsSection/>
        <CourseSection/>
        </>
    )
  }
}

export default Skills