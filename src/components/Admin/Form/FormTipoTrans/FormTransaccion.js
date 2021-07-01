import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  tipoTransaccionPost,
  getTipoTransaccion,
} from "../../../Redux/actions";
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

import "./FormTransaccion.css";

function FormTransaccion() {
  const dispatch = useDispatch();
  const transaccion = useSelector((store) => store.transaccion);

  const [state, setState] = useState({
    tipo_transaccion: "",
    id: "",
  });

  useEffect(() => {
    dispatch(getTipoTransaccion());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "tipo_transaccion") {
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
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data, e) => {
    for (let i = 0; i < transaccion.length; i++) {
      if (data.tipo_transaccion.toUpperCase() === transaccion[i].tipo_transaccion.toUpperCase()) {
        return swal({
          title: "La transaccion ya existe",
          icon: "warning",
          button: "Aceptar",
          timer: "5000",
        });
      }
    }

    if (data) {
      dispatch(tipoTransaccionPost(data));
      e.target.reset();
      return swal({
        title: "Tipo de Transacción agregado con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => {
        dispatch(getTipoTransaccion());
        setState({
          ...state,
          tipo_transaccion: "",
          id: "",
        });
        reset({ data });
      });
    } else {
      return swal({
        title: "Tipo de Transacción agregado con éxito!",
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
          <span id="title">Tipo de Transacción</span>
        </CardHeader>
        <CardBody>
          <Form
            id="survey-form"
            className="form"
            onChange={(e) => ChangeInput(e)}
            onSubmit={handleSubmit(submit)}
          >
            <Row>
              <Col>
                <h6 className="title">Tipos de Transacción Actuales</h6>
                <Input
                  name="id"
                  type="select"
                  className="inp"
                  onChange={(e) => ChangeInput(e)}
                  {...register("id", {})}
                >
                  <option></option>
                  {transaccion.map((f, index) => (
                    <option key={index} value={f.id}>
                      {f.tipo_transaccion}
                    </option>
                  ))}
                </Input>
                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nuevo Tipo de Transacción</h6>
                  {!state.tipo_transaccion ? (
                    <>
                      <Input
                        className="inp"
                        type="text"
                        name="tipo_transaccion"
                        autoComplete="off"
                        {...register("tipo_transaccion", {
                          required: {
                            value: true,
                            message: "Debe ingresar un tipo de transaccion",
                          },
                        })}
                      />
                      <span className="err">
                        {errors.tipo_transaccion &&
                          errors.tipo_transaccion.message}
                      </span>
                    </>
                  ) : state.tipo_transaccion.length >= 3 ? (
                    <>
                      <Input
                        valid
                        className="inp"
                        type="text"
                        name="tipo_transaccion"
                        autoComplete="off"
                        {...register("tipo_transaccion", {})}
                      />
                      <span className="err">
                        {errors.tipo_transaccion &&
                          errors.tipo_transaccion.message}
                      </span>
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        className="inp"
                        type="text"
                        name="tipo_transaccion"
                        autoComplete="off"
                        {...register("tipo_transaccion", {
                          minLength: {
                            value: 3,
                            message: "Mínimo 3 carácteres",
                          },
                        })}
                      />
                      <span className="err">
                        {errors.tipo_transaccion &&
                          errors.tipo_transaccion.message}
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
    </>
  );
}

export default FormTransaccion;
