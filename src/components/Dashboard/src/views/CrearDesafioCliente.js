import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import CrearDesafios from "../../../TableroCliente/Componentes/creardesafio/creardesafio";

const CrearDesafioCliente = () => {
  return (
    <>
      <div className="content">
       
          <Col lg="12">
            <CrearDesafios />
          </Col>
       
      </div>
    </>

  );
};

export default CrearDesafioCliente;


