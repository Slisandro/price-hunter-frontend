import React, {useState} from 'react';
import "./header.css"
import { cerrarSesion} from '../../../Redux/actions';
import { useDispatch } from 'react-redux';


function Header() {

  const name = localStorage.getItem("nombre")

  const dispatch = useDispatch();

  return (
    <div id="header-tablero-cliente">
        <div id="div-name-cerrarsesion" > 
          <p> Bienvenido: {name} </p>
          <button className="account-title" onClick={ () => dispatch(cerrarSesion())} >Cerrar Sesion</button>
        </div>
    </div>

  
  );
}

export default Header;