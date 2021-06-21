import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MisDesafios from "../MisDesafios/MisDesafios";
import NavBarMain from "../../navBarMain/NavBarMain";
import Configuración from "../../configuración/Configuración";
import Monedero from "../Monedero/Monedero";
import SearchGeolocation from '../SearchGeolocation/SearchGeolocation';
import { getDesafios } from '../../Redux/actions'
import Table from "../../Table.js";
import "./Main.css";

const Main = ({ state, setState, ubicacion }) => {
  const productos = useSelector((store) => store.productos);
  const [producto, setProducto] = useState("");
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(getDesafios());
  }, [])

  return (
    <main className="main" id="mainUser">
      <div className="main__container">
        <div className="main__title">
          <NavBarMain
            producto={producto}
            setProducto={setProducto}
            setState={setState}
            ubicacion={ubicacion}
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
          ) : state === "BusquedaGeo" ?
            <SearchGeolocation />
            : null
          }
        </div>
      </div>
    </main>
  );
};

export default Main;
