import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tipoUsuario, getTipoUsuario } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import close from "../../../../assets/cancel (1).png";
import swal from "sweetalert";
import "./FormUsuario.css";

function FormUsuario() {
  const [modal, setModal] = useState(true);
  const tipo_usuarios = useSelector((store) => store.tipo_usuarios);

  const handleModal = () => {
    setModal(!modal);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTipoUsuario());
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

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data, e) => {
   

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
    swal({
      title: "Usuario agregado con éxito!",
      icon: "success",
      button: "Aceptar",
      timer: "5000",
    }).then(r => dispatch(getTipoUsuario()))

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
                onSubmit={handleSubmit(submit)}
              >
                <div className="divModalFAM">
                  <div>
                    <label className="text-label">Tipo de Usuario</label>
                    <input
                      className="inp"
                      type="text"
                      name="tipo_usuario"
                      max ='0'
                      autoComplete="off"
                      {...register("tipo_usuario", {
                        required: {
                          value: true,
                          message: "Debe ingresar un nombre ",
                        },
                        maxLength: {
                          value: 15,
                          message:
                            "El tipo de usuario no debe tener mas de quince letras!",
                        },
                        minLength: {
                          value: 3,
                          message: "El tipo de usuario debe al menos tener tres letras!",
                        },
                        max: {
                          value: 0,
                          message: "No puede comenzar con numeros",
                        },
                      })}
                    />
                    <span className="err">{errors?.tipo_usuario?.message}</span>
                  </div>
                  <button className="agregarModal" type="submit">
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
        <div className="contenedorActualesUM">
          Tipos de Usuarios Actuales
          {tipo_usuarios.map((u) => (
            <span className="spans">{u.tipo_usuario}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export default FormUsuario;
