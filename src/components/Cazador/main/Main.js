import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MisDesafios from "../MisDesafios/MisDesafios";
import NavBarMain from "../../navBarMain/NavBarMain";
import Configuración from "../../configuración/Configuración";
import Monedero from "../Monedero/Monedero";
import MyMap from '../MapUser/MapUser';
import { getDesafios } from '../../Redux/actions'
import Table from "../../Table.js";
import "./Main.css";
import Transacciones from "../Transacciones/Transacciones";

const Main = ({ state, setState, ubicacion, setUbicacion }) => {
  const productos = useSelector((store) => store.productos);
  const [producto, setProducto] = useState("");
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(getDesafios());
  }, [])

  return (
    <main className="main" id="mainUser">
      <div className="main__container" id="navBarPadre">
        <div className="main__title" id="navBarContainer">
          <NavBarMain
            producto={producto}
            setProducto={setProducto}
            setState={setState}
            ubicacion={ubicacion}
            setUbicacion={setUbicacion}
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
          ) : state === "Movimientos" ? (
            <Monedero />
          ) : state === "Panel" ?
            <>
              <MyMap ubicacion={ubicacion} />
              <Transacciones />
            </>
            : null
          }
        </div>
      </div>
    </main>
  );
};

export default Main;
