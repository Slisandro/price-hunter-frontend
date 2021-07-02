import React, { useState, useEffect } from 'react';
// import "./creardesafio.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from 'react-select';
import { product } from 'prelude-ls';
import FormCiudades from "../formciudades/formciudades";
import FormCrearProducto from "../formcrearproducto/formcrearproducto";

// import "bootstrap/dist/css/bootstrap.css"
import { URL } from "../../../Redux/actions"

import { Card, CardHeader, CardBody, CardTitle, CardText, Input, Col, Row, Form, FormGroup, Button, Modal } from 'reactstrap';




//-----funcion para limitar las fechas min en el form-------//
//----------------------------------------------------------//
function chequeofecha(val) {
  let str = val.toString()
  if (str.length < 2) {
    return str = "0" + str;
  }
  return str
}

const año_min = new Date().getFullYear();
const mes_min = new Date().getMonth() + 1;
const dia_min = new Date().getDate();
const fecha_min = año_min.toString() + "-" + chequeofecha(mes_min) + "-" + chequeofecha(dia_min);
//----------------------------------------------------------//
//----------------------------------------------------------//




function CrearDesafio() {
  //-------estados locales---------//
  const [state, setState] = useState({
    nombre: "",
    descripcion: "",
    fechainicial: "",
    fechafinal: "",
    id_producto: "",
    ciudades: [],
    img: "https://www.latinflores.com/imagenes/productos/CANAVI004_L.jpg"
  });
  const [errorState, seterrorState] = useState({
    nombre: "",
    descripcion: "",
    fechainicial: "No olvidar fecha inicio.",
    fechafinal: "No olvidar fecha fin.",
    producto: "No olvidar seleccionar Producto",
    ciudades: "",
    cantidaddeprecios: "",
    puntosaganar: ""
  })

  const [productosState, setProductosState] = useState([]);
  const [mensajeState, setMensajeState] = useState("");
  //----estado para abrir y cerrar el modal---//
  const [stateModal, setStateModal] = useState({ abierto: false });
  const [stateMensaje, setStateMensaje] = useState("");
  const [stateBoolean, setStateBoolean] = useState(true)
  //-------------------------------//


  //-----Estilos <Button/>-------//
  const styles_buttn = {
    width: "30%",
    height: "3rem",
    padding: "0",
    margin: "0",

  }
  //-----------------------------//

  //----------------Request para traer la Lista de Productos--------------------//
  //----------------------------------------------------------------------------//
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {

    const token = localStorage.getItem("token");
    const prod = await axios.get(`${URL}listarproductos`, { headers: { "Authorization": `Bearer ${token}` } });
    setProductosState(prod.data);

  }, [stateBoolean]);

  const productos = [];

  (function listarproductos() {
    productosState.forEach((producto) => {
      productos.push({
        value: producto.id,
        label: producto.nombre + " " + producto.contenido_neto + producto.unidadMedidaCodigoUnidadMedida,
      })
    })

  })();
  //----------------------------------------------------------------------------//
  //----------------------------------------------------------------------------//

  function handleChangeNombre(e) {
    const name = e.target.name;
    setState({
      ...state,
      [name]: e.target.value
    })
    if (e.target.value.length < 3) {
      seterrorState({
        ...errorState,
        [name]: "Campo Obligatorio. +3 caracteres"
      })
    } else {
      seterrorState({
        ...errorState,
        [name]: ""
      })
    }

  }

  function handleChangeProducto(e) {
    setState({
      ...state,
      id_producto: e.value
    })
    if (!e.value) {
      seterrorState({
        ...errorState,
        producto: "Seleccionar Producto."
      })
    } else {
      seterrorState({
        ...errorState,
        producto: ""
      })
    }
  }
  console.log(errorState)

  //-------FUNCIONES CALLBACK PARA FORM_CIUDADES------//
  //--------------------------------------------------//
  //------funcion chequeo array ciudades/error--------//
  function errorCiudades() {
    if (!state.ciudades) {
      seterrorState({
        ...errorState,
        ciudades: "Seleccionar Ciudad/es."
      })
    } else {
      seterrorState({
        ...errorState,
        ciudades: ""
      })
    }
  }

  //-----funcion callback para concatenar state.ciudades----//
  function handleChangeCiudades(obj_ciudad) {
    const ciudad_encontrada = state.ciudades.find((ciudad) => { return ciudad.id === obj_ciudad.id })
    if (!ciudad_encontrada) {
      setState({
        ...state,
        ciudades: state.ciudades.concat([obj_ciudad])
      })
    }

    errorCiudades();
  }
  //----funcion callback para eliminar una ciudad de la lista----//
  function handleEliminarCiudad(e) {
    setState({
      ...state,
      ciudades: state.ciudades.filter((ciudad) => ciudad.id !== parseInt(e.target.value))
    })
    //---error: controlo state.ciudades----//
    if (state.ciudades.length - 1 === 0) {
      seterrorState({
        ...errorState,
        ciudades: "Seleccionar Ciudad/es."
      })
    }
  }
  //--------------------------------------------------//
  //--------------------------------------------------//

  //-------FUNCIONES CALLBACK PARA FORM_CREAR_PRODUCTO------//
  //--------------------------------------------------//
  function abrirModal() {
    setStateModal({ abierto: !stateModal.abierto })
    setStateMensaje("")
  }
  //--------------------------------------------------//
  //--------------------------------------------------//

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const respuesta_creardesafio = await axios.post(`${URL}creardesafio`, state, { headers: { "Authorization": `Bearer ${token}` } })
    setMensajeState(respuesta_creardesafio.data.msg)
  }





  return (
    <>
      <Row>
        <Col lg={6}>
          <Card className="card-chart" style={{ marginTop: "1rem" }}>
            <CardHeader>
              <h3 style={{ color: "rgba(96, 214, 0, 0.959)" }}>Desafíos</h3>
            </CardHeader>
            <CardBody>
              <div id="div-superior-terneario" >
                {
                  mensajeState ?
                    <div id="div-bttn-y-mensaje-ternario" >
                      <Link to="/tablerocliente/principal" > <Button className="btn-fill">Volver al Panel</Button> </Link>
                      <div id="div-mensaje-de-respuesta-creardesafio" > <h6>{mensajeState}</h6> </div>
                    </div>

                    :

                    <div>
                      <Form onSubmit={(e) => { handleSubmit(e) }} >
                        <FormGroup Row>
                          <Col sm={12}  >
                            <Row >
                              {errorState.nombre ? <h6 className="err" > Desafío: {errorState.nombre} </h6> : <h6 className="stylos-titulos" >Nombre Desafío</h6>}
                            </Row>
                            <Input
                            
                              className="inp"
                              type="text"
                              placeholder="Nombre del Desafío"
                              name="nombre"
                              value={state.nombre}
                              onChange={(e) => { handleChangeNombre(e) }}
                            />

                            <div style={{ marginTop: "2rem" }}>
                              <Row >
                                {errorState.descripcion ? <p className="err" > {errorState.descripcion} </p> : <h6 className="stylos-titulos" >Descripción Desafío</h6>}
                              </Row>
                              <Input
                                type="textarea"
                                className="input-nombre-descripcion"
                                placeholder="Descripción del Desafío."
                                name="descripcion"
                                onChange={(e) => { handleChangeNombre(e) }}
                              />
                            </div>

                            <div style={{ marginTop: "2rem" }}>
                              <Col sm={12} id="fechas-desafio" style={{ padding: "0" }}>

                                <Row sm={2}>
                                  <h6 className="stylos-titulos" >Fecha Inicio Desafío</h6>
                                </Row>

                                <Input
                                  type="date"
                                  min={fecha_min}
                                  name="fechainicial"
                                  onChange={(e) => { handleChangeNombre(e) }}
                                />
                                {errorState.fechainicial && <p className="err" className="err" > {errorState.fechainicial} </p>}

                                <div style={{ marginTop: "2rem" }} >
                                  <Row sm={2}>
                                    <h6 className="stylos-titulos" >Fecha Fin Desafío</h6>
                                  </Row>

                                  <Input
                                    type="date"
                                    min={fecha_min}
                                    name="fechafinal"
                                    onChange={(e) => { handleChangeNombre(e) }}
                                  />
                                  {errorState.fechafinal && <p className="err" className="err"> {errorState.fechafinal} </p>}
                                </div>
                              </Col>
                            </div>

                            <Col id="productos-bttn" style={{ padding: "0", marginTop: "2rem" }} >
                              <Row id="div-producto" >
                                <h6 className="stylos-titulos" >Producto</h6>
                              </Row>
                              <Select options={productos} id="select-productos" onChange={(e) => { handleChangeProducto(e) }} />

                              {errorState.producto && <p className="err" className="err" > {errorState.producto} </p>}

                              <Button onClick={() => { abrirModal() }} size="lg" block >Agregar Producto</Button>
                            </Col>

                            <Button
                              type="submit"
                              className="btn-fill"
                              disabled={(state.nombre && state.descripcion && !errorState.nombre && !errorState.descripcion && !errorState.fechainicial && !errorState.fechafinal && !errorState.producto && state.ciudades.length > 0 && state.img)
                                ? false : true}
                              size="lg" block
                              onClick={(e) => e.preventDefault()}
                            >CREAR DESAFIO</Button>
                            <Col>
                            </Col>

                          </Col>
                        </FormGroup>
                      </Form>

                    </div>

                }
              </div>
            </CardBody>
          </Card>

        </Col>

        <Col lg={6}>
          <Row sm={12}>
            <Card>
             
                <FormCiudades errores={errorState} seterrorState={seterrorState} handleEliminarCiudad={handleEliminarCiudad} handleChangeCiudades={handleChangeCiudades} stateCiudades={state.ciudades} />
                <FormCrearProducto abierto={stateModal.abierto} abrirModal={abrirModal} stateMensaje={stateMensaje} setStateMensaje={setStateMensaje} stateBoolean={stateBoolean} setStateBoolean={setStateBoolean} />
             
            </Card>
          </Row>
        </Col>

      </Row>


    </>
  );
}


export default CrearDesafio;



// const [errorState, seterrorState] = useState({
//   nombre:"",
//   descripcion:"",
//   fechainicial:"No olvidar fecha inicio.",
//   fechafinal:"No olvidar fecha fin.",
//   producto:"No olvidar seleccionar Producto",
//   ciudades:"",
//   cantidaddeprecios:"",
//   puntosaganar:""
// })