import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putRegion, getRegion } from "../../../Redux/actions";
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
  const region = useSelector((store) => store.region);

  const [state, setState] = useState({
    nombre_region: "",
    id: "",
  });

  useEffect(() => {
    dispatch(getRegion());
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
    if (name === "nombre_region") {
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
      dispatch(putRegion(data));
      e.target.reset();
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => dispatch(getRegion()));
    } else {
      swal({
        title: "Debe seleccionar una región para modificar!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }

    setState({
      nombre_region: "",
      id: "",
    });
    reset({ data });
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
                <h6 className="title">Regiones</h6>
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
                      {region.map((u) => (
                        <option value={u.id}>{u.nombre_region}</option>
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
                      {region.map((u) => (
                        <option value={u.id}>{u.nombre_region}</option>
                      ))}
                    </Input>
                  </>
                )}
                <span className="err">{errors?.id?.message}</span>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nueva Región</h6>
                  {state.nombre_region.length === 0 ? (
                    <>
                      <Input
                        className="inp"
                        type="text"
                        name="nombre_region"
                        autoComplete="off"
                        onChange={(e) => ChangeInput(e)}
                        max="0"
                        {...register("nombre_region", {
                          required: {
                            value: true,
                            message: "Debe ingresar una region ",
                          },
                        })}
                      />
                    </>
                  ) : state.nombre_region.length > 2 &&
                    state.nombre_region.length < 21 ? (
                    <>
                      <Input
                        valid
                        className="inp"
                        type="text"
                        name="nombre_region"
                        autoComplete="off"
                        max="0"
                        onChange={(e) => ChangeInput(e)}
                        {...register("nombre_region", {})}
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        className="inp"
                        type="text"
                        name="nombre_region"
                        autoComplete="off"
                        max="0"
                        onChange={(e) => ChangeInput(e)}
                        {...register("nombre_region", {
                          maxLength: {
                            value: 20,
                            message:
                              "El nombre no debe tener mas de 20 caracteres",
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
                  <span className="err">{errors?.nombre_region?.message}</span>
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