import Container from "react-bootstrap/Container";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React from "react";

import image1 from "../assets/project one.png";
import image2 from "../assets/project two.png";
import image3 from "../assets/project three.png";
const projectsData = [
  {
    title: "Project Name",
    subtitle:
      "I created this personal project in order to show how to create an interface in Figma using a portfolio as an example.",
    image: image1,
    callToAction: "View Project",
  },
  {
    title: "Project Name",
    subtitle:"What was your role, your deliverables, if the project was personal, freelancing." ,   
    image: image2,
    callToAction: "View Project",
  },{
    title: "Project Name",
    subtitle:"You can also add in this description the type of the project, if it was for web, mobile, electron.",
     image: image3,
    callToAction: "View Project",
  },
];

export default function Projects() {
  return (
    <Container id="projects">
      <h2>Projects</h2>
      {projectsData.map(({ title, subtitle, image, callToAction }) => {
        return (
            <Row className="project--section d-flex">
              <Col className="leftCol p-2">
                <div className="projectDesc">

                <h3 className="projectDesc--title">{title}</h3>
                <p className="projectDesc--subtitle">{subtitle}</p>
                <Button className="mx-2" variant="info">
                  {callToAction}
                </Button>
                </div>
              </Col>
              <Col className="project--image">
                <img src={image} alt="" />
              </Col>
            </Row>
        );
      })}
    </Container>
  );
}
