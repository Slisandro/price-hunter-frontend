import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategoria,
  getCategorias,
  subcategoriaPost,
  getSubcategoria,
} from "../../../Redux/actions";

function Subcate({ setSwitcher }) {
  const dispatch = useDispatch();
  const categoria = useSelector((store) => store.categoria);
  const categorias = useSelector((store) => store.categorias);
  const subcategoria = useSelector((store) => store.subcategoria);

  // var mapeado = categorias.map((c) => c);
  // var mapeado1 = mapeado.map((array) => array);
  // var mapeado2 = mapeado1.map((a) => a);
  // var mapeado3 = mapeado2.map((b) => b);
  // var mapeado4 = mapeado3.map((b) => b.categoria);
  // var mapeado5 = mapeado4.map((c) => c);
  // var mapeado6 = mapeado5.map((d) => d);
  // var mapeado7 = mapeado6.map((e) => e);

  // var fin = mapeado7.forEach((element) => {
  //   element.map((g) => g);
  //   console.log(element);
  // });

  // console.log(fin);

  useEffect(() => {
    dispatch(getCategoria());
    dispatch(getCategorias());
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

    if (categoria.includes(subcate.nombre_subcategoria)) {
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
      <div className="contenedorFamilia">
        <h6 id="titleFam">Sub-Categoría</h6>
        <form
          className="formFamilia"
          noValidate
          onChange={(e) => ChangeInput(e)}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="divFormFamilia">
            <div>
              <label className="text-label">Categoría</label>
              <select
                name="nombre_categoria"
                className="selectTransAgregar"
                value={cate.nombre_categoria}
                onChange={(e) => ChangeInput(e)}
              >
                <option></option>
                {categoria.map((f) => (
                  <option value={f.nombre_categoria}>
                    {f.nombre_categoria}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="divFormFamilia">
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
          <div className="divFormFamilia">
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
          <button className="agregarModal" type="submit">
            Agregar Sub-Categoría
          </button>
        </form>
      </div>
    </>
  );
}

export default Subcate;
