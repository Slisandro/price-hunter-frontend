import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { monedaPost, mostrarError, getMoneda } from "../../../Redux/actions";
import { useForm } from "react-hook-form";

import "./FormMonedaYum.css";

function FormMoneda() {
  const dispatch = useDispatch();
  const moneda = useSelector((store) => store.moneda);

  const [state, setState] = useState({
    codigo_moneda: "",
    nombre_moneda: "",
    simbolo: "",
  });

  useEffect(() => {
    dispatch(getMoneda());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  } = useForm({
    codigo_moneda: NaN,
  });

  const alerta = useSelector((store) => store.alerta);

  const submit = (data, e) => {
    e.preventDefault();

    const nuevaMoneda = {
      codigo_moneda: state.codigo_moneda.toLocaleUpperCase(),
      nombre_moneda: state.nombre_moneda,
      simbolo: state.simbolo,
    };

    // if (!nuevaMoneda.codigo_moneda) {
    //   dispatch(mostrarError("Debe ingresar el codigo de la moneda", 'alerta-error'));
    //   return;
    // }
    // if (data.codigo_moneda.length !== 3) {
    //   dispatch(mostrarError("Debe ingresar 3 letras",'alerta-error'));
    //   return;
    // }
    if (!isNaN(parseInt(data.codigo_moneda))) {
      dispatch(
        mostrarError("El codigo solo puede contener letras", "alerta-error")
      );
      return;
    }
    // if (!nuevaMoneda.nombre_moneda) {
    //   dispatch(mostrarError("Por favor, ingrese el nombre de la moneda", 'alerta-error'));
    //   return;
    // }
    if (!isNaN(parseInt(nuevaMoneda.nombre_moneda))) {
      dispatch(
        mostrarError("El nombre solo puede contener letras", "alerta-error")
      );
      return;
    }
    // if (!nuevaMoneda.simbolo) {
    //   dispatch(mostrarError("Por favor, ingrese el simbolo de la moneda", 'alerta-error'));
    //   return;
    // }

    dispatch(monedaPost(state));
    e.target.reset();
    alert("La Moneda fue agregada con éxito!");

    setState({
      codigo_moneda: "",
      nombre_moneda: "",
      simbolo: "",
    });
  };

  return (
    <>


      <div className="contenedorMoneda">
        <div className="containerForm">
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
                  className="btm"
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


                <div className="contenedorFAM">
                  {/* <div className="containerForm"> */}
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
                      <span className={`alerta ${alerta.categoria}`}>{alerta.msg}</span>
                    ) : null}
                    <div className="divForm">
                      <div>
                        <label className="text-label">Codigo de Moneda</label>
                        <input
                          className="btm"
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
                          // type="text"
                          name="nombre_moneda"
                          autoComplete="off"
                          {...register("nombre_moneda", {
                            required: {
                              value: true,
                              message: "Debe ingresar un Nombre para la Moneda ",
                            },
                            maxLength: {
                              value: 10,
                              message: "El nombre no puede tener mas de diez caracteres!",
                            },
                            minLength: {
                              value: 2,
                              message: "El nombre debe tener más de dos caracteres!",
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
              {/* <div className="contenedorActuales">
        <div className="tiposUsuarios">
          Tipos de Monedas Actuales
          {moneda.map((u) => (
            <span className="spans">{u.nombre_moneda}</span>
          ))}
        </div>
      </div> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormMoneda;
