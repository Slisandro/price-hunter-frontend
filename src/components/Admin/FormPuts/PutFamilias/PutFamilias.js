import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFamilia, putFamilia } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
// import "./FormUnidadMedida.css";

function PutFamilias() {
  const dispatch = useDispatch();
  const familia = useSelector((store) => store.familia);

  const [state, setState] = useState({
    nombre_familia: "",
    nombre_nueva_familia: "",
    descripcion: "",
    id: null,
  });

  useEffect(() => {
    dispatch(getFamilia());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    if (name === "nombre_familia") {
      var fam = familia.find((f) => f.nombre_familia === e.target.value);
      var final = fam.id;
      setState({
        ...state,
        [name]: target.value,
        id: final,
      });
    } else if (name === "nombre_nueva_familia") {
      setState({
        ...state,
        [name]: target.value,
      });
    }
    console.log(state);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data, e) => {
    const familiaModificada = {
      nombre_familia: state.nombre_nueva_familia,
      descripcion: state.descripcion,
      id: state.id,
    };

    // if (!familiaModificada.nombre_familia) {
    //   alert("Por favor, ingrese el nombre de la familia a modificar");
    //   return;
    // }
    // if (!familiaModificada.nombre_nueva_familia) {
    //   alert("Por favor, ingrese el nombre de la familia a modificar");
    //   return;
    // }
    // if (nuevaUM.codigo_unidad_medida !== 3) {
    //   alert("Debe ingresar 3 letras...");
    //   return;
    // }
    // if (!isNaN(parseInt(nuevaUM.codigo_unidad_medida))) {
    //   alert("El codigo solo puede contener letras");
    //   return;
    // }
    // if (!nuevaUM.nombre_unidad) {
    //   alert("Por favor, ingrese el nombre de la moneda");
    //   return;
    // }
    // if (!isNaN(parseInt(nuevaUM.nombre_unidad))) {
    //   alert("El nombre solo puede contener letras");
    //   return;
    // }

    console.log(familiaModificada);

    dispatch(putFamilia(familiaModificada));
    e.target.reset();
    alert("La familia fue modificada con éxito!");

    setState({
      nombre_familia: "",
      nombre_nueva_familia: "",
      descripcion: "",
      id: null,
    });
  };

  return (
    <>
      <div className="contenedorFAM">
        <header>
          <h1 id="title">Modificar Familias</h1>
        </header>
        <form
          id="survey-form"
          className="form"
          noValidate
          onChange={(e) => ChangeInput(e)}
          onSubmit={handleSubmit(submit)}
        >
          <div>
            <div className="divForm">
              <div>
                <label className="text-label">Familia</label>
                <select name="nombre_familia">
                  <option></option>
                  {familia.map((u) => (
                    <option value={u.nombre_familia}>{u.nombre_familia}</option>
                  ))}
                </select>
                <br></br>
                <label className="text-label">Nueva Familia</label>
                <input
                  className="inp"
                  type="text"
                  name="nombre_nueva_familia"
                  autoComplete="off"
                  max="0"
                  {...register("nombre_nueva_familia", {
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
                <span className="err">{errors?.nombre_unidad?.message}</span>
              </div>
              <span className="err">
                {errors?.codigo_unidad_medida?.message}
              </span>
            </div>
            <button className="agregarModal" type="submit">
              Modificar
            </button>
          </div>
        </form>
      </div>
      <div className="contenedorActualesUM">
        Familias Actuales
        <div className="tiposUM">
          {familia.map((u) => (
            <span className="spansUM">{u.nombre_familia}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export default PutFamilias;