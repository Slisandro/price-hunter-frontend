import React from 'react';
import Monedero from '../../../Cazador/Monedero/Monedero';
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
              <Monedero />
            </Col>
           </Card>
          </Row>
        </div>
      </>




     );
}
 
export default DesafiosCazador;