import React, { useEffect } from 'react';
import { Button, Card, CardBody, UncontrolledPopover, PopoverHeader, PopoverBody, Row, Col } from 'reactstrap';
import Transacciones from '../Transacciones/Transacciones';
import MapUser from '../MapUser/MapUser';

import Grafico from "../../Cazador/Grafico/Grafico";
var geolocation = require('geolocation');

const Jumbo = () => {
  const [ubicacion, setUbicacion] = React.useState({
    longitud: "",
    latitud: ""
  })

  const nombre = localStorage.getItem("nombre");

  useEffect(() => {
    geolocation.getCurrentPosition((err, position) => {
      if (err) throw err
      return setUbicacion({
        // ...ubicacion,
        longitud: position.coords.longitude + "",
        latitud: position.coords.latitude + "",
      })
    })
  }, [])

  return (
    <>
      <Card>
        <CardBody>

          <h1 style={{ color: "rgba(96, 214, 0, 0.959)" }}>Bienvenido, {nombre}</h1>
          <h4>Que puedo hacer en mi panel de control?

          </h4>

          <div>
            <Button size="sm" className="btn" id="PopoverFocus" type="button" >
              Buscador
            </Button>
            {' '}
            <Button size="sm" className="btn" id="PopoverClick" type="button">
              Monedero
            </Button>
            {' '}
            <Button
              size="sm" id="PopoverLegacy" type="button">
              Desafios
            </Button>
            <UncontrolledPopover trigger="focus" placement="bottom" target="PopoverFocus">
              <PopoverHeader>Buscador</PopoverHeader>
              <PopoverBody>Aqui podrás buscar productos por nombre o por categorìa. No olvides que Price Hunter buscará productos en funcion de tu ubicación, por lo tanto deberás indicar el radio de busqueda.</PopoverBody>
            </UncontrolledPopover>
            <UncontrolledPopover trigger="click" placement="bottom" target="PopoverClick">
              <PopoverHeader>Monedero</PopoverHeader>
              <PopoverBody>aquí podrás administrar los puntos obtenidos en los distintos desafios</PopoverBody>
            </UncontrolledPopover>
            <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
              <PopoverHeader>Desafios vigentes</PopoverHeader>
              <PopoverBody>En esta seccion podrás consultar cuales son los desafios propuestos por las marcas en tu zona, como así tambien la fecha durante la cual estarán disponibles.</PopoverBody>
            </UncontrolledPopover>
          </div>

        </CardBody>
      </Card>




      <Card>
        <Row>

          <Col lg="6" md="12" sm="12">
            <Transacciones />
          </Col>
          <Col lg="6" >
            {
              !ubicacion.latitud && !ubicacion.longitud ?
                null : <MapUser ubicacion={ubicacion} />
            }
          </Col>
        </Row>

      </Card>


      

      <Card>
        <Row>

          <Col lg="12" >

          
          </Col>
          <Col lg="6" >
            <Grafico/>
          </Col>
        </Row>

      </Card>

    </>
  );
};

export default Jumbo;