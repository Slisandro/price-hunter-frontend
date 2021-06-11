import React from "react";
import { Link } from "react-router-dom";

function Recompensas() {
  return (
    <>
      <div>Aquí se verán las recompensas</div>
      <Link to="/" className="regresar">
        Regresar
      </Link>
    </>
  );
}

export default Recompensas;
