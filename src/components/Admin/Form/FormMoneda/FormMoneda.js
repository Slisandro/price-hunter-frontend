import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { monedaPost } from "../../../Redux/actions";

import "./FormMonedaYum.css";

function FormMoneda() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    codigo_moneda: "",
    nombre_moneda: "",
    simbolo: "",
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    // console.log(name);

    if (name === "codigo_moneda") {
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "nombre_moneda") {
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "simbolo") {
      setState({
        ...state,
        [name]: target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaMoneda = {
      codigo_moneda: state.codigo_moneda.toLocaleUpperCase(),
      nombre_moneda: state.nombre_moneda,
      simbolo: state.simbolo,
    };

    if (!nuevaMoneda.codigo_moneda) {
      alert("Por favor, ingrese el codigo de la moneda");
      return;
    }
    if (nuevaMoneda.codigo_moneda.length !== 3) {
      alert("Debe ingresar 3 letras...");
      return;
    }
    if (!isNaN(parseInt(nuevaMoneda.codigo_moneda))) {
      alert("El codigo solo puede contener letras");
      return;
    }
    if (!nuevaMoneda.nombre_moneda) {
      alert("Por favor, ingrese el nombre de la moneda");
      return;
    }
    if (!isNaN(parseInt(nuevaMoneda.nombre_moneda))) {
      alert("El nombre solo puede contener letras");
      return;
    }
    if (!nuevaMoneda.simbolo) {
      alert("Por favor, ingrese el simbolo de la moneda");
      return;
    }

    dispatch(monedaPost(nuevaMoneda));
    e.target.reset();
    alert("La Moneda fue agregada con éxito!");

    setState({
      codigo_moneda: "",
      nombre_moneda: "",
      simbolo: "",
    });
  };

  return (
    <>
      <div className="containerForm">
        <header>
          <h1 id="title">Agregar Moneda</h1>
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
              <label className="text-label">Codigo de Moneda</label>
              <input
                className="btm"
                type="text"
                name="codigo_moneda"
                value={state.codigo_moneda}
              ></input>
            </div>
            <div>
              <label className="text-label">Nombre de la Moneda</label>
              <input
                className="btm"
                type="text"
                name="nombre_moneda"
                value={state.nombre_moneda}
              ></input>
            </div>
            <div>
              <label className="text-label">Simbolo</label>
              <input
                className="btm"
                type="text"
                name="simbolo"
                value={state.simbolo}
              ></input>
            </div>
            <button className="btn" type="submit">
              Agregar
            </button>
          </div>
        </form>
      </div>

      {/* <div>
        <header>
          <h1 id="title">Agregar Unidad Medida</h1>
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
              <label className="text-label">Codigo de Moneda</label>
              <input
                className="btm"
                type="text"
                name="codigo_moneda"
                value={state.codigo_moneda}
              ></input>
            </div>
            <div>
              <label className="text-label">Nombre de la Moneda</label>
              <input
                className="btm"
                type="text"
                name="nombre_moneda"
                value={state.nombre_moneda}
              ></input>
            </div>
            <div>
              <label className="text-label">Simbolo</label>
              <input
                className="btm"
                type="text"
                name="simbolo"
                value={state.simbolo}
              ></input>
            </div>
            <button className="btn" type="submit">
              Agregar
            </button>
          </div>
        </form>
      </div> */}
    </>
  );
}

export default FormMoneda;
