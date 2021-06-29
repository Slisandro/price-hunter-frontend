import React from "react";
import "./NavbarAdm.css";
import { useDispatch, useSelector } from "react-redux";
import { cerrarSesion } from "../../Redux/actions";
import user from "../../../assets/user (1).png";
import { Link } from "react-router-dom";
// import notificacion from "../../assets/";

const NavbarAdm = (props) => {
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => props.openSidebar()}>
        <i className="fas fa-bars"></i>
      </div>
      <div className="panelADM">Panel de Administrador</div>
      <div className="divADM">
        {/* <button className="btnNav">Modificar Productos</button>
        <button className="btnNav">Modificar Desafíos</button> */}
        <button className="account-title5" onClick={() => props.setState("")}>
          Administrador
        </button>
        <button
          className="account-title5"
          value={"Configuracion"}
          onClick={() => props.setState("Configuracion")}
        >
          Configuración
        </button>
        <button
          className="account-title5"
          onClick={() => dispatch(cerrarSesion())}
        >
          Cerrar Sesión
        </button>
        {/* <div className="account-profile">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Not Found"
          />
        </div> */}
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
