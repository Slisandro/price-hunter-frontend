import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategorias,
  subcategoriaPost,
  getSubcategoria,
} from "../../../Redux/actions";

function Subcate({ setSwitcher }) {
  const dispatch = useDispatch();
  const [buttonSUB, setButtonSUB] = useState(false);
  const categorias = useSelector((store) => store.categorias);
  const subcategoria = useSelector((store) => store.subcategoria);

  // var mapeado = categorias.map((c) => c.categoria);
  // var mapeado2 = mapeado.map((ca) => ca.categoria);
  // var mapeado3 = mapeado2.map((cat) => cat.nombre_subcategoria);
  // console.log(mapeado2);

  useEffect(() => {
    dispatch(getCategorias());
    dispatch(getSubcategoria());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButtonSUB = (e) => {
    e.preventDefault();
    setButtonSUB(!buttonSUB);
  };

  const [subcate, setSubcate] = useState({
    nombre_subcategoria: "",
    descripcion: "",
    categoriumId: null,
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "nombre_subcategoria") {
      setSubcate({
        ...subcate,
        // categoriumId: target.value,
        [name]: target.value,
      });
    }
    if (name === "descripcion") {
      setSubcate({
        ...subcate,
        // categoriumId: target.value,
        [name]: target.value,
      });
    }
    // console.log(subcate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaSubcate = {
      nombre_subcategoria: subcate.nombre_subcategoria,
      descripcion: subcate.descripcion,
      categoriumId: subcate.categoriumId,
    };

    console.log(nuevaSubcate);

    if (!nuevaSubcate.nombre_subcategoria) {
      alert("Por favor, ingrese una sub-categoria de producto");
      return;
    }

    dispatch(subcategoriaPost(nuevaSubcate));

    e.target.reset();
    alert("Sub-Categoría agregada con éxito!");

    setSubcate({
      nombre_subcategoria: "",
      descripcion: "",
      categoriumId: "",
    });
  };

  return (
    <>
      <div className="divSUB">
        <h6 id="title3">Sub-Categoría</h6>
        <button className="btn6" onClick={handleButtonSUB}>
          Seleccionar Sub-Categoría
        </button>
        <button className="btn6" onClick={handleButtonSUB}>
          Agregar Sub-Categoría
        </button>
        {buttonSUB ? (
          <form
            // id="survey-form"
            className="formSUB"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="divFormCAT">
              <div>
                <label className="text-label">Sub-Categoría</label>
                <select
                  name="nombre_categoria"
                  className="selectTransAgregar"
                  value={subcate.nombre_categoria}
                  onChange={(e) => ChangeInput(e)}
                >
                  {subcategoria.map((f, index) => (
                    <option key={index} value={f.id}>
                      {f.nombre_subcategoria}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="divForm">
              <div>
                <label className="text-label-desc">* Descripción</label>
                <input
                  className="btm-desc"
                  type="text"
                  name="descripcion"
                  value={subcate.descripcion}
                ></input>
              </div>
            </div>
            <button type="submit">Agregar</button>
          </form>
        ) : (
          <form
            // id="survey-form"
            className="formSUB"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="divFormCAT">
              <div>
                <label className="text-label">Sub-Categoría</label>
                <input
                  value={subcate.nombre_subcategoria}
                  name={"nombre_subcategoria"}
                  className="inp"
                  placeholder="Agregar Sub-Categoría"
                ></input>
              </div>
            </div>
            <div className="divForm">
              <div>
                <label className="text-label-desc">* Descripción</label>
                <input
                  className="btm-desc"
                  type="text"
                  name="descripcion"
                  value={subcate.descripcion}
                ></input>
              </div>
            </div>
            <button type="submit">Agregar</button>
          </form>
        )}
      </div>
    </>
  );
}

export default Subcate;
