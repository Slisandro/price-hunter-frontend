import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFamilia, familiaPost } from "../../../Redux/actions";
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

function Fami() {
  const dispatch = useDispatch();
  const familia = useSelector((store) => store.familia);

  useEffect(() => {
    dispatch(getFamilia());
  }, [dispatch]);

  const [state, setState] = useState({
    nombre_familia: "",
    descripcion: "",
  });

  const ChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "nombre_familia") {
      setState({
        ...state,
        [name]: value,
      });
    }
    if (name === "descripcion") {
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
    if (!data.nombre_familia) {
      return swal({
        title: "Agregue una Familia!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }
    dispatch(familiaPost(data));

    e.target.reset();

    swal({
      title: "Familia agregada con éxito!",
      icon: "success",
      button: "Aceptar",
      timer: "5000",
    }).then((g) => dispatch(getFamilia()));

    reset({ data });
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <span id="title">Familias</span>
        </CardHeader>
        <CardBody>
          <Form
            className="form"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={handleSubmit(submit)}
          >
            <Row>
              <Col>
                <h6 className="title">Familias Actuales</h6>
                <Input type="select" className="inp">
                  <option></option>
                  {familia.map((u) => (
                    <option value={u.nombre_familia}>{u.nombre_familia}</option>
                  ))}
                </Input>
                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Familia</h6>
                  {state.nombre_familia.length === 0 ? (
                    <>
                      <Input
                        name="nombre_familia"
                        placeholder="Agregar Familia"
                        className="inp"
                        autoComplete="off"
                        max="0"
                      />
                    </>
                  ) : state.nombre_familia.length > 2 &&
                    state.nombre_familia.length < 21 ? (
                    <>
                      <Input
                        valid
                        {...register("nombre_familia", {
                          required: {
                            value: true,
                            message: "Debe ingresar un familia ",
                          },
                        })}
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        max="0"
                        {...register("nombre_familia", {
                          maxLength: {
                            value: 20,
                            message:
                              "La familia debe tener menos de veinte letras!",
                          },
                          minLength: {
                            value: 3,
                            message: "La familia debe tener tres letras!",
                          },
                          max: {
                            value: 0,
                            message: "La familia no puede comenzar con numeros",
                          },
                        })}
                      />
                    </>
                  )}
                  <span className="err">{errors?.nombre_familia?.message}</span>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Descripción (opcional)</h6>
                  {state.descripcion.length === 0 ? (
                    <>
                      <Input
                        className="inp6"
                        type="text"
                        name="descripcion"
                        autoComplete="off"
                        max="0"
                      />
                    </>
                  ) : state.descripcion.length > 5 &&
                    state.descripcion.length < 256 ? (
                    <>
                      <Input
                        valid
                        {...register("descripcion", {
                          required: {
                            value: true,
                            message: "Debe ingresar un descripcion ",
                          },
                        })}
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        {...register("descripcion", {
                          maxLength: {
                            value: 256,
                            message:
                              "La descripcion no debe tener mas de 256 caracteres!",
                          },
                          minLength: {
                            value: 5,
                            message:
                              "La descripcion debe tener al menos cinco letras!",
                          },
                          max: {
                            value: 0,
                            message:
                              "La descripcion no puede comenzar con numeros",
                          },
                        })}
                      />
                    </>
                  )}
                  <span className="err">{errors?.descripcion?.message}</span>
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
    </>
  );
}

export default Fami;
