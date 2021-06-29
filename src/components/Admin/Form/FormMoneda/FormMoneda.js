import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { monedaPost, mostrarError, getMoneda } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  FormText,
} from "reactstrap";

import "./FormMonedaYum.css";

function FormMoneda() {
  const dispatch = useDispatch();
  const monedas = useSelector((store) => store.monedas);

  const [state, setState] = useState({
    codigo_moneda: "",
    nombre_moneda: "",
    simbolo: "",
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
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
  } = useForm();

  const alerta = useSelector((store) => store.alerta);
  let moneda = useSelector((store) => store.moneda);

  useEffect(() => {
    dispatch(getMoneda());
  }, [dispatch]);

  const submit = (data, e) => {
    const nuevaMoneda = {
      codigo_moneda: state.codigo_moneda.toLocaleUpperCase(),
      nombre_moneda: state.nombre_moneda,
      simbolo: state.simbolo,
    };
    console.log(nuevaMoneda);

    if (!isNaN(parseInt(nuevaMoneda.codigo_moneda))) {
      dispatch(
        mostrarError("El codigo solo puede contener letras", "alerta-error")
      );
      return;
    }

    if (!isNaN(parseInt(nuevaMoneda.nombre_moneda))) {
      dispatch(
        mostrarError("El nombre solo puede contener letras", "alerta-error")
      );
      return;
    }
    if (moneda.length > 0) {
      for (let i = 0; i < moneda.length; i++) {
        if (nuevaMoneda.codigo_moneda === moneda[i].codigo_moneda) {
          dispatch(mostrarError("La moneda ya existe", "alerta-error"));

          return;
        }
      }
    }
    if (nuevaMoneda.codigo_moneda.length > 0) {
      dispatch(monedaPost(nuevaMoneda));
      e.target.reset();
      swal({
        title: "La Moneda fue agregada con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then(
        (g) => dispatch(getMoneda()),
        setState({
          codigo_moneda: "",
          nombre_moneda: "",
          simbolo: "",
        })
      );
    } else {
      swal({
        title: "Agregue datos!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <span id="title">Moneda</span>
        </CardHeader>
        <CardBody>
          <Form
            id="survey-form"
            className="form"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={handleSubmit(submit)}
          >
            {/* {alerta ? (
              <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
            ) : null} */}
            <Row>
              <Col>
                <h6 className="title">Monedas Actuales</h6>
                <Input
                  // name="id"
                  type="select"
                  className="inp"
                  // onChange={(e) => ChangeInput(e)}
                  // {...register("id", {
                  // required: {
                  //   value: true,
                  //   message: "Debe seleccionar un Producto",
                  // },
                  // })}
                >
                  <option></option>
                  {moneda.map((f, index) => (
                    <option key={index} value={f.id}>
                      {f.nombre_moneda}
                    </option>
                  ))}
                </Input>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Codigo de Moneda</h6>
                  {!state.codigo_moneda ? (
                    <>
                      <Input
                        // className="btm"
                        type="NaN"
                        className="inp"
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
                        })}
                      />
                      <span className="err">
                        {errors?.codigo_moneda?.message}
                      </span>
                    </>
                  ) : state.codigo_moneda &&
                    state.codigo_moneda.length === 3 ? (
                    <>
                      <Input
                        valid
                        // className="btm"
                        type="NaN"
                        className="inp"
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
                        })}
                      />
                      <span className="err">
                        {errors?.codigo_moneda?.message}
                      </span>
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        // className="btm"
                        type="NaN"
                        className="inp"
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
                        })}
                      />
                      <span className="err">
                        {errors?.codigo_moneda?.message}
                      </span>
                    </>
                  )}
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nombre de la Moneda</h6>
                  {!state.nombre_moneda ? (
                    <>
                      <Input
                        className="inp"
                        type="text"
                        max="0"
                        name="nombre_moneda"
                        autoComplete="off"
                        {...register("nombre_moneda", {
                          required: {
                            value: true,
                            message: "Debe ingresar un Nombre para la Moneda ",
                          },
                          maxLength: {
                            value: 10,
                            message:
                              "El nombre no puede tener mas de diez caracteres!",
                          },
                          minLength: {
                            value: 2,
                            message:
                              "El nombre debe tener más de dos caracteres!",
                          },
                          max: {
                            value: 0,
                            message: "El nombre no debe tener numeros!",
                          },
                        })}
                      />
                      <span className="err">
                        {errors?.nombre_moneda?.message}
                      </span>
                    </>
                  ) : state.nombre_moneda &&
                    state.nombre_moneda.length > 2 &&
                    state.nombre_moneda.length < 20 ? (
                    <>
                      <Input
                        className="inp"
                        type="text"
                        max="0"
                        name="nombre_moneda"
                        autoComplete="off"
                        {...register("nombre_moneda", {
                          required: {
                            value: true,
                            message: "Debe ingresar un Nombre para la Moneda ",
                          },
                          maxLength: {
                            value: 20,
                            message:
                              "El nombre no puede tener mas de veinte caracteres!",
                          },
                          minLength: {
                            value: 2,
                            message:
                              "El nombre debe tener más de dos caracteres!",
                          },
                          max: {
                            value: 0,
                            message: "El nombre no debe tener numeros!",
                          },
                        })}
                      />
                      <span className="err">
                        {errors?.nombre_moneda?.message}
                      </span>
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        className="inp"
                        type="text"
                        max="0"
                        name="nombre_moneda"
                        autoComplete="off"
                        {...register("nombre_moneda", {
                          required: {
                            value: true,
                            message: "Debe ingresar un Nombre para la Moneda ",
                          },
                          maxLength: {
                            value: 10,
                            message:
                              "El nombre no puede tener mas de diez caracteres!",
                          },
                          minLength: {
                            value: 2,
                            message:
                              "El nombre debe tener más de dos caracteres!",
                          },
                          max: {
                            value: 0,
                            message: "El nombre no debe tener numeros!",
                          },
                        })}
                      />
                      <span className="err">
                        {errors?.nombre_moneda?.message}
                      </span>
                    </>
                  )}
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Simbolo</h6>
                  {!state.simbolo ? (
                    <>
                      <Input
                        className="inp"
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
                            message:
                              "El simbolo debe tener maximo tres letras!",
                          },
                          minLength: {
                            value: 1,
                            message:
                              "El codigo debe tener como minimo 1 letra!",
                          },
                        })}
                      />
                      <span className="err">{errors?.simbolo?.message}</span>
                    </>
                  ) : state.simbolo &&
                    state.simbolo.length <= 3 &&
                    state.simbolo.length >= 1 ? (
                    <>
                      <Input
                        valid
                        className="inp"
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
                            message:
                              "El simbolo debe tener maximo tres letras!",
                          },
                          minLength: {
                            value: 1,
                            message:
                              "El codigo debe tener como minimo 1 letra!",
                          },
                        })}
                      />
                      <span className="err">{errors?.simbolo?.message}</span>
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        className="inp"
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
                            message:
                              "El simbolo debe tener maximo tres letras!",
                          },
                          minLength: {
                            value: 1,
                            message:
                              "El codigo debe tener como minimo 1 letra!",
                          },
                        })}
                      />
                      <span className="err">{errors?.simbolo?.message}</span>
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
    </>
  );
}

export default FormMoneda;
