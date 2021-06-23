import React from "react";
import "./Sidebar.css";
import aguila from "../../../assets/aguila.png";
import Panel from '../../../assets/panel-control.png';
import Desafios from '../../../assets/desafios.png';
import Monedero from '../../../assets/monedero.png';
import Configuracion from '../../../assets/configuracion.png';

const Sidebar = (props) => {
  return (
    <div className={props.sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img" id="containerLogoSideBarUser">
          <img className="imgSideBarUser" src={aguila} alt="logo" />
          <h1 className="titleSideBarUser">PH</h1>
        </div>
        <i
          className="far fa-window-close"
          id="sidebarIcon"
          onClick={() => props.closeSidebar()}
        ></i>
      </div>

      <div className="sidebar__menu" id="sidebarUser">
        <div className="sidebar__link sideBarUser" id={props.state === "Panel" ? "inputActiveSideBarUser" : null}>
          <img src={Panel} alt="icon-panel" />
          <button value={"Panel"} onClick={() => props.setState("Panel")}>Panel de control</button>
        </div>
        <div className="sidebar__link sideBarUser" id={props.state === "Desafios" ? "inputActiveSideBarUser" : null}>
          <img src={Desafios} alt="icon-desafios" />
          <button value={"Desafios"} onClick={() => props.setState("Desafios")}>Mis desafios</button>
        </div>

        <div className="sidebar__link sideBarUser" id={props.state === "Movimientos" ? "inputActiveSideBarUser" : null}>
          <img src={Monedero} alt="icon-monedero" />
          <button value={"Movimientos"} onClick={() => props.setState("Movimientos")}>Mis movimientos</button>
        </div>

        <div className="sidebar__link sideBarUser" id={props.state === "Configuracion" ? "inputActiveSideBarUser" : null}>
        <img src={Configuracion} alt="icon-configuracion" />
          <button value={"Configuracion"} onClick={() => props.setState("Configuracion")}>Configuración</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
