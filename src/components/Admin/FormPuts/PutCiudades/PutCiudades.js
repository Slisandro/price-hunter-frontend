import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putCiudad, getCiudad, mostrarError } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
// import "./FormUnidadMedida.css";

function PutCiudades() {
  const dispatch = useDispatch();
  const ciudad = useSelector((store) => store.ciudad);

  const [state, setState] = useState({
    nombre_ciudad: "",
    nuevo_nombre_ciudad: "",
  });

  useEffect(() => {
    dispatch(getCiudad());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(ciudad);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "nombre_ciudad") {
      var ciu = ciudad.find((f) => f.nombre_ciudad === e.target.value);
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "nuevo_nombre_ciudad") {
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
    const ciudadModificada = {
      nombre_pais: state.nuevo_nombre_pais,
    };

    // if (!paisModificado.state.nuevo_nombre_pais) {
    //   alert("Por favor, ingrese el nombre del pais");
    //   return;
    // }
    // if (nuevaUM.codigo_unidad_medida !== 3) {
    //   alert("Debe ingresar 3 letras...");
    //   return;
    // }
    /*  if (!isNaN(parseInt(paisModificado.nombre_pais))) {
      alert("El codigo solo puede contener letras");
      return; */
    /*  if (!paisModificado.nombre_unidad) {
      alert("Por favor, ingrese el nombre de la moneda");
      return;
    }
    if (!isNaN(parseInt(nuevaUM.nombre_unidad))) {
      alert("El nombre solo puede contener letras");
      return;
    }
 */
    dispatch(putCiudad(ciudadModificada));
    e.target.reset();
    alert("El nuevo nombre de la ciudad fue agregado con exito");

    setState({
      nombre_pais: "",
      nuevo_nombre_pais: "",
    });
  };

  return (
    <>
      <div className="contenedorFAM">
        <header>
          <h1 id="title">Modificar Ciudad</h1>
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
            <span className="err">{errors?.nombre_pais?.message}</span>
          </div>
          <div className="divForm">
            <div>
              <label className="text-label">Ciudad</label>
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
        Ciudades Actuales
        <div className="tiposUM">
          {ciudad.map((u) => (
            <span className="spansUM">{u.nombre_ciudad}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export default PutCiudades;
