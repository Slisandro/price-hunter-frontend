import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { monedaPost, mostrarError, getMoneda } from "../../../Redux/actions";
import { useForm } from "react-hook-form";

import "./FormMonedaYum.css";

function FormMoneda() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    codigo_moneda: "",
    nombre_moneda: "",
    simbolo: "",
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    if (name === "codigo_moneda") {
      setState({
        ...state,
        [name]: target.value.toLocaleUpperCase(),
      });
    } else if (name === "nombre_moneda") {
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "simbolo") {
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

  const alerta = useSelector((store) => store.alerta);
  let moneda = useSelector((store) => store.moneda);

  useEffect(() => {
    dispatch(getMoneda());
  }, [dispatch]);

  const submit = (data, e) => {
    const nuevaMoneda = {
      codigo_moneda: state.codigo_moneda.toLocaleUpperCase(),
      nombre_moneda: state.nombre_moneda,
      simbolo: state.simbolo,
    };

    if (!isNaN(parseInt(nuevaMoneda.codigo_moneda))) {
      dispatch(
        mostrarError("El codigo solo puede contener letras", "alerta-error")
      );
      return;
    }

    if (!isNaN(parseInt(nuevaMoneda.nombre_moneda))) {
      dispatch(
        mostrarError("El nombre solo puede contener letras", "alerta-error")
      );
      return;
    }
    if (moneda.length > 0) {
      for (let i = 0; i < moneda.length; i++) {
        if (nuevaMoneda.codigo_moneda === moneda[i].codigo_moneda) {
          dispatch(mostrarError("La moneda ya existe", "alerta-error"));

          return;
        }
      }
    }
    if (nuevaMoneda.codigo_moneda.length > 0) {
      dispatch(monedaPost(state));
      e.target.reset();
      alert("La Moneda fue agregada con éxito!");
      dispatch(getMoneda());
      setState({
        codigo_moneda: "",
        nombre_moneda: "",
        simbolo: "",
      });
    } else {
      alert("Debe agregar datos!");
    }
  };

  return (
    <>
      <div className="contenedorFAM">
        <div>
          <header>
            <h1 id="title">Agregar Moneda</h1>
          </header>
          <form
            id="survey-form"
            className="form"
            // noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={handleSubmit(submit)}
          >
            {alerta ? (
              <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
            ) : null}
            <div className="divForm">
              <div>
                <label className="text-label">Codigo de Moneda</label>
                <input
                  // className="btm"
                  type="NaN"
                  className="inp"
                  name="codigo_moneda"
                  autoComplete="off"
                  {...register("codigo_moneda", {
                    required: {
                      value: true,
                      message: "Debe ingresar un Codigo de Moneda ",
                    },
                    maxLength: {
                      value: 3,
                      message: "El codigo debe tener tres letras!",
                    },
                    minLength: {
                      value: 3,
                      message: "El codigo debe tener tres letras!",
                    },
                  })}
                />

                <span className="err">{errors?.codigo_moneda?.message}</span>
              </div>

              <div>
                <label className="text-label">Nombre de la Moneda</label>
                <input
                  className="inp"
                  type="text"
                  max="0"
                  name="nombre_moneda"
                  autoComplete="off"
                  {...register("nombre_moneda", {
                    required: {
                      value: true,
                      message: "Debe ingresar un Nombre para la Moneda ",
                    },
                    maxLength: {
                      value: 10,
                      message:
                        "El nombre no puede tener mas de diez caracteres!",
                    },
                    minLength: {
                      value: 2,
                      message: "El nombre debe tener más de dos caracteres!",
                    },
                    max: {
                      value: 0,
                      message: "El nombre no debe tener numeros!",
                    },
                  })}
                />
                <span className="err">{errors?.nombre_moneda?.message}</span>
              </div>
              <div>
                <label className="text-label">Simbolo</label>
                <input
                  className="inp"
                  type="text"
                  name="simbolo"
                  autoComplete="off"
                  {...register("simbolo", {
                    required: {
                      value: true,
                      message: "Debe ingresar un Simbolo ",
                    },
                    maxLength: {
                      value: 3,
                      message: "El simbolo debe tener maximo tres letras!",
                    },
                    minLength: {
                      value: 1,
                      message: "El codigo debe tener como minimo 1 letra!",
                    },
                  })}
                />
                <span className="err">{errors?.simbolo?.message}</span>
              </div>
              <button className="agregarModal" type="submit">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormMoneda;
