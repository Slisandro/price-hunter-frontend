import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriaPorId, getSubcategoriaPorId, putSubCategoria, getSubcategoria, getFamilia,  } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
// import "./FormUnidadMedida.css";

function PutSubCate() {
  const dispatch = useDispatch();
  const categoria = useSelector((store) => store.categoria);
  const subcategoria = useSelector((store) => store.subcategoria);
  const familia = useSelector((store) => store.familia);

  const [state, setState] = useState({
    nombre_subcategoria: "",
  });

  useEffect(() => {
    // dispatch(getCategorias());
    // dispatch(getSubcategoria())
    dispatch(getFamilia())
  }, [dispatch]);

  // console.log(familia, categoria);

  const ChangeInput = (e) => {
    const value= e.target.value;
    const name = e.target.name;

    console.log(value, name)
    if(name === "Familia") dispatch(getCategoriaPorId(value))
    if(name === "Categoria") dispatch(getSubcategoriaPorId(value))
  };
  

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data, e) => {
    // const subcategoriaModificada = {
    //   nombre_categoria: state.nombre_categoria,
    //   nombre_subcategoria: state.nombre_subcategoria,
    // };

    // if (!subcategoriaModificada.nombre_categoria) {
    //   alert("Por favor, ingrese el codigo de la moneda");
    //   return;
    // }
    // if (nuevaUM.codigo_unidad_medida !== 3) {
    //   alert("Debe ingresar 3 letras...");
    //   return;
    // }
    // if (!isNaN(parseInt(subcategoriaModificada.codigo_unidad_medida))) {
    //   alert("El codigo solo puede contener letras");
    //   return;
    // }
    // if (!subcategoriaModificada.nombre_unidad) {
    //   alert("Por favor, ingrese el nombre de la moneda");
    //   return;
    // }
    // if (!isNaN(parseInt(nuevasubcategoriaModificada.nombre_categoria))) {
    //   alert("El nombre solo puede contener letras");
    //   return;
    // }
    console.log(data)

    dispatch(putSubCategoria(data));
    e.target.reset();
    alert("La Unidad de Medida fue agregada con éxito!");

    // setState({
    //   codigo_unidad_medida: "",
    //   nombre_unidad: "",
    // });
  };

  return (
    <>
      <div className="contenedorFAM">
        <header>
          <h1 id="title">Modificar Sub-Categoría</h1>
        </header>
        <form
          id="survey-form"
          className="form"
          noValidate
          onChange={(e) => ChangeInput(e)}
          // {...(e) => ChangeInpu(e)}
          
          onSubmit={handleSubmit(submit)}
        >

<div>
            <label className="text-label">Familia</label>
            <select
              name="Familia"
              className="inp"
              onChange={(e) => ChangeInput(e)}
              
              {...register("Familia", {
                required: {
                  value: true,
                  message: "Debe seleccionar una Familia de Productos",
                },
              })}
            >
              <option></option>
              {familia.map((f, index) => (
                <option key={index} value={f.id}>
                  {f.nombre_familia}
                </option>
              ))}
            </select>
            <span className="err">{errors?.Familia?.message}</span>
          </div>

          <div>
            <label className="text-label">Categorias</label>
            <select
              name="Categoria"
              className="inp"
              onChange={(e) => ChangeInput(e)}
              
              {...register("Categoria", {
                required: {
                  value: true,
                  message: "Debe seleccionar una Familia de Productos",
                },
              })}
            >
              <option></option>
              {categoria.map((f, index) => (
                <option key={index} value={f.id}>
                  {f.nombre_categoria}
                </option>
              ))}
            </select>
            <span className="err">{errors?.Familia?.message}</span>
          </div>


          <div>
            <label className="text-label">Subcategoria</label>
            <select
              name="Subcategoria"
              className="inp"
              onChange={(e) => ChangeInput(e)}
              
              {...register("Subcategoria", {
                required: {
                  value: true,
                  message: "Debe seleccionar una Familia de Productos",
                },
              })}
            >
              <option></option>
              {subcategoria.map((f, index) => (
                <option key={index} value={f.id}>
                  {f.nombre_subcategoria}
                </option>
              ))}
            </select>
            <span className="err">{errors?.Subcategoria?.message}</span>
          </div>

          <div>
            <label className="text-label">Nombre</label>
            <input
              className="inp"
              type="text"
              name="nombre_unidad"
              autoComplete="off"
              max="0"
              {...register("nombre_unidad", {
                required: {
                  value: true,
                  message: "Debe ingresar un nombre ",
                },
                maxLength: {
                  value: 15,
                  message: "El nombre debe tener menos de quince letras!",
                },
                minLength: {
                  value: 3,
                  message: "El nombre debe tener tres letras!",
                },
                max: {
                  value: 0,
                  message: "El nombre no puede comenzar con numeros",
                },
              })}
            />
            <span className="err">{errors?.nombre_unidad?.message}</span>
          </div>
          <div className="divForm">
            <div>
              <label className="text-label">Sub-Categoría</label>
              <input
                className="inp"
                type="text"
                name="codigo_unidad_medida"
                autoComplete="off"
                max="0"
                {...register("codigo_unidad_medida", {
                  required: {
                    value: true,
                    message: "Debe ingresar una unidad ",
                  },
                  maxLength: {
                    value: 4,
                    message: "la unidad no debe tener mas de cuatro letras!",
                  },
                  max: {
                    value: 0,
                    message: "La unidad no puede comenzar con numeros",
                  },
                })}
              />
              <span className="err">
                {errors?.codigo_unidad_medida?.message}
              </span>
            </div>
            <button className="agregarModal" type="submit">
              Modificar
            </button>
          </div>
        </form>
      </div>
      <div className="contenedorActualesUM">
        Sub-Categorías Actuales
        <div className="tiposUM">
          {categoria.map((u) => (
            <span className="spansUM">{u.nombre_categoria}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export default PutSubCate;
