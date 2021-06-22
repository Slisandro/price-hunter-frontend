import React from "react";

function Controlador({ switching, setSwitching }) {
  return (
    <div className="divFormControllerr">
      <button className="btnC" onClick={() => setSwitching("regiones")}>
        REGIÓN
      </button>
      <button className="btnC" onClick={() => setSwitching("paises")}>
        PAÍS
      </button>
      <button className="btnC" onClick={() => setSwitching("ciudades")}>
        CIUDAD
      </button>
    </div>
  );
}

export default Controlador;
