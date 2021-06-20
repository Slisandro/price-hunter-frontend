import React, {useState, useEffect} from 'react';
import "./creardesafio.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from 'react-select';
import { product } from 'prelude-ls';
import FormCiudades from "../formciudades/formciudades";




//-----funcion para limitar las fechas min en el form-------//
//----------------------------------------------------------//
function chequeofecha(val){
  let str = val.toString()
  if(str.length<2){
    return str = "0"+str;
  }
  return str
}

const año_min = new Date().getFullYear();
const mes_min = new Date().getMonth() +1;
const dia_min = new Date().getDate();
const fecha_min = año_min.toString()+"-"+chequeofecha(mes_min)+"-"+chequeofecha(dia_min);
//----------------------------------------------------------//
//----------------------------------------------------------//




function CrearDesafio() {
  //-------estados locales---------//
  const [state, setState] = useState({ 
    nombre:"", 
    descripcion:"",
    fechainicial:"",
    fechafinal:"",
    id_producto: "",
    ciudades:[],
    img: "https://www.latinflores.com/imagenes/productos/CANAVI004_L.jpg"
  });
  const [productosState, setProductosState] = useState([]);
  const [mensajeState, setMensajeState] = useState("");
  //-------------------------------//


  //----------------Request para traer la Lista de Productos--------------------//
  //----------------------------------------------------------------------------//
  useEffect(async()=>{
    //---axios para los productos---//
    const prod =  await axios.get("http://localhost:3001/listarproductos");
    setProductosState(prod.data);

    //---axios para las ciudades y paises---//

  },[]);
  
  const productos = [];
  productosState.forEach((producto)=>{
    productos.push({
      value: producto.id,
      label: producto.nombre + " " + producto.contenido_neto + producto.unidadMedidaCodigoUnidadMedida ,
    })
  })
  //----------------------------------------------------------------------------//
  //----------------------------------------------------------------------------//

  function handleChangeNombre(e){
    const name = e.target.name;
    setState({
      ...state,
      [name]: e.target.value
    })
  }

  function handleChangeProducto(e){
    setState({
      ...state,
      id_producto: e.value
    })
  }

  //-------FUNCIONES CALLBAKC PARA FORM_CIUDADES------//
  //--------------------------------------------------//
  //-----funcion callback para pushear state.ciudades----//
  function handleChangeCiudades(obj_ciudad){
    // console.log(obj_ciudad)
    // console.log(state)
    setState({
      ...state,
      ciudades: state.ciudades.concat([obj_ciudad])
    })
  }
  //----funcion callback para eliminar una ciudad de la lista----//
  function handleEliminarCiudad(e){
    setState({
      ...state,
      ciudades: state.ciudades.filter((ciudad)=>ciudad.id!==parseInt(e.target.value))
    })
  }
  //--------------------------------------------------//
  //--------------------------------------------------//

  async function handleSubmit(e){
    e.preventDefault();
    const respuesta_creardesafio = await axios.post("http://localhost:3001/creardesafio", state) 
    setMensajeState(respuesta_creardesafio.data.msg)
  }

  console.log(mensajeState)
  
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
  
          <form id="form-cliente-crear-desafio" onSubmit={(e)=>{handleSubmit(e)}} > 
  
            <div className="form-cliente-crear-desafio-div" >
  
              <input type="text" placeholder="Nombre del Desafío" name="nombre" value={state.nombre} onChange={(e)=>{handleChangeNombre(e)}} />
              <textarea placeholder="Descripción del Desafío." name="descripcion" onChange={(e)=>{handleChangeNombre(e)}} />
  
              <div id="fechas-desafio" >
  
                <input type="date" min={fecha_min} name="fechainicial" onChange={(e)=>{handleChangeNombre(e)}} />
                <input type="date" min={fecha_min} name="fechafinal" onChange={(e)=>{handleChangeNombre(e)}} />
  
              </div>
  
              <div id="productos-bttn" >
                <Select options={productos} id="select-productos" onChange={(e)=>{handleChangeProducto(e)}} />
                {/* <button>Agregar producto nuevo</button> */}
              </div>
              
              <button 
                type="submit" 
                disabled={(state.nombre && state.descripcion && state.fechainicial && state.fechafinal && state.id_producto && state.ciudades.length>0 && state.img)
                  ? false : true}
              >CREAR DESAFIO</button>
  
            </div>
  
          </form>
          <FormCiudades handleEliminarCiudad={handleEliminarCiudad} handleChangeCiudades={handleChangeCiudades} stateCiudades={state.ciudades} />
      </div>


    }
    </div>

  );
}


export default CrearDesafio;