import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  productoPost,
  getSubcategoria,
  getUnidadMedida,
} from "../../../Redux/actions";
// import { Link } from "react-router-dom";
// import logo from "../../assets/aguila.png";
import close from "../../../../assets/cancel (1).png";
import "./AgregarProducto.css";

function FormAgregarProducto() {
  const [modal, setModal] = useState(true);

  const handleModal = () => {
    setModal(!modal);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubcategoria());
    dispatch(getUnidadMedida());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subcategoria = useSelector((store) => store.subcategoria);
  const unidad_medida = useSelector((store) => store.unidad_medida);

  const [state, setState] = useState({
    nombre: "",
    contenido_neto: "",
    unidadMedidaCodigoUnidadMedida: "",
    subcategoriumId: "",
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    if (name === "nombre") {
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "contenido_neto") {
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "unidadMedidaCodigoUnidadMedida") {
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "subcategoriumId") {
      setState({
        ...state,
        [name]: target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre: state.nombre,
      contenido_neto: state.contenido_neto,

      unidadMedidaCodigoUnidadMedida: state.unidadMedidaCodigoUnidadMedida,
      subcategoriumId: state.subcategoriumId,
    };

    console.log(nuevoProducto);

    if (!nuevoProducto.nombre) {
      alert("Por favor, ingrese un nombre");
      return;
    }

    if (!nuevoProducto.subcategoriumId) {
      alert("Por favor, ingrese una sub-categoria");
      return;
    }

    if (!nuevoProducto.unidadMedidaCodigoUnidadMedida) {
      alert("Por favor, ingrese una unidad de medida");
      return;
    }

    if (!nuevoProducto.contenido_neto) {
      alert("Por favor, ingrese un contenido neto");
      return;
    }

    dispatch(productoPost(nuevoProducto));
    e.target.reset();
    alert("Producto agregado con éxito!");

    setState({
      nombre: "",
      subcategoriumId: "",
      unidadMedidaCodigoUnidadMedida: "",
      contenido_neto: "",
    });
  };

  return (
    <>
      <div>
        <div className="contenedorFAM">
          {modal ? (
            <div>
              <button className="buttonModal" onClick={() => handleModal()}>
                <img width={30} src={close} alt="x" />
              </button>
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
                <div className="divModalFAM">
                  <div>
                    <label className="text-label">Nombre</label>
                    <input
                      className="inp"
                      type="text"
                      name="nombre"
                      value={state.nombre}
                    ></input>
                  </div>
                  <div className="divForm">
                    <div>
                      <label className="text-label">Unidad de Medida</label>
                      <select
                        name="unidadMedidaCodigoUnidadMedida"
                        className="inp2"
                        // value={state.nombre}
                        onChange={(e) => ChangeInput(e)}
                      >
                        <option></option>
                        {unidad_medida.map((f, index) => (
                          <option key={index} value={f.codigo_unidad_medida}>
                            {f.codigo_unidad_medida}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-label">Contenido Neto</label>
                    <input
                      className="inp"
                      type="number"
                      name="contenido_neto"
                      value={state.contenido_neto}
                    ></input>
                  </div>
                  <div>
                    <label className="text-label">Sub-Categoría</label>
                    <select
                      name="subcategoriumId"
                      className="inp"
                      // value={state.nombre}
                      onChange={(e) => ChangeInput(e)}
                    >
                      <option></option>
                      {subcategoria.map((f, index) => (
                        <option key={index} value={f.id}>
                          {f.nombre_subcategoria}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="agregarModal" type="submit">
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default FormAgregarProducto;
