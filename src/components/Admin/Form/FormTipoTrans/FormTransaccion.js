import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import {} from "../../Redux/actions";
// import { Link } from "react-router-dom";
// import logo from "../../assets/aguila.png";
import "./FormTransaccion.css";

function FormTransaccion() {
  const dispatch = useDispatch();
  const ubicaciones = useSelector((store) => store.ubicaciones);

  const [state, setState] = useState({
    tipo_transaccion: "",
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

    const nuevoTipoTransaccion = {
      tipo_transaccion: state.tipo_transaccion,
    };

    if (!nuevoTipoTransaccion.tipo_transaccion) {
      alert("Por favor, ingrese un tipo de transacción");
      return;
    }

    // dispatch(crearProducto(nuevoProducto));
    e.target.reset();
    alert("Tipo de Transacción agregado con éxito!");

    setState({
      tipo_transaccion: "",
    });
  };

  return (
    <>
      <div className="containerForm">
        <header>
          <h1 id="title">Agregar Tipo de Transacción</h1>
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
              <label className="text-label">Tipo de Transacción</label>
              {/* <input
                className="btm"
                type="text"
                name="tipo_transaccion"
                value={state.tipo_transaccion}
              ></input> */}
              <select
                className="selectTransAgregar"
                name="tipo_transaccion"
                value={state.tipo_transaccion}
                onChange={(e) => ChangeInput(e)}
              >
                <option value={state.tipo_transaccion}>Puntos Ganados</option>
                <option value={state.tipo_transaccion}>Puntos Retirados</option>
              </select>
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
            <button className="btn4" type="submit">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormTransaccion;
