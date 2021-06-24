import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  tipoTransaccionPost,
  getTipoTransaccion,
} from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import swal from "sweetalert";


import "./FormTransaccion.css";

function FormTransaccion() {
  const dispatch = useDispatch();
  const transaccion = useSelector((store) => store.transaccion);

  const [state, setState] = useState({
    tipo_transaccion: "",
  });

  useEffect(() => {
    dispatch(getTipoTransaccion());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
   
    swal({
      title: "Tipo de Transacción agregado con éxito!",
      icon: "success",
      button: "Aceptar",
      timer: "5000",
    }).then(r => dispatch(getTipoTransaccion()))
    
    setState({
      ...state,
      tipo_transaccion: "",
    });
  };

  return (
    <Fragment>
      <div className="contenedorTransacciones">
        <h6 id="titleTran">Agregar Tipo de Transacción</h6>
        <form onChange={(e) => ChangeInput(e)} onSubmit={handleSubmit(submit)}>
          <div className="divTransacciones">
            <div>
              <label className="text-label">Tipo de Transacción</label>
              <input
                className="inp3"
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
      <div className="contenedorActualesUM">
        Tipos de Transacción Actuales
        <div className="tiposUM">
          {transaccion.map((t) => (
            <span className="spansUM">{t.tipo_transaccion}</span>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default FormTransaccion;
