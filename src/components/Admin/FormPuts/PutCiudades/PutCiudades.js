import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  putCiudad,
  getRegion,
  getPais,
  getPaisesId,
  getCiudadId,
  mostrarError,
} from "../../../Redux/actions";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
// import "./FormUnidadMedida.css";

function PutCiudades() {
  const dispatch = useDispatch();
  const paises = useSelector((store) => store.paises);
  const ciudad = useSelector((store) => store.ciudad);
  const ciudades = useSelector((store) => store.ciudades);
  const region = useSelector((store) => store.region);
  const pais = useSelector((store) => store.pais);

  const ciudadesId = useSelector((store) => store.ciudadesId);
  const paisesId = useSelector((store) => store.paisesId);

  useEffect(() => {
    dispatch(getPais());
    dispatch(getRegion());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const ChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "region") dispatch(getPaisesId(value));
    if (name === "paises") dispatch(getCiudadId(value));
    // console.log(value);
  };
  console.log(pais, ciudad);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data, e) => {
    // console.log(data);
    if (data.ciudad) {
      const ciudadModificada = {
        id: data.ciudad,
        ciudad: data.nombre_nuevo_pais,
        paiseCodigoAlfa: data.codigo_pais,
      };
      dispatch(putCiudad(ciudadModificada));
      e.target.reset();
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => dispatch(getPais()));
    } else {
      swal({
        title: "Debe seleccionar una ciudad para modificar!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }

    reset({ data });
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
            <label className="text-label">Regiones</label>
            <select name="region" onChange={(e) => ChangeInput(e)}>
              <option deafult>Seleccionar</option>
              {region.map((u) => (
                <option value={u.id}>{u.nombre_region}</option>
              ))}
            </select>
            <span className="err">{errors?.nombre_region?.message}</span>
          </div>
          <div>
            <label className="text-label">Paises</label>
            <select name="paises" onChange={(e) => ChangeInput(e)}>
              <option deafult>Seleccionar</option>
              {paisesId.map((u) => (
                <option value={u.codigo_alfa}>{u.nombre_pais}</option>
              ))}
            </select>
            <span className="err">{errors?.nombre_pais?.message}</span>
          </div>
          <div className="divForm">
            <div>
              <label className="text-label">Ciudad</label>
              <select
                name="ciudad"
                className="inp"
                onChange={(e) => ChangeInput(e)}
                {...register("ciudad", {
                  // required: {
                  //   value: true,
                  //   message: "Debe seleccionar una ciudad",
                  // },
                })}
              >
                <option></option>
                {ciudadesId.map((f, index) => (
                  <option key={index} value={f.id}>
                    {f.ciudad}
                  </option>
                ))}
              </select>
              <span className="err">{errors?.ciudades?.message}</span>
              <div>
                <label className="text-label">Código País</label>
                <select
                  name="codigo_pais"
                  className="inp"
                  onChange={(e) => ChangeInput(e)}
                  {...register("codigo_pais", {
                    required: {
                      value: true,
                      message: "Debe seleccionar una ciudad",
                    },
                  })}
                >
                  <option></option>
                  {pais.map((f, index) => (
                    <option key={index} value={f.codigo_alfa}>
                      {f.codigo_alfa}
                    </option>
                  ))}
                </select>
                {/* <input
                  className="inp"
                  type="text"
                  name="codigo_pais"
                  autoComplete="off"
                  max="0"
                  {...register("codigo_pais", {
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
                /> */}
              </div>
              <span className="err">{errors?.codigo_pais?.message}</span>
            </div>
            <div>
              <label className="text-label">Nombre</label>
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
            </div>
            <span className="err">{errors?.ciudades?.message}</span>
          </div>
          <div>
            <button className="agregarModal" type="submit">
              Modificar
            </button>
          </div>
        </form>
      </div>
      {/* <div className="contenedorActualesUM">
        Ciudades Actuales
        <div className="tiposUM">
          {ciudades.map((u) => (
            <span className="spansUM">{u.nombre_ciudad}</span>
          ))}
        </div> */}
      {/* </div> */}
    </>
  );
}

export default PutCiudades;
