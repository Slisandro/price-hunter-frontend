import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putCategoria, getCategoria } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
// import "./FormUnidadMedida.css";

function PutCategorías() {
  const dispatch = useDispatch();
  const unidad_medida = useSelector((store) => store.unidad_medida);
  const categoria = useSelector((store) => store.categoria);

  const [state, setState] = useState({
    nombre_categoria: "",
    descripcion: "",
    id: null,
  });

  useEffect(() => {
    dispatch(getCategoria());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(mapeado);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "nombre_categoria") {
      var cat = categoria.find((f) => f.nombre_categoria === e.target.value);
      var final = cat.id;
      console.log(final);
      setState({
        ...state,
        [name]: target.value,
        id: final,
      });
    } else if (name === "nuevo_nombre_categoria") {
      setState({
        ...state,
        [name]: target.value,
      });
      console.log([name]);
    } else if (name === "descripcion") {
      setState({
        ...state,
        [name]: target.value,
      });
    }
    // console.log(state);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data, e) => {
    const categoriaModificada = {
      nombre_categoria: state.nuevo_nombre_categoria,
      descripcion: state.descripcion,
      id: state.id,
    };

    // if (!categoriaModificada.nombre_categoria) {
    //   alert("Por favor, ingrese el codigo de la nueva categoría");
    //   return;
    // }
    // if (!categoriaModificada.nuevo_nombre_categoria) {
    //   alert("Por favor, ingrese el codigo de la nueva categoría");
    //   return;
    // }
    // if (!isNaN(parseInt(nuevaUM.codigo_unidad_medida))) {
    //   alert("El codigo solo puede contener letras");
    //   return;
    // }
    // if (!nuevaUM.nombre_unidad) {
    //   alert("Por favor, ingrese el nombre de la moneda");
    //   return;
    // }
    // if (!isNaN(parseInt(nuevaUM.nombre_unidad))) {
    //   alert("El nombre solo puede contener letras");
    //   return;
    // }
    console.log(categoriaModificada);

    dispatch(putCategoria(categoriaModificada));
    e.target.reset();
    alert("La Categoría fue modificada con éxito!");

    setState({
      nombre_categoria: "",
      descripcion: "",
      id: null,
    });
  };

  return (
    <>
      <div className="contenedorFAM">
        <header>
          <h1 id="title">Modificar Categoría</h1>
        </header>
        <form
          id="survey-form"
          className="form"
          noValidate
          onChange={(e) => ChangeInput(e)}
          onSubmit={handleSubmit(submit)}
        >
          <div>
            <label className="text-label">Categoría</label>
            <select name="nombre_categoria">
              {categoria.map((u) => (
                <option value={u.nombre_categoria}>{u.nombre_categoria}</option>
              ))}
            </select>
            {/* <input
              className="inp"
              type="text"
              name="nombre_categoria"
              autoComplete="off"
              max="0"
              {...register("nombre_categoria", {
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
            /> */}
            {/* <span className="err">{errors?.nombre_unidad?.message}</span> */}
          </div>
          <div className="divForm">
            <div>
              <label className="text-label">Nuevo Nombre</label>
              <input
                className="inp"
                type="text"
                name="nuevo_nombre_categoria"
                autoComplete="off"
                max="0"
                {...register("nuevo_nombre_categoria", {
                  required: {
                    value: true,
                    message: "Debe ingresar una categoría ",
                  },
                  // maxLength: {
                  //   value: 4,
                  //   message: "la unidad no debe tener mas de cuatro letras!",
                  // },
                  max: {
                    value: 0,
                    message: "La categoría no puede comenzar con numeros",
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
        Categorías Actuales
        <div className="tiposUM">
          {categoria.map((u) => (
            <span className="spansUM">{u.nombre_categoria}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export default PutCategorías;
