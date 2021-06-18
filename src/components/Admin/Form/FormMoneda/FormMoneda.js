import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { monedaPost } from "../../../Redux/actions";
import { useForm } from "react-hook-form";

import "./FormMonedaYum.css";

function FormMoneda() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    codigo_moneda: "",
    nombre_moneda: "",
    simbolo: "",
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    // console.log(name);

    if (name === "codigo_moneda") {
      setState({
        ...state,
        [name]: target.value.toLocaleUpperCase(),
      });
    } else if (name === "nombre_moneda") {
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "simbolo") {
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
  } = useForm({
    codigo_moneda: NaN,
  });

  const submit = (data, e) => {
    // e.preventDefault();

    // const nuevaMoneda = {
    //   codigo_moneda: state.codigo_moneda.toLocaleUpperCase(),
    //   nombre_moneda: state.nombre_moneda,
    //   simbolo: state.simbolo,
    // };

    // if (!nuevaMoneda.codigo_moneda) {
    //   alert("Por favor, ingrese el codigo de la moneda");
    //   return;
    // }
    // if (data.codigo_moneda.length !== 3) {
    //   alert("Debe ingresar 3 letras...");
    //   return;
    // }
    if (!isNaN(parseInt(data.codigo_moneda))) {
      alert("El codigo solo puede contener letras");
      return;
    }
    // if (!nuevaMoneda.nombre_moneda) {
    //   alert("Por favor, ingrese el nombre de la moneda");
    //   return;
    // }
    // if (!isNaN(parseInt(nuevaMoneda.nombre_moneda))) {
    //   alert("El nombre solo puede contener letras");
    //   return;
    // }
    // if (!nuevaMoneda.simbolo) {
    //   alert("Por favor, ingrese el simbolo de la moneda");
    //   return;
    // }

    dispatch(monedaPost(state));
    e.target.reset();
    alert("La Moneda fue agregada con éxito!");

    setState({
      codigo_moneda: "",
      nombre_moneda: "",
      simbolo: "",
    });
  };

  return (
    <>
      <div className="contenedorFAM">
        <header>
          <h1 id="title">Agregar Moneda</h1>
        </header>
        <form
          id="survey-form"
          className="form"
          noValidate
          onChange={(e) => ChangeInput(e)}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="divForm">
            <div>
              <label className="text-label">Codigo de Moneda</label>
              <input
                className="inp"
                type="text"
                name="codigo_moneda"
                value={state.codigo_moneda}
              ></input>
            </div>
            <div>
              <label className="text-label">Nombre de la Moneda</label>
              <input
                className="inp"
                type="text"
                name="nombre_moneda"
                value={state.nombre_moneda}
              ></input>
            </div>
            <div>
              <label className="text-label">Simbolo</label>
              <input
                className="inp"
                type="text"
                name="simbolo"
                value={state.simbolo}
              ></input>
            </div>
            <button className="btn" type="submit">
              Agregar
            </button>
          </div>
        </form>
      </div>

       <div>
        <header>
          <h1 id="title">Agregar Unidad Medida</h1>
        </header>
        <form
          id="survey-form"
          className="form"
          noValidate
          onChange={(e) => ChangeInput(e)}
          onSubmit={(e) => handleSubmit(e)}
          // noValidate
          onChange={(e) => ChangeInput(e)}
          onSubmit={handleSubmit(submit)}
        >
          <div className="divForm">
            <div>
              <label className="text-label">Codigo de Moneda</label>
              <input
                className="btm"
                type="NaN"
                name="codigo_moneda"
                autoComplete="off"
                {...register("codigo_moneda", {
                  required: {
                    value: true,
                    message: "Debe ingresar un Codigo de Moneda ",
                  },
                  maxLength: {
                    value: 3,
                    message: "El codigo debe tener tres letras!",
                  },
                  minLength: {
                    value: 3,
                    message: "El codigo debe tener tres letras!",
                  },
                  // required: {
                  //   value: NaN,
                  //   message: 'El codigo no puede ser un numero'
                  // }
                })}
              />
              <span className="err">{errors?.codigo_moneda?.message}</span>
            </div>
            <div>
              <label className="text-label">Nombre de la Moneda</label>
              <input
                className="btm"
                type="text"
                name="nombre_moneda"
                autoComplete="off"
                {...register("nombre_moneda", {
                  required: {
                    value: true,
                    message: "Debe ingresar un Nombre para la Moneda ",
                  },
                  maxLength: {
                    value: 10,
                    message: "El nombre no puede tener mas de diez caracteres!",
                  },
                  minLength: {
                    value: 2,
                    message:
                      "El nombre no puede tener maenos de dos caracteres!",
                  },
                  // type: {
                  //   value: NaN,
                  //   message: 'El codigo no puede ser un numero'
                  // }
                })}
              />
              <span className="err">{errors?.nombre_moneda?.message}</span>
            </div>
            <div>
              <label className="text-label">Simbolo</label>
              <input
                className="btm"
                type="text"
                name="simbolo"
                autoComplete="off"
                {...register("simbolo", {
                  required: {
                    value: true,
                    message: "Debe ingresar un Simbolo ",
                  },
                  maxLength: {
                    value: 3,
                    message: "El simbolo debe tener maximo tres letras!",
                  },
                  minLength: {
                    value: 1,
                    message: "El codigo debe tener como minimo 1 letra!",
                  },
                  // typeof: {
                  //   value: 'Integer',
                  //   message: 'El codigo no puede ser un numero'
                  // }
                })}
              />
              <span className="err">{errors?.simbolo?.message}</span>
            </div>
            <button className="btn" type="submit">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormMoneda;
