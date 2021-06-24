import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putTipoTransaccion, getTipoTransaccion } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
// import "./FormUnidadMedida.css";

function PutTipoTrans() {
  const dispatch = useDispatch();
  const transaccion = useSelector((store) => store.transaccion);

  useEffect(() => {
    dispatch(getTipoTransaccion());
  }, [dispatch]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data, e) => {
  
    dispatch(putTipoTransaccion(data));
    e.target.reset();
    
    swal({
      title:"Los datos se modificaron con éxito!",
      icon:"success",
      button:"Aceptar",
      timer:"5000"
    }).then(r => dispatch(getTipoTransaccion()))
  };

  return (
    <>
      <div className="contenedorFAM">
        <header>
          <h1 id="title">Modificar Tipos de Transacción</h1>
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
              name="id"
              className="inp"
              // value={paises.nombre_region}
              // onChange={(e) => ChangeInput(e)}
              {...register("id", {
                required: {
                  value: true,
                  message: "Debe seleccionar un tipo de transaccion",
                },
              })}
            >
              <option></option>
              {transaccion.map((f, index) => (
                <option key={index} value={f.id}>
                  {f.tipo_transaccion}
                </option>
              ))}
            </select>
            <span className="err">{errors?.id?.message}</span>
          </div>

          <div className="divForm">
            <div>
              <label className="text-label">Tipo Transacción</label>
              <input
                className="inp"
                type="text"
                name="tipo_transaccion"
                autoComplete="off"
                max="0"
                {...register("tipo_transaccion", {
                  required: {
                    value: true,
                    message: "Debe ingresar una tipo transaccion ",
                  },
                  maxLength: {
                    value: 15,
                    message: "El nombre no debe tener mas de quince letras!",
                  },
                  max: {
                    value: 0,
                    message: "El nombre no puede comenzar con numeros",
                  },
                })}
              />
              <span className="err">{errors?.tipo_transaccion?.message}</span>
            </div>
            <button className="agregarModal" type="submit">
              Modificar
            </button>
          </div>
        </form>
      </div>
      <div className="contenedorActualesUM">
        Tipos de Transacción Actuales
        <div className="tiposUM">
          {transaccion.map((u, index) => (
            <span key={index} className="spansUM">
              {u.tipo_transaccion}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default PutTipoTrans;
