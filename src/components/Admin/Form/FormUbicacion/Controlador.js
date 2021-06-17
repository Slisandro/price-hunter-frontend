import React from "react";

function Controlador({ switching, setSwitching }) {
  return (
    <div className="divFormController">
      <button className="btnC" onClick={() => setSwitching("paises")}>
        PAÍS
      </button>
      <button className="btnC" onClick={() => setSwitching("ciudades")}>
        CIUDAD
      </button>
      <button className="btnC" onClick={() => setSwitching("regiones")}>
        REGIÓN
      </button>
    </div>
  );
}

export default Controlador;
