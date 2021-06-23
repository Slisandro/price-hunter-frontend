import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putMoneda, getMoneda } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
// import "./FormUnidadMedida.css";

function PutMonedas() {
  const dispatch = useDispatch();
  const moneda = useSelector((store) => store.moneda);

  const [state, setState] = useState({
    codigo_moneda: "",
    nombre_moneda: "",
    simbolo: ""
  });

  useEffect(() => {
    dispatch(getMoneda());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "nombre_moneda") {
      var mon = moneda.find((f) => f.nombre_moneda === e.target.value);
      var final = mon.codigo_moneda;
      setState({
        ...state,
        [name]: target.value,
        codigo_moneda: final
      });
    } else if (name === "nuevo_nombre_moneda") {
      setState({
        ...state,
        [name]: target.value,
      });
    }
    // else if (name === "simbolo") {
    //   setState({
    //     ...state,
    //     [name]: target.value,
    //   });
    // }
    else if (name === "codigo_moneda") {
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
    const nuevaMoneda = {
      nombre_moneda: state.nuevo_nombre_moneda,
      codigo_moneda: state.codigo_moneda,
      simbolo: state.simbolo
    };

    // if (!nuevaUM.codigo_unidad_medida) {
    //   alert("Por favor, ingrese el codigo de la moneda");
    //   return;
    // }
    // if (nuevaUM.codigo_unidad_medida !== 3) {
    //   alert("Debe ingresar 3 letras...");
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

    console.log(nuevaMoneda)

    dispatch(putMoneda(nuevaMoneda));
    e.target.reset();
    alert("La Moneda fue agregada con éxito!");

    setState({
     codigo_moneda: "",
    nombre_moneda: "",
    simbolo: ""
    });
  };

  return (
    <>
      <div className="contenedorFAM">
        <header>
          <h1 id="title">Modificar Moneda</h1>
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
             <select name="nombre_moneda">
                  <option></option>
                  {moneda.map((u) => (
                    <option value={u.nombre_moneda}>{u.nombre_moneda}</option>
                  ))}
                </select>
            {/* <input
              className="inp"
              type="text"
              name="nombre_moneda"
              autoComplete="off"
              max="0"
              {...register("nombre_moneda", {
                required: {
                  value: true,
                  message: "Debe ingresar una moneda",
                },
                maxLength: {
                  value: 15,
                  message: "El nombre de la moneda debe tener menos de quince letras!",
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
            <span className="err">{errors?.nombre_moneda?.message}</span>
          </div>
          <div className="divForm">
            <div>
              <label className="text-label">Moneda</label>
              <input
                className="inp"
                type="text"
                name="nuevo_nombre_moneda"
                autoComplete="off"
                max="0"
                {...register("nuevo_nombre_moneda", {
                  required: {
                    value: true,
                    message: "Debe ingresar una moneda ",
                  },
                  max: {
                    value: 0,
                    message: "La unidad no puede comenzar con numeros",
                  },
                })}
              />
              <span className="err">
                {errors?.codigo_moneda?.message}
              </span>
            </div>
            <button className="agregarModal" type="submit">
              Modificar
            </button>
          </div>
        </form>
      </div>
      <div className="contenedorActualesUM">
        Monedas Actuales
        <div className="tiposUM">
          {moneda.map((u) => (
            <span className="spansUM">{u.nombre_moneda}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export default PutMonedas;
