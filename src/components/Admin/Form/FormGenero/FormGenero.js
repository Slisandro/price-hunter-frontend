import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generoPost } from "../../../Redux/actions";
import { useForm } from "react-hook-form";

import close from "../../../../assets/cancel (1).png";
import "./FormGenero.css";

function FormGenero() {
  const [modal, setModal] = useState(true);

  const handleModal = () => {
    setModal(!modal);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getSubcategoria());
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

    console.log(nuevoGenero);

    if (!nuevoGenero.genero) {
      alert("Por favor, ingrese un Género");
      return;
    }

    dispatch(generoPost(nuevoGenero));
    e.target.reset();
    alert("Género agregado con éxito!");

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
      </div>
    </>
  );
}

export default FormGenero;
