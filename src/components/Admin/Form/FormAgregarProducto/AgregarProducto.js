import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import {} from "../../Redux/actions";
// import { Link } from "react-router-dom";
// import logo from "../../assets/aguila.png";
import "./AgregarProducto.css";

function FormAgregarProducto() {
  const dispatch = useDispatch();
  const ubicaciones = useSelector((store) => store.ubicaciones);

  const [state, setState] = useState({
    nombre: "",
    contenido_neto: "",
    unidad_medida: "",
    id_subcategoria: "",
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
      contenido_neto: state.contenido_neto,
      unidad_medida: state.unidad_medida,
      id_subcategoria: state.id_subcategoria,
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

    if (!nuevoProducto.unidad_de_medida) {
      alert("Por favor, ingrese una unidad de medida");
      return;
    }

    if (!nuevoProducto.contenido_neto) {
      alert("Por favor, ingrese un contenido neto");
      return;
    }

    // dispatch(crearProducto(nuevoProducto));
    e.target.reset();
    alert("Producto agregado con éxito!");

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
              <label className="text-label">Contenido Neto</label>
              <input
                className="btm"
                type="text"
                name="contenido_neto"
                value={state.contenido_neto}
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
              <label className="text-label">Sub Categoria</label>
              <input
                className="btm"
                type="text"
                name="sub_categoria"
                value={state.sub_categoria}
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
            <button type="submit">Agregar Producto</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormAgregarProducto;
