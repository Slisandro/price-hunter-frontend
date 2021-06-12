import React from "react";
import { Link } from "react-router-dom";
import MarcasAsociadas from "../MarcasAsociadas";
import "../styles/Contacto.css";

function Marcas() {
  return (
    <>
      <MarcasAsociadas />
      <Link to="/" className="regresar">
        Regresar
      </Link>
    </>
  );
}

export default Marcas;
