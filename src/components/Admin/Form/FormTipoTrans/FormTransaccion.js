
import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { tipoTransaccionPost } from "../../../Redux/actions";
import { useForm } from "react-hook-form";

import "./FormTransaccion.css";

function FormTransaccion() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    tipo_transaccion: "",
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "tipo_transaccion") {
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
    dispatch(tipoTransaccionPost(state));
    e.target.reset();
    alert("Tipo de Transacción agregado con éxito!");

    setState({
      ...state,
      tipo_transaccion: "",
    });
  };

  return (
    <Fragment>
      <div className="containerForm">
        <header>
          <h1 id="title">Agregar Tipo de Transacción</h1>
        </header>
        <form
          id="survey-form"
          className="form"
          onChange={(e) => ChangeInput(e)}
          onSubmit={handleSubmit(submit)}
        >
          <div className="divForm">
            <div>
              <label className="text-label">Tipo de Transacción</label>
              <input
                className="btm"
                type="text"
                name="tipo_transaccion"
                autoComplete="off"
                {...register("tipo_transaccion", {
                  required: {
                    value: true,
                    message: "Debe ingresar un tipo de transaccion",
                  },
                  minLength: {
                    value: 3,
                    message: "Mínimo 3 carácteres",
                  },
                })}
              />
              <span className="err">
                {errors.tipo_transaccion && errors.tipo_transaccion.message}
              </span>
            </div>
            <button type="submit">Agregar</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default FormTransaccion;
