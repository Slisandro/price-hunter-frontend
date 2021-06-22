import React, { useState, useEffect } from 'react';
import "./creardesafio.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from 'react-select';
import { product } from 'prelude-ls';
import FormCiudades from "../formciudades/formciudades";
import FormCrearProducto from "../formcrearproducto/formcrearproducto";
import { Button, Modal } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css"
import {URL} from "../../../Redux/actions"




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
    nombre:"",
    descripcion:"",
    fechainicial:"No olvidar fecha inicio.",
    fechafinal:"No olvidar fecha fin.",
    producto:"No olvidar seleccionar Producto"
  })

  const [productosState, setProductosState] = useState([]);
  const [mensajeState, setMensajeState] = useState("");
  //----estado para abrir y cerrar el modal---//
  const [stateModal, setStateModal] = useState({ abierto: false });
  const [stateMensaje, setStateMensaje] = useState("");
  const [stateBoolean, setStateBoolean] = useState(true)
  //-------------------------------//


  //----------------Request para traer la Lista de Productos--------------------//
  //----------------------------------------------------------------------------//
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {

    const token = localStorage.getItem("token");
    const prod = await axios.get(`${URL}listarproductos`, { headers: { "Authorization": `Bearer ${token}` } });
    setProductosState(prod.data);

  }, [stateBoolean]);

  const productos = [];

  (function listarproductos(){
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
    if(e.target.value.length<3){
      seterrorState({
        ...errorState,
        [name]: "Campo Obligatorio."
      })
    }else{
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
    if(!e.value){
      seterrorState({
        ...errorState,
        producto: "Seleccionar Producto."
      })
    }else{
      seterrorState({
        ...errorState,
        producto: ""
      })
    }
  }
  console.log(errorState)

  //-------FUNCIONES CALLBACK PARA FORM_CIUDADES------//
  //--------------------------------------------------//
  //-----funcion callback para concatenar state.ciudades----//
  function handleChangeCiudades(obj_ciudad) {
    const ciudad_encontrada = state.ciudades.find((ciudad) => { return ciudad.id === obj_ciudad.id })
    if (!ciudad_encontrada) {
      setState({
        ...state,
        ciudades: state.ciudades.concat([obj_ciudad])
      })
    }
  }
  //----funcion callback para eliminar una ciudad de la lista----//
  function handleEliminarCiudad(e) {
    setState({
      ...state,
      ciudades: state.ciudades.filter((ciudad) => ciudad.id !== parseInt(e.target.value))
    })
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
    <div id="div-superior-terneario" >
      {
        mensajeState ?
          <div id="div-bttn-y-mensaje-ternario" >
            <Link to="/tablerocliente/principal" > <button>Volver al Panel</button> </Link>
            <div id="div-mensaje-de-respuesta-creardesafio" > <p>{mensajeState}</p> </div>
          </div>

          :

          <div id="conteiner-cliente-crear-desafio" >
            
            <form id="form-cliente-crear-desafio" onSubmit={(e) => { handleSubmit(e) }} >

              <div className="form-cliente-crear-desafio-div" >

                <input type="text" placeholder="Nombre del Desafío" name="nombre" value={state.nombre} onChange={(e) => { handleChangeNombre(e) }} />
                {errorState.nombre && <p className="estylo-errores" > {errorState.nombre} </p> }

                <textarea placeholder="Descripción del Desafío." name="descripcion" onChange={(e) => { handleChangeNombre(e) }} />
                {errorState.descripcion && <p className="estylo-errores" > {errorState.descripcion} </p> }

                <div id="fechas-desafio" >
                  <div>
                    <input type="date" min={fecha_min} name="fechainicial" onChange={(e) => { handleChangeNombre(e) }} />
                    {errorState.fechainicial && <p className="estylo-errores" > {errorState.fechainicial} </p> }
                  </div>
                  <div>
                    <input type="date" min={fecha_min} name="fechafinal" onChange={(e) => { handleChangeNombre(e) }} />
                    {errorState.fechafinal && <p className="estylo-errores" > {errorState.fechafinal} </p> }
                  </div>
                </div>

                <div id="productos-bttn" >
                  <div id="div-producto" >
                    <Select options={productos} id="select-productos" onChange={(e) => { handleChangeProducto(e) }} />
                    {errorState.producto && <p className="estylo-errores" > {errorState.producto} </p> }
                  </div>
                  <Button onClick={() => { abrirModal() }} >Producto Nuevo</Button>
                </div>

                <button
                  type="submit"
                  disabled={(state.nombre && state.descripcion && state.fechainicial && state.fechafinal && state.id_producto && state.ciudades.length > 0 && state.img)
                    ? false : true}
                >CREAR DESAFIO</button>

              </div>

            </form>
            <FormCiudades handleEliminarCiudad={handleEliminarCiudad} handleChangeCiudades={handleChangeCiudades} stateCiudades={state.ciudades} />
            <FormCrearProducto abierto={stateModal.abierto} abrirModal={abrirModal} stateMensaje={stateMensaje} setStateMensaje={setStateMensaje} stateBoolean={stateBoolean} setStateBoolean={setStateBoolean} />
          </div>

      }
    </div>

  );
}


export default CrearDesafio;