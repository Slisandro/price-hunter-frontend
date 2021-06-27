import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  FormText,
} from "reactstrap";
import PutUM from "../../../Admin/FormPuts/PutUM/PutUM";
import PutTipoTrans from "../../../Admin/FormPuts/PutTipoTrans/PutTipoTrans";
import PutTiposUsuarios from "../../../Admin/FormPuts/PutTiposUsuarios/PutTiposUsuarios";
import PutFamilias from "../../../Admin/FormPuts/PutFamilias/PutFamilias";
import PutCategorias from "../../../Admin/FormPuts/PutCategorias/PutCategorias";
import PutProductos from "../../../Admin/FormPuts/PutProductos/PutProductos";
import PutSubCate from "../../../Admin/FormPuts/PutSubCategoria/PutSubCate";
import PutPaises from "../../../Admin/FormPuts/PutPaises/PutPaises";
import PutRegiones from "../../../Admin/FormPuts/PutRegiones/PutRegiones";
import PutMonedas from "../../../Admin/FormPuts/PutMonedas/PutMonedas";
import PutCiudades from "../../../Admin/FormPuts/PutCiudades/PutCiudades";

function ModificarForms() {
  return (
    <>
      <div className="content">
        <Row>
          <Col lg="4">
            <PutUM />
          </Col>
          <Col lg="4">
            <PutTipoTrans />
          </Col>
          <Col lg="4">
            <PutTiposUsuarios />
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <PutFamilias />
            <PutCategorias />
          </Col>
          <Col lg="4">
            <PutSubCate />
          </Col>
          <Col lg="4">
            <PutProductos />
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <PutRegiones />
          </Col>
          <Col lg="4">
            <PutPaises />
          </Col>
          <Col lg="4">
            <PutMonedas />
          </Col>
        </Row>
        <Row>
          <Col>
            <PutCiudades />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ModificarForms;
