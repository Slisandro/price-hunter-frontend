import React, {useState} from 'react';
import { NavLink } from "react-router-dom";
import "./main.css";
import objetivo from "../objetivo.png";
import estadistica from "../analitica.png";
import empresa from "../empresa.png";
import montaña from "../objetivo (1).png";


function Main() {

  
  return (
    <div id="container-main" >

      <div>
        <NavLink to="/tablerocliente/creardesafio" >
          <button> 
            <img src={objetivo} ></img>
            <p>Crear Desafío</p> 
          </button>
        </NavLink>
      </div> 

      <div>
        <NavLink to="/tablerocliente/misdesafios" >
          <button>
          <img src={montaña} ></img>
            <p>Mis Desafíos</p>
          </button>
        </NavLink>
      </div> 

      <div>
        <NavLink to="/tablerocliente/estadisticas" >
          <button>
          <img src={estadistica} ></img>
            <p>Estadísticas</p>
          </button>
        </NavLink>
      </div> 

      <div>
        <NavLink to="/tablerocliente/misdatos" >
          <button>
          <img src={empresa} ></img>
            <p>Mis Datos</p>
          </button>
        </NavLink>
      </div> 

    </div>

  
  );
}

export default Main;