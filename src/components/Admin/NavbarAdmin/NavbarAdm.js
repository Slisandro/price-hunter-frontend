import React from "react";
import "./NavbarAdm.css";
import user from "../../../assets/user (1).png";
import { Link } from "react-router-dom";
// import notificacion from "../../assets/";

const NavbarAdm = (props) => {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => props.openSidebar()}>
        <i className="fas fa-bars"></i>
      </div>
      <div className="panelADM">Panel de Administrador</div>
      <div className="divADM">
        <button className="account-title2">Modificar Mis Datos</button>
        {/* <button className="btnNav">Modificar Productos</button>
        <button className="btnNav">Modificar Desafíos</button> */}
      </div>
      <div className="navbar__right">
        <Link to="/configuración">
          <img className="icon-user" width={22} src={user} alt="user" />
        </Link>
      </div>
    </nav>
  );
};

export default NavbarAdm;
