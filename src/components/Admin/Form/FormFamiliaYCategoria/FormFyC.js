import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategoria,
  getFamilia,
  familiaPost,
  categoriaPost,
  subcategoriaPost,
} from "../../../Redux/actions";
// import { Link } from "react-router-dom";
// import logo from "../../assets/aguila.png";
import "./FormFyC.css";

function FormFyC() {
  const dispatch = useDispatch();
  const categoria = useSelector((store) => store.categoria);
  const familia = useSelector((store) => store.familia);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  useEffect(() => {
    dispatch(getCategoria());
    dispatch(getFamilia());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [fam, setFam] = useState({
    nombre_familia: "",
    descripción: "",
  });

  const [cate, setCate] = useState({
    nombre_categoria: "",
    descripción: "",
  });

  const [subcate, setSubcate] = useState({
    nombre_subcategoria: "",
    descripción: "",
    categoriumId: getRandomInt(60, 1000),
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    console.log(e.target.value);
    console.log(name);
    if (name === "nombre_familia") {
      setFam({
        ...fam,
        [name]: target.value,
      });
    } else if (name === "nombre_categoria") {
      setCate({
        ...cate,
        [name]: target.value,
      });
    } else if (name === "nombre_subcategoria") {
      setSubcate({
        ...subcate,
        [name]: target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const nuevaFamilia = {
    //   nombre_familia: fam.nombre_familia,
    //   descripcion: fam.descripcion,
    // };

    // const nuevaCategoria = {
    //   nombre_categoria: cate.nombre_categoria,
    //   descripcion: cate.descripcion,
    // };

    const nuevaSubcate = {
      nombre_subcategoria: subcate.nombre_subcategoria,
      descripcion: subcate.descripcion,
      categoriumId: subcate.categoriumId,
    };

    // console.log(nuevaFamilia);
    // console.log(nuevaCategoria);
    console.log(nuevaSubcate);

    if (!nuevaSubcate.nombre_subcategoria) {
      alert("Por favor, ingrese una sub-categoria de producto");
      return;
    }

    // dispatch(familiaPost(nuevaFamilia));
    // dispatch(categoriaPost(nuevaCategoria));
    dispatch(subcategoriaPost(nuevaSubcate));

    e.target.reset();
    alert("Familia y Categorías agregadas con éxito!");

    setFam({
      nombre_familia: "",
      descripción: "",
    });
    setCate({
      nombre_categoria: "",
      descripción: "",
    });
    setSubcate({
      nombre_subcategoria: "",
      descripción: "",
      categoriumId: "",
    });
  };

  return (
    <>
      <div className="containerForm">
        <header>
          <h1 id="title">Agregar Sub-Categorías</h1>
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
              <select
                name="nombre_familia"
                value={fam.familia}
                onChange={(e) => ChangeInput(e)}
              >
                {familia.map((f) => (
                  <option value={f.nombre_familia}>{f.nombre_familia}</option>
                ))}
              </select>
              {/* <input
                className="btm"
                type="text"
                name="nombre_familia"
                value={fam.familia}
              ></input> */}
            </div>
            <div className="divForm">
              <div>
                <label className="text-label-desc">* Descripción</label>
                <input
                  className="btm-desc"
                  type="text"
                  name="descripcion"
                  value={fam.descripcion}
                ></input>
              </div>
            </div>
            <div className="divForm">
              <div>
                <label className="text-label">Categoría</label>
                <select
                  name="nombre_categoria"
                  value={fam.familia}
                  onChange={(e) => ChangeInput(e)}
                >
                  {categoria.map((f) => (
                    <option value={f.nombre_categoria}>
                      {f.nombre_categoria}
                    </option>
                  ))}
                </select>
                {/* <input
                  className="btm"
                  type="text"
                  name="nombre_categoria"
                  value={cate.nombre_categoria}
                ></input> */}
              </div>
            </div>
            <div className="divForm">
              <div>
                <label className="text-label-desc">* Descripción</label>
                <input
                  className="btm-desc"
                  type="text"
                  name="descripcion"
                  value={cate.descripcion}
                ></input>
              </div>
            </div>

            <div className="divForm">
              <div>
                <label className="text-label">Sub-Categoría</label>
                <input
                  className="btm"
                  type="text"
                  name="nombre_subcategoria"
                  value={subcate.nombre_subcategoria}
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

export default FormFyC;
