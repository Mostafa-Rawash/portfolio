import React, { Component } from 'react'

import WorkExperience from "../Components/WorkExperience.jsx";
import VolunteerSection from "../Components/VolunteerSection.jsx";


export class Experiance extends Component {
  render() {
    return (
      <>
        <WorkExperience/>
        <VolunteerSection/>
      </>
    )
  }
}

export default Experiance