import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategorias,
  familia,
  categoria,
  subcategoria,
} from "../../../Redux/actions";
// import { Link } from "react-router-dom";
// import logo from "../../assets/aguila.png";
import "./FormFyC.css";

function FormFyC() {
  const dispatch = useDispatch();
  const nombre_familia = useSelector((store) => store.obj.nombre_familia);
  const nombre_categoria = useSelector((store) => store.obj.nombre_categoria);
  const Subcategoria = useSelector((store) => store.obj.Subcategoria);
  const categorias = useSelector((store) => store.categorias);

  useEffect(() => {
    dispatch(getCategorias());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapeado = categorias.map((familia) => familia.categoria);
  console.log(mapeado);

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
    categoriumId: 100,
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    // console.log(e.target.value);
    // console.log(name);
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
    // } else if{
    //   setFam({
    //     ...fam,
    //     [name]: target.value,
    //   });
    // }
  };
  // console.log(fam);
  // console.log(cate);
  // console.log(subcate);

  useEffect(() => {
    dispatch(getCategorias());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaFamilia = {
      nombre_familia: fam.nombre_familia,
      descripcion: fam.descripcion,
    };

    const nuevaCategoria = {
      nombre_categoria: cate.nombre_categoria,
      descripcion: cate.descripcion,
    };

    const nuevaSubcate = {
      nombre_subcategoria: subcate.nombre_subcategoria,
      descripcion: subcate.descripcion,
      categoriumId: subcate.categoriumId,
    };
    console.log(nuevaFamilia);
    console.log(nuevaCategoria);
    console.log(nuevaSubcate);

    if (!nuevaFamilia.nombre_familia) {
      alert("Por favor, ingrese una familia de producto");
      return;
    }
    if (!nuevaCategoria.nombre_categoria) {
      alert("Por favor, ingrese una categoria de producto");
      return;
    }
    if (!nuevaSubcate.nombre_subcategoria) {
      alert("Por favor, ingrese una sub-categoria de producto");
      return;
    }

    dispatch(familia(nuevaFamilia));
    dispatch(categoria(nuevaCategoria));
    dispatch(subcategoria(nuevaSubcate));

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
                name="nombre_familia"
                value={fam.familia}
              ></input>
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
                <input
                  className="btm"
                  type="text"
                  name="nombre_categoria"
                  value={cate.nombre_categoria}
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
