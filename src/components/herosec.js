import Container from "react-bootstrap/Container";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React from "react";

import bannerImage from "../assets/main.png";
import CV from "../assets/Mostafa-Rawash-SE.pdf"
export default function HeroSec() {
  return (
    <div className="hero--section d-flex">
      <Container id="about">
        <Row>
          <Col md={6}>
            <div id="hero--text">
              <p className="brand-yellow">Software Engineer </p>
              <h1>Hello, my name is Mostafa Rawash</h1>
              <p className="subheadline">
                Full stack developer with a passion for creating scalable,
                secure, and maintainable web applications, Skilled in frameworks
                technologies such as Frappe and MEVN, front-end technologies
                such as HTML, CSS, JavaScript, Jinja, and Vue.JS, back-end
                technologies such as Flask, Node.js, Express and databases
                including MySQL and MongoDB. Experience with RESTful APIs.{" "}
              </p>
              <Button className="mx-2" variant="warning">
                {" "}
                <a
                  href={CV} // Replace this path with the actual path to your CV file
                  className="cta-button"
                  download
                >
                  {" "}
                  Download C.V
                </a>
              </Button>
              <Button className="mx-2" variant="light">
                LinkedIn
              </Button>
            </div>
          </Col>
          <Col className=" d-flex justify-content-end">
            <img src={bannerImage} alt="" className="h-100 m-auto" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
