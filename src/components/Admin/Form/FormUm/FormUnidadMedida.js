import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unidadDeMedida } from "../../../Redux/actions";

import "./FormUnidadMedida.css";

function FormUnidadMedida() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    codigo_unidad_medida: "",
    nombre_unidad: "",
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "codigo_unidad_medida") {
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "nombre_unidad") {
      setState({
        ...state,
        [name]: target.value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaUM = {
      codigo_unidad_medida: state.codigo_unidad_medida,
      nombre_unidad: state.nombre_unidad,
    };

    if (!nuevaUM.codigo_unidad_medida) {
      alert("Por favor, ingrese el codigo de la moneda");
      return;
    }
    // if (nuevaUM.codigo_unidad_medida !== 3) {
    //   alert("Debe ingresar 3 letras...");
    //   return;
    // }
    if (!isNaN(parseInt(nuevaUM.codigo_unidad_medida))) {
      alert("El codigo solo puede contener letras");
      return;
    }
    if (!nuevaUM.nombre_unidad) {
      alert("Por favor, ingrese el nombre de la moneda");
      return;
    }
    if (!isNaN(parseInt(nuevaUM.nombre_unidad))) {
      alert("El nombre solo puede contener letras");
      return;
    }

    dispatch(unidadDeMedida(nuevaUM));
    e.target.reset();
    alert("La Unidad de Medida fue agregada con éxito!");

    setState({
      codigo_unidad_medida: "",
      nombre_unidad: "",
    });
  };

  return (
    <>
      <div className="contenedorFAM">
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
          <div>
            <label className="text-label">Nombre</label>
            <input
              className="inp"
              type="text"
              name="nombre_unidad"
              value={state.nombre_unidad}
            ></input>
          </div>
          <div className="divForm">
            <div>
              <label className="text-label">Unidad de Medida</label>
              <input
                className="inp"
                type="text"
                name="codigo_unidad_medida"
                value={state.codigo_moneda}
              ></input>
            </div>
            <button className="btn4" type="submit">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormUnidadMedida;
