import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

import "./NavBar.css";

function NavBar() {
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="containerNavBar">
      <h2 className="titleNavBar">Price Hunter</h2>
      <div className="links">
        <Link to="/">Inicio</Link>
        <Link to="/Marcas">Marcas</Link>
        <Link to="Servicios">Servicios</Link>
        <Link to="/Contacto">Contacto</Link>
        <Link to="/SobreNosotros">Sobre nosotros</Link>
        <Link to="/Ayuda">Ayuda</Link>
      </div>
      <button onClick={handleModal} className="button">
        Ingresar/Registrarse
      </button>
      {modal ? (
        <div className="modal">
          <button onClick={handleModal}>x</button>
          <Login />
        </div>
      ) : null}
    </div>
  );
}

export default NavBar;
