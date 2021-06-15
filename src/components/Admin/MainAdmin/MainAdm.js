import React, { useState } from "react";
import { useSelector } from "react-redux";
import MisDesafios from "../../desafios/MisDesafios";
import NavBarMainAdm from "../NavbarMainAdmin/NavbarMainAdm";
import Configuración from "../../configuración/Configuración";
import FormMonedaYum from "../Form/FormMonedaYum/FormMonedaYum";
import FormUbicacion from "../Form/FormUbicacion/FormUbicacion";
import FormTransaccion from "../Form/FormTipoTrans/FormTransaccion";
import FormFyC from "../Form/FormFamiliaYCategoria/FormFyC";
import FormAgregarProducto from "../Form/FormAgregarProducto/AgregarProducto";
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
            <FormAgregarProducto />
          ) : state === "Agregar Moneda y UM" ? (
            <FormMonedaYum />
          ) : state === "Agregar Sub-Categorías" ? (
            <FormFyC />
          ) : state === "Agregar Tipo de Transacción" ? (
            <FormTransaccion />
          ) : state === "Agregar Ubicación" ? (
            <FormUbicacion />
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default MainAdm;
