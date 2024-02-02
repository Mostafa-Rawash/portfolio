import Container from "react-bootstrap/Container";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React from "react";

import bannerImage from "../assets/image.png";

export default function HeroSec() {
  return (
    <div className="hero--section d-flex">
      <Container id="about" fluid>
        <Row>
          <Col  md={6}>
            <div id="hero--text">
              <p className="brand-yellow">UI/UX Designer</p>
              <h1>Hello, my name is Madelyn Torff</h1>
              <p className="subheadline">
                Short text with details about you, what you do or your
                professional career. You can add more information on the about
                page.
              </p>
              <Button className="mx-2" variant="warning">
                {" "}
                Projects
              </Button>
              <Button className="mx-2" variant="light">
                LinkedIn
              </Button>
            </div>
          </Col>
          <Col className=" d-flex justify-content-end">
            <img src={bannerImage} alt="" className="w-100" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
