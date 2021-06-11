import React from "react";
import { Link } from "react-router-dom";
import MarcasAsociadas from "../MarcasAsociadas";

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
