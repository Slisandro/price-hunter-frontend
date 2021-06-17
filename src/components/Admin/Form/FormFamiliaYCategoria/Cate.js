import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategoria, categoriaPost } from "../../../Redux/actions";

function Cate({ setSwitcher }) {
  const dispatch = useDispatch();
  const [buttonCAT, setButtonCAT] = useState(false);
  const familia = useSelector((store) => store.familia);
  const categoria = useSelector((store) => store.categoria);

  //   const [fam, setFam] = useState()

  useEffect(() => {
    dispatch(getCategoria());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButtonCAT = (e) => {
    e.preventDefault();
    setButtonCAT(!buttonCAT);
  };

  const [cate, setCate] = useState({
    nombre_categoria: "",
    descripcion: "",
    // familiumId: null,
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    if (name === "nombre_categoria") {
      setCate({
        ...cate,
        // familiumId: target.value,
        [name]: target.value,
        // id: finalCat,
      });
      //   // console.log(cate);
      // } else if (name === "nombre_subcategoria") {
      //   setSubcate({
      //     ...subcate,
      //     categoriumId: fam.id,
      //     [name]: target.value,
      //   });
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
    };

    console.log(nuevaCategoria);

    if (!nuevaCategoria.nombre_categoria) {
      alert("Por favor, ingrese una categoria de producto");
      return;
    }

    dispatch(categoriaPost(nuevaCategoria));

    e.target.reset();
    alert("Categoría agregada con éxito!");

    setCate({
      nombre_categoria: "",
      descripcion: "",
    });
  };

  return (
    <>
      <div className="divCAT">
        <h6 id="title3">Categoría</h6>
        <button className="btn4" onClick={handleButtonCAT}>
          Agregar Categoría
        </button>
        <button className="btn4" onClick={handleButtonCAT}>
          Categoría Existente
        </button>
        {buttonCAT ? (
          <form
            // id="survey-form"
            className="formCAT"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="divFormCAT">
              <div>
                <label className="text-label">Categoría</label>
                <select
                  name="nombre_categoria"
                  className="selectTrans"
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
                <label className="text-label-desc">* Descripción</label>
                <input
                  className="btm-desc"
                  type="text"
                  name="descripcion"
                  value={cate.descripcion}
                ></input>
              </div>
            </div>
            <button type="submit">Agregar</button>
          </form>
        ) : (
          <form
            // id="survey-form"
            className="formCAT"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={(e) => handleSubmit(e)}
          >
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
            <button type="submit">Agregar</button>
          </form>
        )}
      </div>
      ;
    </>
  );
}

export default Cate;
