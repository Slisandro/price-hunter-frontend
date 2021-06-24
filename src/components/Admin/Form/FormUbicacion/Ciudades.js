import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ciudadPost, getPais } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

function Ciudades() {
  const dispatch = useDispatch();

  const [ciudad, setCiudad] = useState({
    ciudad: "",
    paiseCodigoAlfa: "",
  });

  useEffect(() => {
    dispatch(getPais());
  }, [dispatch]);

  const paises = useSelector((store) => store.pais);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
  
    if (name === "ciudad") {
      setCiudad({
        ...ciudad,
        [name]: target.value,
      });
    } else if (name === "paiseCodigoAlfa") {
      setCiudad({
        ...ciudad,
        paiseCodigoAlfa: target.value,
      });
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const alerta = useSelector((store) => store.alerta);

  const submit = (data, e) => {
    dispatch(ciudadPost(ciudad));
    e.target.reset();
    
    swal({
      title: "Ciudad agregada con éxito!",
      icon: "success",
      button: "Aceptar",
      timer: "5000",
    })
    setCiudad({
      ciudad: "",
      paiseCodigoAlfa: "",
    });
  };

  return (
    <div>
      <form
      id="survey-form"
      noValidate
      onChange={(e) => ChangeInput(e)}
      onSubmit={handleSubmit(submit)}
    >
       {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}

        <div>
          <div className="separador">
            <label className="text-label">Pais</label>
            <select
              name="paiseCodigoAlfa"
              className="selectTransAgregar"
              value={paises.nombre_region}
              onChange={(e) => ChangeInput(e)}
              {...register("paiseCodigoAlfa", {
                required: {
                  value: true,
                  message: "Debe seleccionar un pais",
                },
              })}
            >
              <option></option>
              {paises.map((f) => (
                <option value={f.codigo_alfa}>{f.nombre_pais}</option>
              ))}
            </select>
            <span className="err">{errors?.paiseCodigoAlfa?.message}</span>
          </div>
          <div>
            <label className="text-label">Ciudad</label>
            <input
              className="inp"
              type="text"
              name="ciudad"
              autoComplete="off"
              {...register("ciudad", {
                required: {
                  value: true,
                  message: "Debe ingresar un nombre para el ciudad",
                },
                maxLength: {
                  value: 10,
                  message: "El Nombre no debe tener mas de diez caracteres",
                },
                minLength: {
                  value: 3,
                  message: "El nombre no debe tener menos de tres caracteres",
                },
              })}
            />
            <span className="err">{errors?.ciudad?.message}</span>
          </div>
          <button className="agregarModal" type="submit">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Ciudades;
