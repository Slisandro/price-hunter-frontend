import React from "react";

function Controlador({ switcher, setSwitcher }) {
  return (
    <div className="divFormController">
      <button className="btnC" onClick={() => setSwitcher("fami")}>
        FAMILIA
      </button>
      <button className="btnC" onClick={() => setSwitcher("cate")}>
        CATEGORÍA
      </button>
      <button className="btnC" onClick={() => setSwitcher("subca")}>
        SUBCATEGORÍA
      </button>
    </div>
  );
}

export default Controlador;
