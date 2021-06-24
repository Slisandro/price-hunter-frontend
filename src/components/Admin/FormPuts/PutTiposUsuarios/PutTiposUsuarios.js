import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putTipoUsuario, getTipoUsuario } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
// import "./FormUnidadMedida.css";

function PutTiposUsuarios() {
  const dispatch = useDispatch();
  const tipo_usuarios = useSelector((store) => store.tipo_usuarios);

  useEffect(() => {
    dispatch(getTipoUsuario());
  }, [dispatch]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const submit = (data, e) => {
    if (data.tipo_usuario) {
      dispatch(putTipoUsuario(data));
      e.target.reset();
      // dispatch(getTipoUsuario());
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => dispatch(getTipoUsuario()));
    } else {
      swal({
        title: "Debe seleccionar un tipo de usuario para modificar!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }
    reset({data})
  };

  return (
    <>
      <div className="contenedorFAM">
        <header>
          <h1 id="title">Modificar Tipos de Usuario</h1>
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
                  message: "Debe seleccionar un campo a modificar",
                },
              })}
            >
              <option></option>
              {tipo_usuarios.map((f, index) => (
                <option key={index} value={f.id}>
                  {f.tipo_usuario}
                </option>
              ))}
            </select>
            <span className="err">{errors?.id?.message}</span>
          </div>

          <div className="divForm">
            <div>
              <label className="text-label">Tipos de Usuario</label>
              <input
                className="inp"
                type="text"
                name="tipo_usuario"
                autoComplete="off"
                max="0"
                {...register("tipo_usuario", {
                  // required: {
                  //   value: true,
                  //   message: "Debe ingresar nombre",
                  // },
                  maxLength: {
                    value: 15,
                    message:
                      "El nombre no debe tener mas de quince caracteres!",
                  },
                  max: {
                    value: 0,
                    message: "El nombre no puede comenzar con numeros",
                  },
                })}
              />
              <span className="err">{errors?.tipo_usuario?.message}</span>
            </div>
            <button className="agregarModal" type="submit">
              Modificar
            </button>
          </div>
        </form>
      </div>
      <div className="contenedorActualesUM">
        Tipos de Usuarios Actuales
        <div className="tiposUM">
          {tipo_usuarios.map((u, index) => (
            <span key={index} className="spansUM">
              {u.tipo_usuario}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default PutTiposUsuarios;
