import React from 'react';

import MisDesafios from '../../../Cazador/MisDesafios/MisDesafios';


import {
    Card,
    Row,
    Col,
  
  } from "reactstrap";


const DesafiosCazador = () => {
    return ( 
        <>
        <div className="content">
          <Row>
          <Card>
            <Col lg="12">
            <MisDesafios/>
      
            </Col>
           </Card>
          </Row>
        </div>
      </>




     );
}
 
export default DesafiosCazador;