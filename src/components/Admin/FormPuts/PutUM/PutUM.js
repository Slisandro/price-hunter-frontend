import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putUM, getUnidadMedida } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
// import "./FormUnidadMedida.css";

function PutUM() {
  const dispatch = useDispatch();
  const unidad = useSelector((store) => store.unidad_medida);

  const [state, setState] = useState({
    codigo_unidad_medida: "",
    nombre_unidad: "",
  });

  useEffect(() => {
    dispatch(getUnidadMedida());
  }, [dispatch]);

  // console.log(unidad)
  // const ChangeInput = (e) => {
  //   const target = e.target;
  //   const name = target.name;
  //   console.log(e.target.value);

  //   if (name === "codigo_unidad_medida") {
  //     setState({
  //       ...state,
  //       [name]: target.value,
  //     });
  //   } else if (name === "nombre_unidad") {
  //     setState({
  //       ...state,
  //       [name]: target.value,
  //     });
  //   }
  // };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data, e) => {
    // const nuevaUM = {
    //   codigo_unidad_medida: state.codigo_unidad_medida,
    //   nombre_unidad: state.nombre_unidad,
    // };
    // console.log(data)

    // if (!nuevaUM.codigo_unidad_medida) {
    //   alert("Por favor, ingrese el codigo de la moneda");
    //   return;
    // }
    // // if (nuevaUM.codigo_unidad_medida !== 3) {
    // //   alert("Debe ingresar 3 letras...");
    // //   return;
    // // }
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

    dispatch(putUM(data));
    e.target.reset();
    alert("La Unidad de Medida fue agregada con éxito!");

    setState({
      codigo_unidad_medida: "",
      nombre_unidad: "",
    });
  };

  return (
    <>
      <div className="contenedorFAM">
        <header>
          <h1 id="title">Modificar Unidad de Medida</h1>
        </header>
        <form
          id="survey-form"
          className="form"
          noValidate
          // onChange={(e) => ChangeInput(e)}
          onSubmit={handleSubmit(submit)}
        >
          <div>
            <label className="text-label">Nombre</label>
            <select
              name="codigo_unidad_medida"
              className="codigo_unidad_medida"
              // value={paises.nombre_region}
              // onChange={(e) => ChangeInput(e)}
              {...register("codigo_unidad_medida", {
                required: {
                  value: true,
                  message: "Debe seleccionar una unidad de medida",
                },
              })}
            >
              <option></option>
              {unidad.map((f) => (
                <option value={f.codigo_unidad_medida}>{f.nombre_unidad}</option>
              ))}
            </select>
            <span className="err">{errors?.codigo_unidad_medida?.message}</span>
          </div>
          <div className="divForm">
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
                    message: "Debe ingresar un nombre nuevo ",
                  },
                  maxLength: {
                    value: 20,
                    message: "El nombre no debe tener mas de veinte caracteres",
                  },
                  minLength: {
                    value: 3,
                    message: "El nombre no debe tener menos de tres caracteres",
                  },
                  max: {
                    value: 0,
                    message: "El nombre no puede comenzar con numeros",
                  },
                })}
              />
              <span className="err">
                {errors?.nombre_unidad?.message}
              </span>
            </div>
            <button className="agregarModal" type="submit">
              Modificar
            </button>
          </div>
        </form>
      </div>
      {/* <div className="contenedorActualesUM">
        Unidades de Medida Actuales
        <div className="tiposUM">
          {unidad_medida.map((u) => (
            <span className="spansUM">{u.nombre_unidad}</span>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default PutUM;
