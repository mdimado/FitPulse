import React,{useEffect} from "react";
import './footer.css'
import logo from "../../assets/images/eco-logo.png"
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import {Link} from "react-router-dom";

const Footer = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
  })
  
  const year = new Date().getFullYear()
  return <footer className="footer">
    
  
    <Container>
      <Row>
        
        <Col className="text-center social" lg='12'>
        <p className="socialp">
          <a href="https://www.instagram.com/aandm_fashion_retailor/?hl=en" target="_blank" rel="noopener noreferrer">
            <i className="ri-instagram-line"></i>
          </a>
          <a href="https://www.instagram.com/aandm_fashion_retailor/?hl=en" target="_blank" rel="noopener noreferrer">
            <i className="ri-facebook-circle-fill"></i>
          </a>
          <a href="https://www.instagram.com/aandm_fashion_retailor/?hl=en" target="_blank" rel="noopener noreferrer">
          <i class="ri-pinterest-fill"></i>
          </a>
          <a href="https://wa.me/9346401198?text=I%20am%20interested%20in%20shopping%20with%20a%26m%20fashion" target="_blank" rel="noopener noreferrer">
          <i class="ri-whatsapp-line"></i>
          </a>
        </p>
        </Col>





        <Col lg='12'>
          <p className="footer__copyright">FitPulse <i class="ri-copyright-line"></i> 2022- {year}. All rights reserved. </p>
          
        </Col>
      </Row>
    </Container>
  </footer>
};

export default Footer;