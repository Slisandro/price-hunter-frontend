import React, { useState } from "react";
import "./SidebarAdm.css";
import { Link } from "react-router-dom";
import aguila from "../../../assets/aguila.png";

const SidebarAdm = (props) => {
  const [button, setButton] = useState(true);
  const [modifier, setModifier] = useState(false);

  function handleButton() {
    setButton(!button);
    setModifier(!modifier);
  }

  // function handleModifier() {
  //   setModifier(!modifier);
  //   setButton(!button);
  // }

  return (
    <div
      className={props.sidebarOpen ? "sidebar-responsivee" : ""}
      id="sidebarr"
    >
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
          <Link to="/tablero">Panel de control</Link>
        </div>
        <div className="agregarr">
          <button className="btnSide" onClick={() => handleButton()}>
            Agregar/Modificar
          </button>
          {/* <button className="btnSide" onClick={() => handleModifier()}>
            Modificar
          </button> */}
        </div>

        {button ? (
          <>
            {/* <ul className="addd"> */}
            <div className="menu-col">
              {/* <i className="fa fa-plus"></i> */}
              <li
                className="addd"
                value={"Agregar Productos"}
                onClick={() => props.setState("Agregar Productos")}
              >
                Agregar Productos
              </li>
            </div>
            <div className="menu-col">
              {/* <i className="fa fa-university"></i> */}
              <li
                className="addd"
                value={"Agregar Moneda y UM"}
                onClick={() => props.setState("Agregar Moneda")}
              >
                Agregar Moneda
              </li>
            </div>
            <div className="menu-col">
              {/* <i className="fa fa-user"></i> */}
              <li
                className="addd"
                value={"Agregar UM"}
                onClick={() => props.setState("Agregar UM")}
              >
                Agregar UM
              </li>
            </div>
            <div className="menu-col">
              {/* <i className="fas fa-globe-americas"></i> */}
              <li
                className="addd"
                value={"Agregar Ubicación"}
                onClick={() => props.setState("Agregar Ubicación")}
              >
                Agregar Ubicación
              </li>
            </div>
            <div className="menu-col">
              {/* <i className="fa fa-sitemap"></i> */}
              <li
                className="addd"
                value={"Agregar Sub-Categorías"}
                onClick={() => props.setState("Agregar Familia y Categoría")}
              >
                Agregar Familia y Categoría
              </li>
            </div>
            <div className="menu-col">
              {/* <i className="fa fa-credit-card"></i> */}
              <li
                className="addd"
                value={"Agregar Tipo de Transacción"}
                onClick={() => props.setState("Agregar Tipo de Transacción")}
              >
                Agregar Tipo de Transacción
              </li>
            </div>
            <div className="menu-col">
              {/* <i className="fa fa-user"></i> */}
              <li
                className="addd"
                value={"Agregar Tipo de Usuario"}
                onClick={() => props.setState("Agregar Tipo de Usuario")}
              >
                Agregar Tipo de Usuario
              </li>
            </div>
            <div className="menu-col">
              {/* <i className="fas fa-venus-mars"></i> */}
              <li
                className="addd"
                value={"Agregar Género"}
                onClick={() => props.setState("Agregar Género")}
              >
                Agregar Género
              </li>
            </div>
            {/* </ul> */}
          </>
        ) : modifier ? (
          <>
            <div className="agregarr">
              <div className="menu-col">
                {/* <i className="fa fa-plus"></i> */}
                <li
                  className="addd"
                  value={"Modificar-Familias"}
                  onClick={() => props.setState("Modificar-Familias")}
                >
                  Modificar Familias
                </li>
              </div>
            </div>
            <div className="menu-col">
              {/* <i className="fa fa-university"></i> */}
              <li
                className="addd"
                value={"Modificar-Categoría"}
                onClick={() => props.setState("Modificar-Categoría")}
              >
                Modificar Categoría
              </li>
            </div>
            <div className="menu-col">
              {/* <i className="fa fa-user"></i> */}
              <li
                className="addd"
                value={"Modificar-Sub-Categoría"}
                onClick={() => props.setState("Modificar-Sub-Categoría")}
              >
                Modificar Sub-Categoría
              </li>
            </div>
            <div className="menu-col">
              {/* <i className="fas fa-globe-americas"></i> */}
              <li
                className="addd"
                value={"Modificar-Productos"}
                onClick={() => props.setState("Modificar-Productos")}
              >
                Modificar Productos
              </li>
            </div>
            <div className="menu-col">
              {/* <i className="fa fa-sitemap"></i> */}
              <li
                className="addd"
                value={"Modificar-Países"}
                onClick={() => props.setState("Modificar-Países")}
              >
                Modificar Países
              </li>
            </div>
            <div className="menu-col">
              {/* <i className="fa fa-credit-card"></i> */}
              <li
                className="addd"
                value={"Modificar-Ciudades"}
                onClick={() => props.setState("Modificar-Ciudades")}
              >
                Modificar Ciudades
              </li>
            </div>
            <div className="menu-col">
              {/* <i className="fa fa-user"></i> */}
              <li
                className="addd"
                value={"Modificar-Regiones"}
                onClick={() => props.setState("Modificar-Regiones")}
              >
                Modificar Regiones
              </li>
            </div>
            <div className="menu-col">
              {/* <i className="fas fa-venus-mars"></i> */}
              <li
                className="addd"
                value={"Modificar-Monedas"}
                onClick={() => props.setState("Modificar-Monedas")}
              >
                Modificar Monedas
              </li>
            </div>
            <div className="menu-col">
              {/* <i className="fas fa-venus-mars"></i> */}
              <li
                className="addd"
                value={"Modificar-Tipos-de-Usuario"}
                onClick={() => props.setState("Modificar-Tipos-de-Usuario")}
              >
                Modificar Tipos de Usuario
              </li>
            </div>
            <div className="menu-col">
              {/* <i className="fas fa-venus-mars"></i> */}
              <li
                className="addd"
                value={"Modificar-Unidad-de-Medida"}
                onClick={() => props.setState("Modificar-Unidad-de-Medida")}
              >
                Modificar Unidad de Medida
              </li>
            </div>
            <div className="menu-col">
              {/* <i className="fas fa-venus-mars"></i> */}
              <li
                className="addd"
                value={"Modificar-Tipo-de-Transacción"}
                onClick={() => props.setState("Modificar-Tipo-de-Transacción")}
              >
                Modificar Tipo de Transacción
              </li>
            </div>
            <div className="menu-col">
              {/* <i className="fas fa-venus-mars"></i> */}
              <li
                className="addd"
                value={"Modificar-Desafíos"}
                onClick={() => props.setState("Modificar-Desafíos")}
              >
                Modificar Desafíos
              </li>
            </div>
          </>
        ) : null}

        <div>
          {/* <i className="fa fa-user-secret"></i> */}
          <button
            className="btnSideConfig"
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
