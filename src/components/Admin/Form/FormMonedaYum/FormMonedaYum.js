import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import {} from "../../Redux/actions";
// import { Link } from "react-router-dom";
// import logo from "../../assets/aguila.png";
import "./FormMonedaYum.css";

function FormMonedaYum() {
  const dispatch = useDispatch();
  const ubicaciones = useSelector((store) => store.ubicaciones);

  const [state, setState] = useState({
    moneda: "",
    unidad_medida: "",
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

    const nuevaMonedaYum = {
      moneda: state.moneda,
      unidad_medida: state.unidad_medida,
    };

    if (!nuevaMonedaYum.unidad_de_medida) {
      alert("Por favor, ingrese una unidad de medida");
      return;
    }
    if (!nuevaMonedaYum.moneda) {
      alert("Por favor, ingrese una moneda");
      return;
    }

    // dispatch(crearProducto(nuevoProducto));
    e.target.reset();
    alert("Moneda y Unidad de Medida agregadas con éxito!");

    setState({
      unidad_de_medida: null,
      moneda: null,
    });
  };

  return (
    <>
      <div className="containerForm">
        <header>
          <h1 id="title">Agregar Moneda y Unidad de Medida</h1>
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
              <label className="text-label">Moneda</label>
              <input
                className="btm"
                type="text"
                name="moneda"
                value={state.moneda}
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
            <button type="submit">Agregar</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormMonedaYum;
