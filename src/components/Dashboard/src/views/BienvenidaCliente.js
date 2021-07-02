import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import Bienvenida from '../../../TableroCliente/Componentes/Bienvenida/Bienvenida';

const BienvenidaCliente = () => {
  return (
    <>
    <div className="content">
      <Row>
      
        <Col lg="12">
        <Bienvenida/>
        </Col>
    
      </Row>
    </div>
  </>
   
  );
};

export default BienvenidaCliente