import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putGenero, getGenero } from "../../../Redux/actions";
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

function PutRegiones() {
  const dispatch = useDispatch();
  const generos = useSelector((store) => store.generos);

  const [state, setState] = useState({
    genero: "",
    id: "",
  });

  useEffect(() => {
    dispatch(getGenero());
  }, [dispatch]);

  const ChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "id") {
      setState({
        ...state,
        [name]: value,
      });
    }
    if (name === "genero") {
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
    if (data.id) {
      dispatch(putGenero(data));
      e.target.reset();
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => dispatch(getGenero()));
      reset({ data });
    } else {
      swal({
        title: "Debe seleccionar un genero para modificar!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }

    setState({
      genero: "",
      id: "",
    });
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <span id="title">Generos</span>
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
                <h6 className="title">Genero</h6>
                {state.id.length === 0 ? (
                  <>
                    <Input
                      type="select"
                      name="id"
                      className="inp"
                      onChange={(e) => ChangeInput(e)}
                      {...register("id", {
                        required: {
                          value: true,
                          message: "Debe seleccionar una region",
                        },
                      })}
                    >
                      <option></option>
                      {generos.map((u) => (
                        <option value={u.id}>{u.genero}</option>
                      ))}
                    </Input>
                  </>
                ) : (
                  <>
                    <Input
                      valid
                      type="select"
                      name="id"
                      className="inp"
                      onChange={(e) => ChangeInput(e)}
                      {...register("id", {})}
                    >
                      <option></option>
                      {generos.map((u) => (
                        <option value={u.id}>{u.genero}</option>
                      ))}
                    </Input>
                  </>
                )}
                <span className="err">{errors?.id?.message}</span>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nuevo Genero</h6>
                  {state.genero.length === 0 ? (
                    <>
                      <Input
                        className="inp"
                        type="text"
                        name="genero"
                        autoComplete="off"
                        onChange={(e) => ChangeInput(e)}
                        max="0"
                        {...register("genero", {
                          required: {
                            value: true,
                            message: "Debe ingresar un genero ",
                          },
                        })}
                      />
                    </>
                  ) : state.genero.length > 2 && state.genero.length < 21 ? (
                    <>
                      <Input
                        valid
                        className="inp"
                        type="text"
                        name="nombre_region"
                        autoComplete="off"
                        max="0"
                        onChange={(e) => ChangeInput(e)}
                        {...register("genero", {})}
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        className="inp"
                        type="text"
                        name="genero"
                        autoComplete="off"
                        max="0"
                        onChange={(e) => ChangeInput(e)}
                        {...register("genero", {
                          maxLength: {
                            value: 20,
                            message:
                              "El genero no debe tener mas de 20 caracteres",
                          },
                          minLength: {
                            value: 3,
                            message:
                              "El genero no puede tener menos de 3 caracteres",
                          },
                          pattern: {
                            value: /^[a-zA-Z ]*$/,
                            message: "Debe ingresar solo letras",
                          },
                        })}
                      />
                    </>
                  )}
                  <span className="err">{errors?.genero?.message}</span>
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

export default PutRegiones;
