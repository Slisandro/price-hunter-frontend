import React, { useState } from "react";
import { Link } from "react-router-dom";

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
        <Link to="/Recompensas">Recompensas</Link>
        <Link to="Servicios">Servicios</Link>
        <Link to="/SobreNosotros">Sobre nosotros</Link>
      </div>
      <button onClick={handleModal} className="button">
        Ingresar/Registrarse
      </button>
      {modal ? (
        <div className="modal">
          Modal Abierto
          <button onClick={handleModal}>x</button>
        </div>
      ) : null}
    </div>
  );
}

export default NavBar;
