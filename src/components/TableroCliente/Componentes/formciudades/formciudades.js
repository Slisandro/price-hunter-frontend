import React, { useState, useEffect } from 'react';
import "./formciudades.css";
import axios from "axios";
import Select from 'react-select';
import { URL } from '../../../Redux/actions'
import { Card, CardHeader, CardBody, CardTitle, CardText, Input, Col, Row, Form, FormGroup, Button, Modal, Alert } from 'reactstrap';
import close from "./icons8-cerrar-ventana-30.png";



function FormCiudades({ handleChangeCiudades, stateCiudades, handleEliminarCiudad, errores, seterrorState }) {
  const [state2, setState2] = useState([])
  const [nuevaCiudad, setNuevaCiudad] = useState({ id: "", ciudad: "", cantidaddeprecios: "", puntosaganar: "" });

  //----------------Request para traer la Lista de ciudades--------------------//
  //----------------------------------------------------------------------------//
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    //---axios para las ciudades---//
    const token = localStorage.getItem("token");
    const pais_ciudad = await axios.get(`${URL}listarciudades`, { headers: { "Authorization": `Bearer ${token}` } });
    setState2(pais_ciudad.data);

  }, []);

  const ciudades = [];
  state2.forEach((pais) => {
    pais.ciudads.forEach((ciudad) => {
      ciudades.push({
        value: ciudad.id,
        label: ciudad.ciudad + " / " + pais.nombre_pais
      })
    })
  })
  //----------------------------------------------------------------------------//
  //----------------------------------------------------------------------------//

  function handleChange(e) {
    const name = e.target.name;
    setNuevaCiudad({
      ...nuevaCiudad,
      [name]: e.target.value
    })

    //----control errores----//
    if (!e.target.value) {
      seterrorState({
        ...errores,
        [name]: "Campo obligatorio"
      })
    } else {
      seterrorState({
        ...errores,
        [name]: ""
      })
    }
  }

  function handleChangeCiudad(e) {
    setNuevaCiudad({
      ...nuevaCiudad,
      ciudad: e.label,
      id: e.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleChangeCiudades(nuevaCiudad)

    //seteamos los valores del nuevaCiudad//
    setNuevaCiudad({
      ...nuevaCiudad,
      id: "",
      ciudad: "",
      cantidaddeprecios: "",
      puntosaganar: "",
    })
  }



  return (

    // <div >
    <Row>
      <Col lg={12}>
        <Card className="card-chart" style={{ marginTop: "1rem" }}>
          <CardHeader>
            <h3 style={{ color: "rgba(96, 214, 0, 0.959)" }}>Ciudades</h3>
          </CardHeader>
          <Col id="form-cliente-crear-desafio-ciudades" >
            <Form id="form-cliente-crear-desafio-ciudades" onSubmit={(e) => { handleSubmit(e) }} >
              <div>

                <Col sm={12} id="productos-bttn" style={{ padding: "0", marginTop: "2rem", marginBottom: "1rem" }}>
                  <Row>
                    <h6 className="title" >Seleccionar Ciudad/es</h6>
                  </Row>
                  <Select options={ciudades} onChange={(e) => { handleChangeCiudad(e) }} />
                  {errores.ciudades ? <p className="err" > {errores.ciudades} </p> : null }
                  {/* // <p className="err" className="err" >No olvidar seleccionar Ciudad/es</p>} */}
                </Col>



                <div>

                  <Col sm={12}>
                    <Row style={{ marginTop: "2rem" }}>
                      <Row md={12}>
                        <h6 className="title" >Cantidad de Precios a Computar</h6>
                      </Row>
                      <Input value={nuevaCiudad.cantidaddeprecios}
                        type="number"
                        min="1"
                        step="1"
                        name="cantidaddeprecios"
                        onChange={(e) => { handleChange(e) }} />
                      {errores.cantidaddeprecios ? <p className="err" > {errores.cantidaddeprecios} </p> : null}
                    </Row>
                  </Col>

                  <div style={{ marginTop: "2rem" }}>
                    <Row md={12}>
                      <h6 className="title" >Cantid de Puntos a Ganar</h6>
                    </Row>
                    <Input value={nuevaCiudad.puntosaganar}
                      type="number"
                      min="1"
                      step="1"
                      name="puntosaganar"
                      onChange={(e) => { handleChange(e) }} />
                    {errores.puntosaganar ? <p className="err" > {errores.puntosaganar} </p> : null}
                  </div>

                  <Button
                    disabled={
                      (!nuevaCiudad.id || !nuevaCiudad.ciudad || !nuevaCiudad.puntosaganar || !nuevaCiudad.cantidaddeprecios)
                        ? true
                        : false
                    }
                    type="submit"
                    className="btn-fill"
                    size="lg"
                    block
                  >Agregar</Button>

                </div>
              </div>
            </Form>
          </Col>
      

          <div id="div-form-cliente-ciudades" >
            <Row>
            {
              stateCiudades ? stateCiudades.map((ciudadd) => {
                return <Card style={{ maxWidth: "50%" }}>
                <Alert color="success" style={{height: "10vh"}}>
                  <Row>
                    {/* <Col lg="12"> */}
                      
                        <h6 style={{ justifyContent: "center", width: "100%", marginBottom: "1rem" }}>Ciudad: {ciudadd.ciudad} </h6>
                        <Col>
                        <h6>Cant. de Precios: {ciudadd.cantidaddeprecios} </h6>
                        </Col>
                        <Col>
                        <h6>Cant. de Puntos: {ciudadd.puntosaganar}</h6>
                        </Col>
                        <Row>
                          <button style={{backgroundColor: "transparent", border: "none"}} block type="submit" value={ciudadd.id} onClick={(e) => { handleEliminarCiudad(e) }}><img src={close} alt=""/></button>
                        </Row>
                    
                    {/* </Col> */}
                  </Row>
                  </Alert>
                </Card>
              }) : <h6>SELECCIONE CIUDAD/ES.</h6>
            }
            </Row>
          </div>

        </Card>
      </Col>
    </Row>
    // </div>
  );
}


export default FormCiudades;