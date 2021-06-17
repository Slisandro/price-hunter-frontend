import React, { useState } from "react";
import { useSelector } from "react-redux";
import MisDesafios from "../MisDesafios/MisDesafios";
import NavBarMain from "../../navBarMain/NavBarMain";
import Configuración from "../../configuración/Configuración";
import Table from "../../Table.js";
import "./Main.css";

const Main = ({ state, setState }) => {
  const productos = useSelector((store) => store.productos);
  const subcategorias = useSelector((store) => store.subcategorias);
  const [producto, setProducto] = useState("");

  return (
    <main className="main">
      <div className="main__container">
        <div className="main__title">
          <NavBarMain
            producto={producto}
            setProducto={setProducto}
            setState={setState}
          />
        </div>

        <div className="containerTableSearch">
          {state === "Search" ? (
            !productos.msg ? (
              <Table productos={productos} name={producto} />
            ) : (
              <div className="containerMessageBack">
                <p>{productos.msg}</p>
              </div>
            )
          ) : state === "Desafios" ? (
            <MisDesafios setState={setState} />
          ) : state === "Configuracion" ? (
            <Configuración />
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default Main;
