import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generoPost, getGeneros, mostrarError } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

import close from "../../../../assets/cancel (1).png";
import "./FormGenero.css";

function FormGenero() {
  const [modal, setModal] = useState(true);
  const alerta = useSelector((store) => store.alerta);
  const generos = useSelector((store) => store.generos);

  const handleModal = () => {
    setModal(!modal);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGeneros());
    // dispatch(getUnidadMedida());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState({
    genero: "",
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    if (name === "genero") {
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
    e.preventDefault();

    const nuevoGenero = {
      genero: state.genero,
    };

    if (!nuevoGenero.genero) {
      dispatch(mostrarError("Ingrese un Género", "alerta-error"));
      return;
    }

    if (!isNaN(parseInt(nuevoGenero.genero))) {
      dispatch(
        mostrarError("El Género sólo puede contener letras", "alerta-error")
      );
      return;
    }

    dispatch(generoPost(nuevoGenero));
    e.target.reset();
    swal({
      title: "Genero agregado con éxito!",
      icon: "success",
      button: "Aceptar",
      timer: "5000",
    })
    setState({
      genero: "",
    });
  };

  return (
    <>
      <div>
        <div className="contenedorFAM">
          {modal ? (
            <div>
              {/* <button className="buttonModal" onClick={() => handleModal()}>
                <img width={30} src={close} alt="x" />
              </button> */}
              <header>
                <h1 id="title">Agregar Género</h1>
              </header>
              <form
                id="survey-form"
                className="form"
                noValidate
                onChange={(e) => ChangeInput(e)}
                onSubmit={handleSubmit(submit)}
              >
                {alerta ? (
                  <span className={`alerta ${alerta.categoria}`}>
                    {alerta.msg}
                  </span>
                ) : null}
                <div className="divModalFAM">
                  <div>
                    <label className="text-label">Género</label>
                    <input
                      className="inp"
                      type="text"
                      name="genero"
                      max ='0'
                      autoComplete="off"
                      {...register("genero", {
                        required: {
                          value: true,
                          message: "Debe ingresar un genero ",
                        },
                        maxLength: {
                          value: 15,
                          message:
                            "El genero no debe tener mas de quince letras!",
                        },
                        minLength: {
                          value: 3,
                          message: "El genero debe al menos tener tres letras!",
                        },
                        max: {
                          value: 0,
                          message: "El genero no puede comenzar con numeros",
                        },
                      })}
                    />
                    <span className="err">{errors?.genero?.message}</span>
                  </div>
                  <button className="agregarModal" type="submit">
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
        <div className="contenedorActuales">
          <div className="tiposUsuarios">
            Tipos de Géneros Actuales
            {generos.map((u) => (
              <span className="spans">{u.genero}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FormGenero;
