import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategoria,
  getCategorias,
  subcategoriaPost,
  getSubcategoria,
} from "../../../Redux/actions";
import { useForm } from "react-hook-form";

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

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data, e) => {
 

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
          onSubmit={handleSubmit(submit)}
        >
          <div className="divFormFamilia">
            <div>
              <label className="text-label">Categoría</label>
              <select
                name="nombre_categoria"
                className="selectTransAgregar"
                onChange={(e) => ChangeInput(e)}
                {...register("nombre_categoria", {
                  required: {
                    value: true,
                    message: "Debe seleccionar una categoria",
                  },
                })}
              >
                <option></option>
                {categoria.map((f) => (
                  <option value={f.nombre_categoria}>
                    {f.nombre_categoria}
                  </option>
                ))}
              </select>
              <span className="err">
                        {errors?.nombre_categoria?.message}
                      </span>
            </div>
          </div>
          <div className="divFormFamilia">
            <div>
              <label className="text-label">Sub-Categoría</label>
              <input
                value={subcate.nombre_subcategroia}
                name="nombre_subcategoria"
                className="inp"
                max ='0'
                      autoComplete="off"
                      {...register("nombre_subcategoria", {
                        required: {
                          value: true,
                          message: "Debe ingresar un nombre ",
                        },
                        maxLength: {
                          value: 15,
                          message:
                            "El nombre no debe tener mas de quince letras!",
                        },
                        minLength: {
                          value: 3,
                          message: "El nombre debe al menos tener tres letras!",
                        },
                        max: {
                          value: 0,
                          message: "El nombre no puede comenzar con numeros",
                        },
                      })}
                    />
                    <span className="err">{errors?.nombre_subcategoria?.message}</span>
            </div>
          </div>
          <div className="divFormFamilia">
            <div>
              <label className="text-label-desc">* Descripción</label>
              <input
                className="btm-desc"
                type="text"
                name=""
                autoComplete="off"
                  max ='0'
                        {...register("descripcion", {
                          // required: {
                          //   value: true,
                          //   message: "Debe ingresar un descripcion ",
                          // },
                          maxLength: {
                            value: 256,
                            message:
                              "La descripcion no debe tener mas de 256 caracteres!",
                          },
                          minLength: {
                            value: 5,
                            message: "La descripcion debe tener al menos cinco letras!",
                          },
                          max: {
                            value: 0,
                            message: "La descripcion no puede comenzar con numeros",
                          },
                        })}
                      />
                      <span className="err">{errors?.descripcion?.message}</span>
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
