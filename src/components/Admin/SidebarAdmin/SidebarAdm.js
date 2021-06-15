import React from "react";
import "./SidebarAdm.css";
import { Link } from "react-router-dom";
import aguila from "../../../assets/aguila.png";

const SidebarAdm = (props) => {
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
          <i className="fa fa-user"></i>
          <button
            value={"Agregar Productos"}
            onClick={() => props.setState("Agregar Productos")}
          >
            Agregar Productos
          </button>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-user"></i>
          <button
            value={"Agregar Moneda y UM"}
            onClick={() => props.setState("Agregar Moneda y UM")}
          >
            Agregar Moneda y UM
          </button>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-user"></i>
          <button
            value={"Agregar Ubicación"}
            onClick={() => props.setState("Agregar Ubicación")}
          >
            Agregar Ubicación
          </button>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-user"></i>
          <button
            value={"Agregar Familia y Categorias"}
            onClick={() => props.setState("Agregar Familia y Categorias")}
          >
            Agregar Familia y Categorias
          </button>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-user"></i>
          <button
            value={"Agregar Tipo de Transacción"}
            onClick={() => props.setState("Agregar Tipo de Transacción")}
          >
            Agregar Tipo de Transacción
          </button>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-user-secret"></i>
          <button
            value={"Configuracion"}
            onClick={() => props.setState("Configuracion")}
          >
            Configuración
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdm;
