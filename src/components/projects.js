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
      title: "Betrend",
      subtitle:
        "Managed the team consisting of 4 team members to release the AI SAAS (software as a service) project ,Developed a AI SAAS web application using Frappe framework that’s created in Oracle server to be accessible from websites and Android devices using:",
      image: image3,
      callToAction: "View Project",
    },
  {
    title: "Faxes Management System",
    subtitle:
      "Created an application that takes new faxes from the fax machine, shares them in a local network, and then sends new faxes to specific users with authorization.",
    image: image1,
  },
  {
    title: "Letcut",
    subtitle:
      "Created a landing page for a video production company ,Made the outlines of the website using Elementor (a free subscription WordPress plugin) to achieve the client’s request, Made many changes using pure HTML and JS to reduce the cost, and update the page performance to achieve 98%, Upgraded the SEO of the site to achieve 90% in PageSpeed Insights.",
    image: image2,
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
                {callToAction ? (
                  <Button className="mx-2" variant="info">
                    {callToAction}
                  </Button>
                ) : (
                  ""
                )}
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
