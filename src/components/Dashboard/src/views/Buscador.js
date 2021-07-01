import React from 'react';
import NavBarMain from '../../../navBarMain/NavBarMain';
import {

    Card,
   
    Row,
    Col,
  
  } from "reactstrap";


const Buscador = () => {
    return ( 
        <>
        <div className="content">
          <Row>
          <Card>
            <Col lg="12">
              <NavBarMain />
            </Col>
           </Card>
          </Row>
        </div>
      </>




     );
}
 
export default Buscador;