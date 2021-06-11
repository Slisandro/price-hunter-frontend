import React from "react";
import { Link } from "react-router-dom";

function Servicios() {
  return (
    <>
      <div>Aquí se verán los servicios disponibles</div>
      <Link to="/" className="regresar">
        Regresar
      </Link>
    </>
  );
}

export default Servicios;
