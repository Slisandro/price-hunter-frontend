import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  FormText,
} from "reactstrap";

import FormAgregarProducto from "../../../Admin/Form/FormAgregarProducto/AgregarProducto";
import FormGenero from "../../../Admin/Form/FormGenero/FormGenero";
import FormMoneda from "../../../Admin/Form/FormMoneda/FormMoneda";
import FormTransaccion from "../../../Admin/Form/FormTipoTrans/FormTransaccion";
import FormUnidadMedida from "../../../Admin/Form/FormUm/FormUnidadMedida";
import FormUsuario from "../../../Admin/Form/FormUsuario/FormUsuario";
// import FormAgregarProducto from "../../../Admin/Form/FormAgregarProducto/AgregarProducto";

function FormAgregar() {
  return (
    <>
      <div className="content">
        <Row>
          <Col lg="4">
            <FormAgregarProducto />
          </Col>
          <Col lg="4">
            <FormMoneda />
          </Col>
          <Col lg="4">
            <FormUnidadMedida />
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <FormTransaccion />
          </Col>
          <Col lg="4">
            <FormUsuario />
          </Col>
          <Col lg="4">
            <FormGenero />
          </Col>
        </Row>
        <Row>
          <Col lg="4">{/* <PutRegiones /> */}</Col>
          <Col lg="4">{/* <PutPaises /> */}</Col>
          <Col lg="4">{/* <PutMonedas /> */}</Col>
        </Row>
        <Row>
          <Col>{/* <PutCiudades /> */}</Col>
        </Row>
      </div>
    </>
  );
}

export default FormAgregar;
