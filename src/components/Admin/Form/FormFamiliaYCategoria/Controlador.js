import React from "react";
import Fami from "./Fami";
import Cate from "./Cate";
import Subca from "./Subca";

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
      {/* {switcher === "fami" ? (
        <Fami setSwitcher={setSwitcher} />
      ) : switcher === "cate" ? (
        <Cate setSwitcher={setSwitcher} />
      ) : switcher === "subca" ? (
        <Subca setSwitcher={setSwitcher} />
      ) : (
        <h1>Nada renderiza</h1>
      )} */}
    </div>
  );
}

export default Controlador;
