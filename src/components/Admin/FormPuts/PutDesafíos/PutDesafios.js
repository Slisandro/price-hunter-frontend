import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { unidadDeMedida, getUnidadMedida } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
// import "./FormUnidadMedida.css";

function PutDesafíos() {
  const dispatch = useDispatch();
  const unidad_medida = useSelector((store) => store.unidad_medida);

  const [state, setState] = useState({
    codigo_unidad_medida: "",
    nombre_unidad: "",
  });

  useEffect(() => {
    // dispatch(getUnidadMedida());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(unidad_medida);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "codigo_unidad_medida") {
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "nombre_unidad") {
      setState({
        ...state,
        [name]: target.value,
      });
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data, e) => {
    const nuevaUM = {
      codigo_unidad_medida: state.codigo_unidad_medida,
      nombre_unidad: state.nombre_unidad,
    };

    if (!nuevaUM.codigo_unidad_medida) {
      alert("Por favor, ingrese el codigo de la moneda");
      return;
    }
    // if (nuevaUM.codigo_unidad_medida !== 3) {
    //   alert("Debe ingresar 3 letras...");
    //   return;
    // }
    if (!isNaN(parseInt(nuevaUM.codigo_unidad_medida))) {
      alert("El codigo solo puede contener letras");
      return;
    }
    if (!nuevaUM.nombre_unidad) {
      alert("Por favor, ingrese el nombre de la moneda");
      return;
    }
    if (!isNaN(parseInt(nuevaUM.nombre_unidad))) {
      alert("El nombre solo puede contener letras");
      return;
    }

    // dispatch(unidadDeMedida(nuevaUM));
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
          <h1 id="title">Modificar Desafíos</h1>
        </header>
        <form
          id="survey-form"
          className="form"
          noValidate
          onChange={(e) => ChangeInput(e)}
          onSubmit={handleSubmit(submit)}
        >
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
              <label className="text-label">Desafío</label>
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
        Desafíos Actuales
        <div className="tiposUM">
          {unidad_medida.map((u) => (
            <span className="spansUM">{u.nombre_unidad}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export default PutDesafíos;
