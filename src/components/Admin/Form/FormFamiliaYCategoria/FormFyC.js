import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import {} from "../../Redux/actions";
// import { Link } from "react-router-dom";
// import logo from "../../assets/aguila.png";
import "./FormFyC.css";

function FormTransaccion() {
  const dispatch = useDispatch();
  const ubicaciones = useSelector((store) => store.ubicaciones);

  const [state, setState] = useState({
    familia: "",
    categoria: "",
    sub_categoria: "",
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

    const nuevaFamiliaYcategoria = {
      familia: state.familia,
      categoria: state.categoria,
      sub_categoria: state.sub_categoria,
    };

    if (!nuevaFamiliaYcategoria.familia) {
      alert("Por favor, ingrese una familia de producto");
      return;
    }
    if (!nuevaFamiliaYcategoria.categoria) {
      alert("Por favor, ingrese una categoria de producto");
      return;
    }
    if (!nuevaFamiliaYcategoria.sub_categoria) {
      alert("Por favor, ingrese una sub-categoria de producto");
      return;
    }

    // dispatch(crearProducto(nuevoProducto));
    e.target.reset();
    alert("Tipo de Transacción agregado con éxito!");

    setState({
      familia: "",
      categoria: "",
      sub_categoria: "",
    });
  };

  return (
    <>
      <div className="containerForm">
        <header>
          <h1 id="title">Agregar Familia y Categorías</h1>
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
              <label className="text-label">Familia</label>
              <input
                className="btm"
                type="text"
                name="familia"
                value={state.familia}
              ></input>
            </div>
            <div className="divForm">
              <div>
                <label className="text-label">Categoría</label>
                <input
                  className="btm"
                  type="text"
                  name="categoria"
                  value={state.categoria}
                ></input>
              </div>
            </div>
            <div className="divForm">
              <div>
                <label className="text-label">Sub-Categoría</label>
                <input
                  className="btm"
                  type="text"
                  name="sub-categoria"
                  value={state.sub_categoria}
                ></input>
              </div>
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

export default FormTransaccion;
