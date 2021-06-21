import React, {useState, useEffect} from 'react';
import "./formciudades.css";
import axios from "axios";
import Select from 'react-select';
import token from "../../../token-cliente"




function FormCiudades({handleChangeCiudades, stateCiudades, handleEliminarCiudad}) {
  const [state2, setState2] = useState([])
  const [nuevaCiudad, setNuevaCiudad] = useState({ id:"", ciudad:"", cantidaddeprecios:"", puntosaganar:"" });
  
  //----------------Request para traer la Lista de ciudades--------------------//
  //----------------------------------------------------------------------------//
  useEffect(async()=>{
    //---axios para las ciudades---//
    const pais_ciudad =  await axios.get("http://localhost:3001/listarciudades", { headers: { "Authorization": `Bearer ${token}` } });
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
  }


  
  return (
    <div id="form-cliente-crear-desafio-ciudades" id="hola" >
    <form  id="form-cliente-crear-desafio-ciudades" onSubmit={(e)=>{handleSubmit(e)}} >
        <div>
          <Select options={ciudades} onChange={(e)=>{handleChangeCiudad(e)}} />
          <div  id="inputs-bttn-ciudades" >
            <div>
              <p>Cant.Precios a C amputar</p>
              <input type="number" min="1" step="1" name="cantidaddeprecios" onChange={(e)=>{handleChange(e)}} />
            </div>
            <div>
              <p>Cant.Puntos a Ganar</p>
              <input type="number" min="1" step="1" name="puntosaganar" onChange={(e)=>{handleChange(e)}} />
            </div>
            <button type="submit" >Agregar</button>
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