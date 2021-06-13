import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import aguila from "../../assets/aguila.png";

const Sidebar = (props) => {
  return (
    <div className={props.sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={aguila} alt="logo" />
          <h1>PH</h1>
        </div>
        <i
          className="far fa-window-close"
          id="sidebarIcon"
          onClick={() => props.closeSidebar()}
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__link  active_menu_link">
          <Link to="">Panel de control</Link>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-user-secret"></i>
          <button value={"Desafios"} onClick={() => props.setState("Desafios")}>Mis desafios</button>
        </div>

        <div className="sidebar__link">
          <i className="fa fa-user-secret"></i>
          <button value={"Configuracion"} onClick={() => props.setState("Configuracion")}>Configuración</button>
        </div>

        <div className="sidebar__link">
          <i className="fa fa-user-secret"></i>
          <button value={"Configuracion"} onClick={() => props.setState("Configuracion")}>Configuración</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
