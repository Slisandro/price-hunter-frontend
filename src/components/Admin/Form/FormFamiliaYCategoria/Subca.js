import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategoria,
  subcategoriaPost,
  getSubcategoria,
} from "../../../Redux/actions";

function Subcate({ setSwitcher }) {
  const dispatch = useDispatch();
  const [buttonSUB, setButtonSUB] = useState(false);
  const categoria = useSelector((store) => store.categoria);
  const subcategoria = useSelector((store) => store.subcategoria);

  var mapeado = categoria.map((c) => c.id);
  var mapeado2 = mapeado.map((ca) => ca);

  console.log(mapeado);

  useEffect(() => {
    dispatch(getCategoria());
    dispatch(getSubcategoria());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleButtonSUB = (e) => {
  //   e.preventDefault();
  //   setButtonSUB(!buttonSUB);
  // };

  const [cate, setCate] = useState({
    nombre_categoria: "",
    descripcion: "",
    id: null,
  });

  const [subcate, setSubcate] = useState({
    nombre_subcategoria: "",
    descripcion: "",
    categoriumId: null,
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    if (name === "nombre_categoria") {
      var ca = categoria.find((f) => f.nombre_categoria === e.target.value);
      var final = ca.id;
      setCate({
        ...cate,
        [name]: target.value,
        id: final,
      });
    }

    if (name === "nombre_subcategoria") {
      var ca = categoria.find((f) => f.nombre_categoria === e.target.value);
      var final = cate.id;
      setSubcate({
        ...subcate,
        categoriumId: final,
        [name]: target.value,
      });
    }
    if (name === "descripcion") {
      setSubcate({
        ...subcate,
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

    if (!categoria.includes(subcate.nombre_subcategoria)) {
      alert("Sub-Categoría de producto existente");
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
        <form
          className="formSUB"
          noValidate
          onChange={(e) => ChangeInput(e)}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="divFormCAT">
            <div>
              <label className="text-label">Categoría</label>
              <select
                name="nombre_categoria"
                className="selectTransAgregar"
                value={cate.nombre_categoria}
                onChange={(e) => ChangeInput(e)}
              >
                {categoria.map((f) => (
                  <option value={f.nombre_categoria}>
                    {f.nombre_categoria}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
          <button className="btn6" type="submit">
            Agregar Sub-Categoría
          </button>
        </form>
      </div>
    </>
  );
}

export default Subcate;
