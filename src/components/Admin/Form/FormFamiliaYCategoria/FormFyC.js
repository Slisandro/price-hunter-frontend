import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Controlador from "./Controlador";
import Fami from "./Fami";
import Cate from "./Cate";
import Subca from "./Subca";
import { getCategoria, getFamilia } from "../../../Redux/actions";
// import { Link } from "react-router-dom";
// import logo from "../../assets/aguila.png";
import "./FormFyC.css";

function FormFyC() {
  const dispatch = useDispatch();
  const categoria = useSelector((store) => store.categoria);
  const familia = useSelector((store) => store.familia);

  const [switcher, setSwitcher] = useState("");

  // console.log(familia) === {id: 1, nombre_familia: "Almacen", descripcion: "productos secos", ... }
  // console.log(categoria); // id(pin):1
  // descripcion(pin):null
  // nombre_categoria(pin):"Aceites_y_Aderezos"
  // familiumId(pin):1

  useEffect(() => {
    dispatch(getCategoria());
    dispatch(getFamilia());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="contenedorFAM">
        <header>
          <h1 id="title">Agregar Familia y Categoría</h1>
        </header>
        <Controlador switcher={switcher} setSwitcher={setSwitcher} />
        {switcher === "fami" ? (
          <Fami setSwitcher={setSwitcher} />
        ) : switcher === "cate" ? (
          <Cate setSwitcher={setSwitcher} />
        ) : switcher === "subca" ? (
          <Subca setSwitcher={setSwitcher} />
        ) : null}
      </div>
    </>
  );
}

export default FormFyC;
