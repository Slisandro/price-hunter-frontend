import React, {useState, useEffect} from 'react';
import "./formciudades.css";
import axios from "axios";
import Select from 'react-select';
import {URL} from '../../../Redux/actions'




function FormCiudades({handleChangeCiudades, stateCiudades, handleEliminarCiudad, errores, seterrorState}) {
  const [state2, setState2] = useState([])
  const [nuevaCiudad, setNuevaCiudad] = useState({ id:"", ciudad:"", cantidaddeprecios:"", puntosaganar:"" });
  
  //----------------Request para traer la Lista de ciudades--------------------//
  //----------------------------------------------------------------------------//
  useEffect(async()=>{
    //---axios para las ciudades---//
    const token = localStorage.getItem("token");
    const pais_ciudad =  await axios.get(`${URL}listarciudades`, { headers: { "Authorization": `Bearer ${token}` } });
    setState2(pais_ciudad.data);

  },[]);
  
  const ciudades = [];
  state2.forEach((pais)=>{
    pais.ciudads.forEach((ciudad)=>{
      ciudades.push({
        value: ciudad.id,
        label: ciudad.ciudad + " / " + pais.nombre_pais
      })
    })
  })
  //----------------------------------------------------------------------------//
  //----------------------------------------------------------------------------//

  function handleChange(e){
    const name = e.target.name;
    setNuevaCiudad({
      ...nuevaCiudad,
      [name]: e.target.value
    })

    //----control errores----//
    if(!e.target.value){
      seterrorState({
        ...errores,
        [name]: "Campo obligatorio"
      })
    }else{
      seterrorState({
        ...errores,
        [name]: ""
      })
    }
  }
 
  function handleChangeCiudad(e){
    setNuevaCiudad({
      ...nuevaCiudad,
      ciudad: e.label,
      id: e.value
    })
  }

  function handleSubmit(e){
    e.preventDefault();
    handleChangeCiudades(nuevaCiudad)

    //seteamos los valores del nuevaCiudad//
    setNuevaCiudad({
      ...nuevaCiudad,
      id: "",
      ciudad:"",
      cantidaddeprecios: "",
      puntosaganar: "",
    })
  }


  
  return (
    <div id="form-cliente-crear-desafio-ciudades" id="hola" >
    <form  id="form-cliente-crear-desafio-ciudades" onSubmit={(e)=>{handleSubmit(e)}} >
        <div>

          <div>
            <p className="stylos-titulos" >Seleccionar Ciudad/es</p>
            <Select options={ciudades} onChange={(e)=>{handleChangeCiudad(e)}} />
            {errores.ciudades ? <p className="estylo-errores" > {errores.ciudades} </p> : <p className="estylo-errores" className="titulos-no-olvidar" >No olvidar seleccionar Ciudad/es</p> }
          </div>

          <div  id="inputs-bttn-ciudades" >
            <div>
              {errores.cantidaddeprecios ? <p className="estylo-errores" > {errores.cantidaddeprecios} </p> : <p className="stylos-titulos" >Cant.Precios a C amputar</p> }
              <input value={nuevaCiudad.cantidaddeprecios} type="number" min="1" step="1" name="cantidaddeprecios" onChange={(e)=>{handleChange(e)}} />
              
            </div>
            <div>
              {errores.puntosaganar ? <p className="estylo-errores" > {errores.puntosaganar} </p> : <p className="stylos-titulos" >Cant.Puntos a Ganar</p> }
              <input value={nuevaCiudad.puntosaganar} type="number" min="1" step="1" name="puntosaganar" onChange={(e)=>{handleChange(e)}} />
            </div>

            <button 
            disabled={
              (!nuevaCiudad.id || !nuevaCiudad.ciudad || !nuevaCiudad.puntosaganar || !nuevaCiudad.cantidaddeprecios )
              ? true
              : false
            } 
            type="submit" 
            >Agregar</button>

          </div>

        </div>
    </form>

    <div id="div-form-cliente-ciudades" >
      {
        stateCiudades ? stateCiudades.map((ciudadd)=>{
          return <div className="lista-ciudades-agregadas" > 
                    <p>Ciudad:{ciudadd.ciudad}</p>   
                    <p>Cant.Precios:{ciudadd.cantidaddeprecios}</p>
                    <p>Cant.Puntos:{ciudadd.puntosaganar}</p> 
                    <button value={ciudadd.id} onClick={(e)=>{handleEliminarCiudad(e)}} >X</button>
                  </div>
        }) : <p>SELECCIONE CIUDAD/ES.</p>
      }
    </div>
    </div>
    
  );
}


export default FormCiudades;