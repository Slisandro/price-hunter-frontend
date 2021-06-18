import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tipoUsuario } from "../../../Redux/actions";

import close from "../../../../assets/cancel (1).png";
import "./FormUsuario.css";

function FormUsuario() {
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
    tipo_usuario: "",
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    if (name === "tipo_usuario") {
      setState({
        ...state,
        [name]: target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoUsuario = {
      tipo_usuario: state.tipo_usuario,
    };

    console.log(nuevoUsuario);

    if (!nuevoUsuario.tipo_usuario) {
      alert("Por favor, ingrese un tipo de usuario");
      return;
    }

    dispatch(tipoUsuario(nuevoUsuario));
    e.target.reset();
    alert("Usuario agregado con éxito!");

    setState({
      tipo_usuario: "",
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
                <h1 id="title">Agregar Tipo de Usuario</h1>
              </header>
              <form
                id="survey-form"
                className="form"
                noValidate
                onChange={(e) => ChangeInput(e)}
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="divModalFAM">
                  <div>
                    <label className="text-label">Tipo de Usuario</label>
                    <input
                      className="inp"
                      type="text"
                      name="tipo_usuario"
                      value={state.tipo_usuario}
                    ></input>
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

export default FormUsuario;
