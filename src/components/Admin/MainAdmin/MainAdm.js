import React, { useState } from "react";
import { useSelector } from "react-redux";
import MisDesafios from "../../desafios/MisDesafios";
import NavBarMainAdm from "../NavbarMainAdmin/NavbarMainAdm";
import Configuración from "../../configuración/Configuración";
import FormMoneda from "../Form/FormMoneda/FormMoneda";
import FormUnidadMedida from "../Form/FormUm/FormUnidadMedida";
import FormUbicacion from "../Form/FormUbicacion/FormUbicacion";
import FormTransaccion from "../Form/FormTipoTrans/FormTransaccion";
import FormFyC from "../Form/FormFamiliaYCategoria/FormFyC";
import FormAgregarProducto from "../Form/FormAgregarProducto/AgregarProducto";
import FormUsuario from "../Form/FormUsuario/FormUsuario";
import FormGenero from "../Form/FormGenero/FormGenero";
import PutCategorías from "../FormPuts/PutCategorias/PutCategorias";
import PutCiudades from "../FormPuts/PutCiudades/PutCiudades";
// import PutDesafios from "../FormPuts/PutDesafíos/PutDesafios";
import PutFamilias from "../FormPuts/PutFamilias/PutFamilias";
import PutMonedas from "../FormPuts/PutMonedas/PutMonedas";
import PutPaises from "../FormPuts/PutPaises/PutPaises";
import PutProductos from "../FormPuts/PutProductos/PutProductos";
import PutRegiones from "../FormPuts/PutRegiones/PutRegiones";
import PutSubCate from "../FormPuts/PutSubCategoria/PutSubCate";
import PutTiposUsuarios from "../FormPuts/PutTiposUsuarios/PutTiposUsuarios";
import PutTipoTrans from "../FormPuts/PutTipoTrans/PutTipoTrans";
import PutUM from "../FormPuts/PutUM/PutUM";
import PutGeneros from "../FormPuts/PutGeneros/PutGeneros";

// import FormMonedaYum from "../Form/FormMonedaYum/FormMoneda";
// import Form from "../Form/Form";
import "./MainAdm.css";

const MainAdm = ({ state, setState }) => {
  const productos = useSelector((store) => store.productos);
  // const subcategorias = useSelector((store) => store.subcategorias);
  const [producto, setProducto] = useState("");

  return (
    <main className="mainADM">
      <div className="main__containerr">
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
            <FormMoneda />
          ) : state === "Agregar Familia y Categoría" ? (
            <FormFyC />
          ) : state === "Agregar Tipo de Transacción" ? (
            <FormTransaccion />
          ) : state === "Agregar Ubicación" ? (
            <FormUbicacion />
          ) : state === "Agregar Tipo de Usuario" ? (
            <FormUsuario />
          ) : state === "Agregar Género" ? (
            <FormGenero />
          ) : state === "Modificar-Familias" ? (
            <PutFamilias />
          ) : state === "Modificar-Categoría" ? (
            <PutCategorías />
          ) : state === "Modificar-Sub-Categoría" ? (
            <PutSubCate />
          ) : state === "Modificar-Productos" ? (
            <PutProductos />
          ) : state === "Modificar-Países" ? (
            <PutPaises />
          ) : state === "Modificar-Ciudades" ? (
            <PutCiudades />
          ) : state === "Modificar-Regiones" ? (
            <PutRegiones />
          ) : state === "Modificar-Monedas" ? (
            <PutMonedas />
          ) : state === "Modificar-Tipos-de-Usuario" ? (
            <PutTiposUsuarios />
          ) : state === "Modificar-Unidad-de-Medida" ? (
            <PutUM />
          ) : state === "Modificar-Tipo-de-Transacción" ? (
            <PutTipoTrans />
          ) : state === "Modificar-Generos" ? (
            <PutGeneros />
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default MainAdm;
