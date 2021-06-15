import React from "react";
import "./NavbarAdm.css";
import user from "../../../assets/user (1).png";
import { Link } from "react-router-dom";
// import notificacion from "../../assets/";

//----------------------------------------
//         PRUEBA PARA POST ADMIN

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {unidadDeMedida, pais, tipoUsuario, genero, monedas, ciudad, region, familia, categoria, subcategoria, tipoTransaccion, transaccion, clientes, desafio, productos, getFamilia, getCategoria  } from '../../../components/Redux/actions'
//----------------------------------------
 


const NavbarAdm = (props) => {
  //----------------------------------------
  //         PRUEBA PARA POST ADMIN

  const m= useSelector(x => x.obj)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategoria());
  }, [dispatch]);

  //-----------------------------------------
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => props.openSidebar()}>
        <i className="fas fa-bars"></i>
      </div>
      <div className="panelADM">Panel de Administrador</div>
      <div className="navbar__right">
        <Link to="/configuración">
          <img className="icon-user" width={22} src={user} alt="user" />
        </Link>
      </div>
    </nav>
  );
};

export default NavbarAdm;
