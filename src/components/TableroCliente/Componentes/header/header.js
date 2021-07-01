import React, {useState} from 'react';
import "./header.css"
import { cerrarSesion} from '../../../Redux/actions';
import { useDispatch } from 'react-redux';
import { NavLink , BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";



function Header() {
  var URLactual = window.location;
  const name = localStorage.getItem("nombre")

  const dispatch = useDispatch();

  return (
    <div id="header-tablero-cliente">
        
        <div id="div-name-cerrarsesion" > 
          <p> Bienvenido: {name} </p>
          
          {URLactual.pathname !== '/tablerocliente/principal' ?
          <NavLink to="/tablerocliente/principal" >
           <button className="account-title"> {'< Tablero Cliente'} </button>
        </NavLink>
          :null}
          <button className="account-title" onClick={ () => dispatch(cerrarSesion())} >Cerrar Sesion</button>
        </div>

    </div>

  
  );
}

export default Header;