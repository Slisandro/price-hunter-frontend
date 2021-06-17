import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getFamilia,
  getCategoria,
  categoriaPost,
} from "../../../Redux/actions";

function Cate({ setSwitcher }) {
  const dispatch = useDispatch();
  const [buttonCAT, setButtonCAT] = useState(false);
  const familia = useSelector((store) => store.familia);
  const categoria = useSelector((store) => store.categoria);

  const [fam, setFam] = useState({
    nombre_familia: "",
    descripcion: "",
    id: null,
  });

  useEffect(() => {
    dispatch(getFamilia());
    dispatch(getCategoria());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [cate, setCate] = useState({
    nombre_categoria: "",
    descripcion: "",
    familiumId: null,
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    if (name === "nombre_familia") {
      var fa = familia.find((f) => f.nombre_familia === e.target.value);
      // console.log(fa.id);
      var final = fa.id;
      setFam({
        ...fam,
        [name]: target.value,
        id: final,
      });
    }
    if (name === "nombre_categoria") {
      var fa = familia.find((f) => f.nombre_familia === e.target.value);
      var final = fam.id;
      setCate({
        ...cate,
        [name]: target.value,
        familiumId: final,
      });
    }
    if (name === "descripcion") {
      setCate({
        ...cate,
        [name]: target.value,
      });
    }
    console.log(cate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaCategoria = {
      nombre_categoria: cate.nombre_categoria,
      descripcion: cate.descripcion,
      familiumId: cate.familiumId,
    };

    console.log(nuevaCategoria);

    if (!nuevaCategoria.nombre_categoria) {
      alert("Por favor, ingrese una categoria de producto");
      return;
    }

    if (!categoria.includes(cate.nombre_categoria)) {
      alert("Categoría de producto existente");
      return;
    }

    dispatch(categoriaPost(nuevaCategoria));

    e.target.reset();
    alert("Categoría agregada con éxito!");

    setCate({
      nombre_categoria: "",
      descripcion: "",
      familiumId: "",
    });
  };

  return (
    <>
      <div className="divCAT">
        <h6 id="title3">Categoría</h6>
        {/* <button className="btn4" onClick={handleButtonCAT}>
          Categoría Existente
        </button> */}
        <>
          <form
            className="formFAM"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="divFormFAM">
              <div>
                <label className="text-label">Familia</label>
                <select
                  name="nombre_familia"
                  className="selectTransAgregar"
                  value={fam.nombre_familia}
                  onChange={(e) => ChangeInput(e)}
                >
                  {familia.map((f) => (
                    <option value={f.nombre_familia}>{f.nombre_familia}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="divFormCAT">
              <div>
                <label className="text-label">Categoría</label>
                <input
                  value={cate.nombre_categoria}
                  name="nombre_categoria"
                  className="inp"
                  placeholder="Agregar Categoría"
                ></input>
              </div>
            </div>
            <div className="divFormCAT">
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
            <button className="btn4" type="submit">
              Agregar Categoría
            </button>
          </form>
        </>
      </div>
    </>
  );
}

export default Cate;
