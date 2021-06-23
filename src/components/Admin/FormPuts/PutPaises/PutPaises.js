import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaises, putPais } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
// import "./FormUnidadMedida.css";

function PutPaises() {
  const dispatch = useDispatch();
  const paises = useSelector((store) => store.paises);

  const [state, setState] = useState({
    nombre_pais: "",
    codigo_alfa: "",
    nombre_nuevo_pais: "",
  });

  useEffect(() => {
    dispatch(getPaises());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // var mapeado = paises.map((p) => p.codigo_alfa);
  // console.log(mapeado);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "nombre_pais") {
      var pai = paises.find((f) => f.nombre_pais === e.target.value);
      var final = pai.codigo_alfa;
      // console.log(final);
      setState({
        ...state,
        [name]: target.value,
        codigo_alfa: final,
      });
    } else if (name === "nombre_nuevo_pais") {
      setState({
        ...state,
        [name]: target.value,
      });
    }
    console.log(state);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data, e) => {
    const paisModificado = {
      nombre_pais: state.nombre_nuevo_pais,
      codigo_alfa: state.codigo_alfa,
    };

    // if (!paisModificado.nombre_pais) {
    //   alert("Por favor, ingrese el pais a modificar");
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

    dispatch(putPais(paisModificado));
    e.target.reset();
    alert("El país fue modificado con éxito!");

    setState({
      nombre_pais: "",
      codigo_alfa: "",
      nombre_nuevo_pais: "",
    });
  };

  return (
    <>
      <div className="contenedorFAM">
        <header>
          <h1 id="title">Modificar Países</h1>
        </header>
        <form
          id="survey-form"
          className="form"
          noValidate
          onChange={(e) => ChangeInput(e)}
          onSubmit={handleSubmit(submit)}
        >
          <div className="divForm">
            <div>
              <label className="text-label">País</label>
              <select name="nombre_pais">
                <option></option>
                {paises.map((u) => (
                  <option value={u.nombre_pais}>{u.nombre_pais}</option>
                ))}
              </select>
              <div>
                <label className="text-label">Nuevo País</label>
                <input
                  className="inp"
                  type="text"
                  name="nombre_nuevo_pais"
                  autoComplete="off"
                  max="0"
                  {...register("nombre_nuevo_pais", {
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
                {/* <span className="err">{errors?.nombre_unidad?.message}</span> */}
              </div>
              {/* <span className="err">
                {errors?.codigo_unidad_medida?.message}
              </span> */}
            </div>
            <button className="agregarModal" type="submit">
              Modificar
            </button>
          </div>
        </form>
      </div>
      <div className="contenedorActualesUM">
        Países Actuales
        <div className="tiposUM">
          {paises.map((u) => (
            <span className="spansUM">{u.nombre_pais}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export default PutPaises;
