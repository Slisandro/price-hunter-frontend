import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { regionPost, mostrarError } from "../../../Redux/actions";
import { useForm } from "react-hook-form";

function Regiones() {
  const dispatch = useDispatch();

  const [region, setRegion] = useState({
    nombre_region: "",
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const alerta = useSelector((store) => store.alerta);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    // console.log(name);
    // console.log(target.value);
    if (name === "nombre_region") {
      setRegion({
        ...region,
        [name]: target.value,
      });
    }
  };

  const submit = (data, e) => {
    e.preventDefault();

    const nuevaRegion = {
      nombre_region: region.nombre_region,
    };
    if (!isNaN(parseInt(nuevaRegion.nombre_region))) {
       dispatch(mostrarError("El nombre no debe contener numeros",'alerta-error'));
      return;
    }
    dispatch(regionPost(nuevaRegion));
    e.target.reset();
    alert("Ubicación agregada exitosamente!");

    setRegion({
      nombre_region: "",
    });
  };
  return (
    <div>
      <form
      id="survey-form"
      className="form"
      // noValidate
      onChange={(e) => ChangeInput(e)}
      onSubmit={handleSubmit(submit)}
      >
       
            <label className="text-label">Región</label>
            <input
              className="inp"
              type="text"
              name="nombre_region"
              autoComplete="off"
                {...register("nombre_region", {
                  required: {
                    value: true,
                    message: "Debe ingresar un Nombre Region ",
                  },
                  maxLength: {
                    value: 10,
                    message: "El Nombre no debe tener mas de diez caracteres",
                  },
                  minLength: {
                    value: 2,
                    message: "El Nombre no debe tener menos de dos caracteres",
                  },
                })}
           />
             <span className="err">{errors?.nombre_region?.message}</span>
             {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
           
          <button className="btn4" type="submit">
            Agregar
          </button>
        
      </form>
    </div>
  );
}

export default Regiones;
