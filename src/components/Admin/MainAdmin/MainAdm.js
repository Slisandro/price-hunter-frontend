import React, { useState } from "react";
import { useSelector } from "react-redux";
import MisDesafios from "../../desafios/MisDesafios";
import NavBarMainAdm from "../NavbarMainAdmin/NavbarMainAdm";
import Configuración from "../../configuración/Configuración";
import FormMoneda from "../Form/FormMonedaYum/FormMoneda";
import FormUnidadMedida from "../Form/FormUm/FormUnidadMedida";
import FormUbicacion from "../Form/FormUbicacion/FormUbicacion";
import FormTransaccion from "../Form/FormTipoTrans/FormTransaccion";
import FormFyC from "../Form/FormFamiliaYCategoria/FormFyC";
import FormAgregarProducto from "../Form/FormAgregarProducto/AgregarProducto";
import FormMonedaYum from "../Form/FormMonedaYum/FormMoneda";
import Form from "../Form/Form";
import "./MainAdm.css";

const MainAdm = ({ state, setState }) => {
  const productos = useSelector((store) => store.productos);
  const subcategorias = useSelector((store) => store.subcategorias);
  const [producto, setProducto] = useState("");

  const [mod, setMod] = useState(false);

  const handleMod = () => {
    setMod(!mod);
  };

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
          ) : state === "Agregar Moneda" ? (
            <FormMoneda />
          ) : state === "Agregar UM" ? (
            <FormUnidadMedida />
          ) : state === "Agregar Sub-Categorías" ? (
             <div></div>
          ) : state === "Agregar Familia y Categoría" ? (
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
