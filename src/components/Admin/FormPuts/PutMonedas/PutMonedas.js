import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putMoneda, getMoneda } from "../../../Redux/actions";
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

function PutMonedas() {
  const dispatch = useDispatch();
  const moneda = useSelector((store) => store.moneda);

  const [state, setState] = useState({
    codigo_moneda: "",
    nombre_moneda: "",
    simbolo: "",
  });

  useEffect(() => {
    dispatch(getMoneda());
  }, [dispatch]);

  const ChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "nombre_moneda") {
      setState({
        ...state,
        [name]: value,
      });
    }
    if (name === "codigo_moneda") {
      setState({
        ...state,
        [name]: value,
      });
    } else if (name === "simbolo") {
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
    if (data.nombre_moneda && data.nombre_moneda.length > 0) {
      dispatch(putMoneda(data));
      e.target.reset();
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => {
        dispatch(getMoneda());
        setState({
          codigo_moneda: "",
          nombre_moneda: "",
          simbolo: "",
        });
        reset({ data });
      });
    } else if (!data.codigo_moneda) {
      swal({
        title: "Debe seleccionar una moneda para modificar!",
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
            <Row>
              <Col>
                <h6 className="title">Monedas</h6>
                {state.codigo_moneda.length === 0 ? (
                  <>
                    <Input
                      name="codigo_moneda"
                      type="select"
                      className="inp"
                      onChange={(e) => ChangeInput(e)}
                      {...register("codigo_moneda", {
                        // required: {
                        //   value: true,
                        //   message: "Debe seleccionar una moneda",
                        // },
                      })}
                    >
                      <option></option>
                      {moneda.map((u) => (
                        <option value={u.codigo_moneda}>
                          {u.nombre_moneda}
                        </option>
                      ))}
                    </Input>
                  </>
                ) : (
                  <>
                    <Input
                      valid
                      name="codigo_moneda"
                      type="select"
                      className="inp"
                      onChange={(e) => ChangeInput(e)}
                      {...register("codigo_moneda", {})}
                    >
                      <option></option>
                      {moneda.map((u) => (
                        <option value={u.codigo_moneda}>
                          {u.nombre_moneda}
                        </option>
                      ))}
                    </Input>
                  </>
                )}
                <span className="err">{errors?.codigo_moneda?.message}</span>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nombre</h6>
                  {state.nombre_moneda.length === 0 ? (
                    <>
                      <Input
                        className="inp"
                        type="text"
                        name="nombre_moneda"
                        autoComplete="off"
                        max="0"
                        {...register("nombre_moneda", {
                          // required: {
                          //   value: true,
                          //   message: "Debe ingresar una moneda ",
                          // },
                        })}
                      />
                    </>
                  ) : state.nombre_moneda > 2 && state.nombre_moneda < 10 ? (
                    <>
                      <Input
                        valid
                        className="inp"
                        type="text"
                        name="nombre_moneda"
                        autoComplete="off"
                        max="0"
                        {...register("nombre_moneda", {})}
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        className="inp"
                        type="text"
                        name="nombre_moneda"
                        autoComplete="off"
                        max="0"
                        {...register("nombre_moneda", {
                          maxLength: {
                            value: 10,
                            message:
                              "El nombre no debe tener mas de 10 caracteres",
                          },
                          minLength: {
                            value: 3,
                            message:
                              "El nombre no puede tener menos de 3 caracteres",
                          },
                          pattern: {
                            value: /^[a-zA-Z ]*$/,
                            message: "Debe ingresar solo letras",
                          },
                        })}
                      />
                    </>
                  )}
                  <span className="err">{errors?.nombre_moneda?.message}</span>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Simbolo</h6>
                  <Input
                    className="inp"
                    type="text"
                    name="simbolo"
                    autoComplete="off"
                    onChange={(e) => ChangeInput(e)}
                    {...register("simbolo", {
                      maxLength: {
                        value: 4,
                        message: "El simbolo no debe tener mas de 4 caracteres",
                      },
                    })}
                  />
                  <span className="err">{errors?.simbolo?.message}</span>
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

export default PutMonedas;
