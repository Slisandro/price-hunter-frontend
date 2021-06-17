import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { paisPost, regionPost, ciudadPost } from "../../../Redux/actions";
import Controlador from "./Controlador";
import Paises from "./Paises";
import Ciudades from "./Ciudades";
import Regiones from "./Regiones";
// import { Link } from "react-router-dom";
// import logo from "../../assets/aguila.png";
import "./FormUbicacion.css";

function FormUbicacion() {
  const dispatch = useDispatch();
  // const ubicaciones = useSelector((store) => store.ubicaciones);

  const [switching, setSwitching] = useState("");

  useEffect(() => {
    // dispatch(getUbicaciones());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="containerForm">
        <header>
          <h1 id="title">Agregar Ubicación</h1>
        </header>
        <Controlador switching={switching} setSwitching={setSwitching} />
        {switching === "paises" ? (
          <Paises setSwitching={setSwitching} />
        ) : switching === "ciudades" ? (
          <Ciudades setSwitching={setSwitching} />
        ) : switching === "regiones" ? (
          <Regiones setSwitching={setSwitching} />
        ) : null}
      </div>
    </>
  );
}

export default FormUbicacion;
