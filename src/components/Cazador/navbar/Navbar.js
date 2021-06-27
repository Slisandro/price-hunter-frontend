import React from "react";
import {useDispatch} from 'react-redux';
import "./Navbar.css";
import {cerrarSesion} from '../../Redux/actions'

const Navbar = (props) => {
  const dispatch = useDispatch();
  return (
    <nav className="navbar" id="navbarUser">
      <button onClick={() => props.setState("Configuracion")} className="buttonCerrarSesion">
        Mi cuenta
      </button>
      <button className="buttonCerrarSesion" onClick={() => dispatch(cerrarSesion())}>
        Cerrar Sesión 
      </button>
    </nav>
  );
};

export default Navbar;
