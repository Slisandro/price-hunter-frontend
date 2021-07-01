import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import Jumbo from '../../../Cazador/main/Jumbo';

const Jumbotron = () => {
  return (
    <>
    <div className="content">
      <Row>
      
        <Col lg="12">
        <Jumbo/>
        </Col>
    
      </Row>
    </div>
  </>
   
  );
};

export default Jumbotron;