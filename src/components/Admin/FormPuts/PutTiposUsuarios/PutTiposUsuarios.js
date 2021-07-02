import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putTipoUsuario, getTipoUsuario } from "../../../Redux/actions";
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

function PutTiposUsuarios() {
  const dispatch = useDispatch();
  const tipo_usuarios = useSelector((store) => store.tipo_usuarios);

  useEffect(() => {
    dispatch(getTipoUsuario());
  }, [dispatch]);

  const [state, setState] = useState({
    tipo_usuario: "",
    id: "",
  });
  const ChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "tipo_usuario") {
      setState({
        ...state,
        [name]: value,
      });
    }
    if (name === "id") {
      setState({
        ...state,
        [name]: value,
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
    if (data.tipo_usuario) {
      dispatch(putTipoUsuario(data));
      e.target.reset();

      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => {
        dispatch(getTipoUsuario());
        setState({
          tipo_usuario: "",
          id: "",
        });
      });
    } else {
      swal({
        title: "Debe seleccionar un tipo de usuario para modificar!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }
    reset({ data });
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <span id="title">Tipos de Usuario</span>
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
                <h6 className="title">Tipos de Usuario</h6>
                {state.id.length === 0 ? (
                  <>
                    <Input
                      name="id"
                      type="select"
                      className="inp"
                      onChange={(e) => ChangeInput(e)}
                      {...register("id", {})}
                    >
                      <option></option>
                      {tipo_usuarios.map((f, index) => (
                        <option key={index} value={f.id}>
                          {f.tipo_usuario}
                        </option>
                      ))}
                    </Input>
                    <span className="err">{errors?.id?.message}</span>
                  </>
                ) : (
                  <>
                    <Input
                      valid
                      name="id"
                      type="select"
                      className="inp"
                      onChange={(e) => ChangeInput(e)}
                      {...register("id", {})}
                    >
                      <option></option>
                      {tipo_usuarios.map((f, index) => (
                        <option key={index} value={f.id}>
                          {f.tipo_usuario}
                        </option>
                      ))}
                    </Input>
                    <span className="err">{errors?.id?.message}</span>
                  </>
                )}

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nuevo Tipo de Usuario</h6>
                  {!state.tipo_usuario ? (
                    <>
                      <Input
                        className="inp"
                        type="text"
                        name="tipo_usuario"
                        autoComplete="off"
                        max="0"
                        onChange={(e) => ChangeInput(e)}
                        {...register("tipo_usuario", {})}
                      />
                      <span className="err">
                        {errors?.tipo_usuario?.message}
                      </span>
                    </>
                  ) : state.tipo_usuario.length > 2 &&
                    state.tipo_usuario.length < 15 ? (
                    <>
                      <Input
                        valid
                        className="inp"
                        type="text"
                        name="tipo_usuario"
                        autoComplete="off"
                        max="0"
                        onChange={(e) => ChangeInput(e)}
                        {...register("tipo_usuario", {
                          maxLength: {
                            value: 15,
                            message:
                              "El nombre no debe tener mas de quince caracteres!",
                          },
                          minLength: {
                            value: 3,
                            message:
                              "El nombre no debe tener menos de caracteres!",
                          },
                          max: {
                            value: 0,
                            message: "El nombre no puede comenzar con numeros",
                          },
                        })}
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
                        autoComplete="off"
                        max="0"
                        onChange={(e) => ChangeInput(e)}
                        {...register("tipo_usuario", {
                          maxLength: {
                            value: 15,
                            message:
                              "El nombre no debe tener mas de quince caracteres!",
                          },
                          max: {
                            value: 0,
                            message: "El nombre no puede comenzar con numeros",
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
                  Modificar
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}

export default PutTiposUsuarios;
