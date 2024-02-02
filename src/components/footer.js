import React from "react";

import socialLinks from "../assets/icons.png"
import { Container } from "react-bootstrap";
export default function Footer(){
    return(
        <Container id="contacts" className="footer--sec">
        <img src={socialLinks} alt="" />
        <p className="footer--desc">Madelyn Torff 2021 </p>
        </Container>
    )
}