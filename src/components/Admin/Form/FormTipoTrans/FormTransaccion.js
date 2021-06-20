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
      <div className="contenedorTransacciones">
        <h6 id="titleTran">Agregar Tipo de Transacción</h6>
        <form
          className="formFamilia"
          onChange={(e) => ChangeInput(e)}
          onSubmit={handleSubmit(submit)}
        >
          <div className="divTransacciones">
            <div>
              <label className="text-label">Tipo de Transacción</label>
              <input
                className="inp"
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
          </div>
          <button className="agregarModal" type="submit">
            Agregar
          </button>
        </form>
      </div>
    </Fragment>
  );
}

export default FormTransaccion;
