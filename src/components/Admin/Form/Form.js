import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {} from "../../Redux/actions";
// import { Link } from "react-router-dom";
// import logo from "../../assets/aguila.png";
import "./Form.css";

function Form() {
  const dispatch = useDispatch();
  const ubicaciones = useSelector((store) => store.ubicaciones);

  const [state, setState] = useState({
    nombre: "",
    familia: null,
    categoria: null,
    sub_categoria: null,
    pais: "",
    ciudad: "",
    region: "",
    transaccion: "",
    tipo_transaccion: "",
    unidad_de_medida: null,
    moneda: null,
    contenido_neto: null,
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    if (name === "ubicacion") {
      const arr = state[name];
      setState({
        ...state,
        [name]: arr.concat(target.value),
      });
    } else {
      setState({
        ...state,
        [name]: target.value,
      });
    }
  };

  useEffect(() => {
    // dispatch(getUbicaciones());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre: state.nombre,
      familia: state.familia,
      categoria: state.categoria,
      sub_categoria: state.sub_categoria,
      pais: state.pais,
      ciudad: state.ciudad,
      region: state.region,
      transaccion: state.transaccion,
      tipo_transaccion: state.tipo_transaccion,
      unidad_de_medida: state.unidad_de_medida,
      contenido_neto: state.contenido_neto,
      moneda: state.moneda,
    };

    if (!nuevoProducto.nombre) {
      alert("Por favor, ingrese un nombre");
      return;
    }
    if (!nuevoProducto.familia) {
      alert("Por favor, ingrese una familia de producto");
      return;
    }
    if (!nuevoProducto.categoria) {
      alert("Por favor, ingrese una categoria");
      return;
    }
    if (!nuevoProducto.sub_categoria) {
      alert("Por favor, ingrese una sub-categoria");
      return;
    }
    if (!nuevoProducto.pais) {
      alert("Por favor, ingrese una pais");
      return;
    }
    if (!nuevoProducto.ciudad) {
      alert("Por favor, ingrese una ciudad");
      return;
    }
    if (!nuevoProducto.region) {
      alert("Por favor, ingrese una region");
      return;
    }
    if (!nuevoProducto.transaccion) {
      alert("Por favor, ingrese una trnsaccion");
      return;
    }
    if (!nuevoProducto.unidad_de_medida) {
      alert("Por favor, ingrese una unidad de medida");
      return;
    }
    if (!nuevoProducto.tipo_transaccion) {
      alert("Por favor, ingrese un tipo de transaccion");
      return;
    }
    if (!nuevoProducto.contenido_neto) {
      alert("Por favor, ingrese un contenido neto");
      return;
    }
    if (!nuevoProducto.moneda) {
      alert("Por favor, ingrese una moneda");
      return;
    }

    // dispatch(crearProducto(nuevoProducto));
    e.target.reset();
    alert("Producto creado con éxito!");

    setState({
      nombre: "",
      familia: null,
      categoria: null,
      sub_categoria: null,
      pais: "",
      ciudad: "",
      region: "",
      transaccion: "",
      tipo_transaccion: "",
      unidad_de_medida: null,
      moneda: null,
      contenido_neto: null,
    });
  };

  return (
    <>
      <div className="containerForm">
        <header>
          <h1 id="title">Agregar Producto</h1>
        </header>
        <form
          id="survey-form"
          className="form"
          noValidate
          onChange={(e) => ChangeInput(e)}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="divForm">
            <div>
              <label className="text-label">Nombre</label>
              <input
                className="btm"
                type="text"
                name="nombre"
                value={state.nombre}
              ></input>
            </div>
            <div>
              <label className="text-label">Familia</label>
              <input
                className="btm"
                type="text"
                name="familia"
                value={state.familia}
              ></input>
            </div>
            <div>
              <label className="text-label">Categoria</label>
              <input
                className="btm"
                type="text"
                name="categoria"
                value={state.categoria}
              ></input>
            </div>
            <div>
              <label className="text-label">Sub Categoria</label>
              <input
                className="btm"
                type="text"
                name="sub_categoria"
                value={state.sub_categoria}
              ></input>
            </div>
            <div>
              <label className="text-label">Unidad de Medida</label>
              <input
                className="btm"
                type="text"
                name="unidad_de_medida"
                value={state.unidad_de_medida}
              ></input>
            </div>
            <div>
              <label className="text-label">Moneda</label>
              <input
                className="btm"
                type="text"
                name="moneda"
                value={state.moneda}
              ></input>
            </div>
            <div>
              <label className="text-label">Ubicación</label>
              <input
                className="btm"
                type="text"
                name="ubicacion"
                value={state.ubicacion}
              ></input>
              {/* <div>
                <ul className="ulubi">
                  {ubicaciones.map((t) => (
                    <li key={t.id}>
                      <input
                        className="input"
                        type="checkbox"
                        name="ubicacion"
                        value={t.nombre}
                      ></input>
                      <label nombre={t}>{t.nombre}</label>
                    </li>
                  ))}
                </ul>
              </div> */}
              <button type="submit">Agregar Producto</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
