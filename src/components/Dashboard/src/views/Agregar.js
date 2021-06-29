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
import Regiones from "../../../Admin/Form/FormUbicacion/Regiones";
import Paises from "../../../Admin/Form/FormUbicacion/Paises";
import Ciudades from "../../../Admin/Form/FormUbicacion/Ciudades";
import Fami from "../../../Admin/Form/FormFamiliaYCategoria/Fami";
import Cate from "../../../Admin/Form/FormFamiliaYCategoria/Cate";
import Subcate from "../../../Admin/Form/FormFamiliaYCategoria/Subca";

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
          <Col lg="4">
            <Regiones />
          </Col>
          <Col lg="4">
            <Paises />
          </Col>
          <Col lg="4">
            <Ciudades />
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <Fami />
          </Col>
          <Col lg="4">
            <Cate />
          </Col>
          <Col lg="4">
            <Subcate />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default FormAgregar;
