import React, { useState } from "react";
import { useSelector } from "react-redux";
import MisDesafios from "../../desafios/MisDesafios";
import NavBarMainAdm from "../NavbarMainAdmin/NavbarMainAdm";
import Configuración from "../../configuración/Configuración";
import Form from "../Form/Form";
import "./MainAdm.css";

const MainAdm = ({ state, setState }) => {
  const productos = useSelector((store) => store.productos);
  const subcategorias = useSelector((store) => store.subcategorias);
  const [producto, setProducto] = useState("");

  return (
    <main className="main">
      <div className="main__container">
        {state === "Desafios" ? null : (
          <NavBarMainAdm
            producto={producto}
            setProducto={setProducto}
            setState={setState}
          />
        )}
        <div className="containerTableSearch">
          {state === "Search" ? (
            <div className="containerMessageBack">
              <p>{productos.msg}</p>
            </div>
          ) : state === "Mis Desafios" ? (
            <MisDesafios setState={setState} />
          ) : state === "Configuracion" ? (
            <Configuración />
          ) : state === "Agregar Productos" ? (
            <Form />
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default MainAdm;
