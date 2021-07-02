import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tipoUsuario, getTipoUsuario } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import "./FormUsuario.css";

function FormUsuario() {
  const tipo_usuarios = useSelector((store) => store.tipo_usuarios);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTipoUsuario());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState({
    tipo_usuario: "",
    id: "",
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
    if (name === "id") {
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
    reset,
  } = useForm();

  const submit = (data, e) => {
    for (let i = 0; i < tipo_usuarios.length; i++) {
      if (
        data.tipo_usuario.toUpperCase() ===
        tipo_usuarios[i].tipo_usuario.toUpperCase()
      ) {
        return swal({
          title: "El tipo de usuario ya existe",
          icon: "warning",
          button: "Aceptar",
          timer: "5000",
        });
      }
    }

    if (!data.tipo_usuario) {
      return swal({
        title: "Ingrese un tipo de usuario",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    } else {
      dispatch(tipoUsuario(data));
      e.target.reset();
      return swal({
        title: "El tipo de usuario fue agregado con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => {
        dispatch(getTipoUsuario());
        setState({
          tipo_usuario: "",
        });
        reset({ data });
      });
    }
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <span id="title">Tipo de Usuario</span>
        </CardHeader>
        <CardBody>
          <Form
            id="survey-form"
            className="form"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={handleSubmit(submit)}
          >
            <Row>
              <Col>
                <h6 className="title">Usuarios Actuales</h6>
               
                  <Input
                    name="id"
                    type="select"
                    className="inp"
                    onChange={(e) => ChangeInput(e)}
                    {...register("id", {
                     
                    })}
                  >
                    <option></option>
                    {tipo_usuarios.map((f, index) => (
                      <option key={index} value={f.id}>
                        {f.tipo_usuario}
                      </option>
                    ))}
                  </Input>
                
                <span className="err">{errors?.id?.message}</span>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nuevo Usuario</h6>
                  {!state.tipo_usuario ? (
                    <>
                      <Input
                        className="inp"
                        type="text"
                        name="tipo_usuario"
                        max="0"
                        autoComplete="off"
                        {...register("tipo_usuario", {
                          required: {
                            value: true,
                            message: "Debe agregar un tipo de usuario",
                          },
                        })}
                      />
                      <span className="err">
                        {errors?.tipo_usuario?.message}
                      </span>
                    </>
                  ) : state.tipo_usuario.length <= 20 &&
                    state.tipo_usuario.length >= 3 ? (
                    <>
                      <Input
                        valid
                        className="inp"
                        type="text"
                        name="tipo_usuario"
                        max="0"
                        autoComplete="off"
                        {...register("tipo_usuario", {})}
                      />
                      <span className="err">
                        {errors?.tipo_usuario?.message}
                      </span>
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        className="inp"
                        type="text"
                        name="tipo_usuario"
                        max="0"
                        autoComplete="off"
                        {...register("tipo_usuario", {
                          maxLength: {
                            value: 20,
                            message:
                              "El tipo de usuario no debe tener más de veinte letras!",
                          },
                          minLength: {
                            value: 3,
                            message:
                              "El tipo de usuario debe al menos tener tres letras!",
                          },
                          max: {
                            value: 0,
                            message: "No puede comenzar con numeros",
                          },
                        })}
                      />
                      <span className="err">
                        {errors?.tipo_usuario?.message}
                      </span>
                    </>
                  )}
                </div>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  block
                >
                  Agregar
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      {/* <div className="contenedorActualesUM">
          Tipos de Usuarios Actuales
          {tipo_usuarios.map((u) => (
            <span className="spans">{u.tipo_usuario}</span>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default FormUsuario;
