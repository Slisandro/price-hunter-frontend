import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import {} from "../../Redux/actions";
// import { Link } from "react-router-dom";
// import logo from "../../assets/aguila.png";
import "./FormUbicacion.css";

function FormUbicacion() {
  const dispatch = useDispatch();
  const ubicaciones = useSelector((store) => store.ubicaciones);

  const [state, setState] = useState({
    pais: "",
    ciudad: "",
    region: "",
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

    const nuevaUbicacion = {
      pais: state.pais,
      ciudad: state.ciudades,
      region: state.region,
    };

    if (!nuevaUbicacion.pais) {
      alert("Por favor, ingrese un país");
      return;
    }
    if (!nuevaUbicacion.ciudad) {
      alert("Por favor, ingrese una ciudad");
      return;
    }
    if (!nuevaUbicacion.region) {
      alert("Por favor, ingrese una región");
      return;
    }

    // dispatch(crearProducto(nuevoProducto));
    e.target.reset();
    alert("Producto creado con éxito!");

    setState({
      unidad_de_medida: null,
      moneda: null,
    });
  };

  return (
    <>
      <div className="containerForm">
        <header>
          <h1 id="title">Agregar Ubicación</h1>
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
              <label className="text-label">País</label>
              <input
                className="btm"
                type="text"
                name="pais"
                value={state.nombre}
              ></input>
            </div>
            <div>
              <label className="text-label">Ciudad</label>
              <input
                className="btm"
                type="text"
                name="ciudad"
                value={state.familia}
              ></input>
            </div>
            <div>
              <label className="text-label">Región</label>
              <input
                className="btm"
                type="text"
                name="region"
                value={state.familia}
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

export default FormUbicacion;
