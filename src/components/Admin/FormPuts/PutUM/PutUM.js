import React, {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putUM, getUnidadMedida } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
// import "./FormUnidadMedida.css";

function PutUM() {
  const dispatch = useDispatch();
  const unidad = useSelector((store) => store.unidad_medida);

  useEffect(() => {
    dispatch(getUnidadMedida());
  }, [dispatch]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const submit = async (data, e) => {
    if (data.nombre_unidad) {
      dispatch(putUM(data));
      e.target.reset();
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => dispatch(getUnidadMedida()));
    } else {
      swal({
        title: "Debe seleccionar un producto para modificar!",
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
          <h1 id="title">Modificar Unidad de Medida</h1>
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
              name="codigo_unidad_medida"
              className="inp"
              // value={paises.nombre_region}
              // onChange={(e) => ChangeInput(e)}
              {...register("codigo_unidad_medida", {
              //   required: {
              //     value: true,
              //     message: "Debe seleccionar un campo a modificar",
              //   },
              })}
            >
              <option></option>
              {unidad.map((f, index) => (
                <option key={index} value={f.codigo_unidad_medida}>
                  {f.nombre_unidad}
                </option>
              ))}
            </select>
            <span className="err">{errors?.codigo_unidad_medida?.message}</span>
          </div>
          <div className="divForm">
            <div>
              <label className="text-label">Nombre</label>
              <input
                className="inp"
                type="text"
                name="nombre_unidad"
                autoComplete="off"
                max="0"
                {...register("nombre_unidad", {
                  // required: {
                  //   value: true,
                  //   message: "Debe ingresar un nombre nuevo ",
                  // },
                  maxLength: {
                    value: 20,
                    message: "El nombre no debe tener mas de veinte caracteres",
                  },
                  minLength: {
                    value: 3,
                    message: "El nombre no debe tener menos de tres caracteres",
                  },
                  max: {
                    value: 0,
                    message: "El nombre no puede comenzar con numeros",
                  },
                })}
              />
              <span className="err">{errors?.nombre_unidad?.message}</span>
            </div>
            <button className="agregarModal" type="submit">
              Modificar
            </button>
          </div>
        </form>
      </div>
      <div className="contenedorActualesUM">
        Unidades de Medida Actuales
        <div className="tiposUM">
          {unidad.map((u, index) => (
            <span key={index} className="spansUM">
              {u.nombre_unidad}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default PutUM;
