import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { regionPost, getRegion, mostrarError } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import {
  FormFeedback,
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

function Regiones() {
  const dispatch = useDispatch();
  const regiones = useSelector((store) => store.region);

  const [region, setRegion] = useState({
    nombre_region: "",
  });

  useEffect(() => {
    dispatch(getRegion());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const alerta = useSelector((store) => store.alerta);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "nombre_region") {
      setRegion({
        ...region,
        [name]: target.value,
      });
    }
  };

  const submit = (data, e) => {
    e.preventDefault();

    const nuevaRegion = {
      nombre_region: region.nombre_region,
    };
    if (!isNaN(parseInt(nuevaRegion.nombre_region))) {
      dispatch(
        mostrarError("El nombre no debe contener numeros", "alerta-error")
      );
      return;
    }
    dispatch(regionPost(nuevaRegion));
    e.target.reset();
    swal({
      title: "Región agregada con éxito!",
      icon: "success",
      button: "Aceptar",
      timer: "5000",
    }).then((g) => dispatch(getRegion()));

    setRegion({
      nombre_region: "",
    });
    reset({ data });
  };
  return (
    <Card className="card-chart">
      <CardHeader>
        <span id="title">Regiones</span>
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
              <h6 className="title">Regiones Actuales</h6>
              <Input type="select" name="nombre_region" className="inp">
                <option></option>
                {regiones.map((u) => (
                  <option value={u.nombre_region}>{u.nombre_region}</option>
                ))}
              </Input>

              {/* <span className="err">{errors?.nombre_region?.message}</span> */}
              <div style={{ marginTop: "1rem" }}>
                <h6 className="title">Nueva Región</h6>
                {!region.nombre_region ? (
                  <>
                    <Input
                      className="inp"
                      type="text"
                      name="nombre_region"
                      autoComplete="off"
                      {...register("nombre_region", {
                        required: {
                          value: true,
                          message: "Ingrese una Región ",
                        },
                        maxLength: {
                          value: 20,
                          message:
                            "El Nombre no debe tener más de veinte caracteres",
                        },
                        minLength: {
                          value: 3,
                          message:
                            "El Nombre no debe tener menos de tres caracteres",
                        },
                      })}
                    />
                    <span className="err">
                      {errors?.nombre_region?.message}
                    </span>
                  </>
                ) : region.nombre_region.length > 2 &&
                  region.nombre_region.length <= 20 &&
                  isNaN(region.nombre_region) ? (
                  <>
                    <Input
                      valid
                      className="inp"
                      type="text"
                      name="nombre_region"
                      autoComplete="off"
                      {...register("nombre_region", {
                        required: {
                          value: true,
                          message: "Ingrese una Región ",
                        },
                        maxLength: {
                          value: 20,
                          message:
                            "El Nombre no debe tener más de veinte caracteres",
                        },
                        minLength: {
                          value: 3,
                          message:
                            "El Nombre no debe tener menos de tres caracteres",
                        },
                      })}
                    />
                    <span className="err">
                      {errors?.nombre_region?.message}
                    </span>
                  </>
                ) : (
                  <>
                    <Input
                      invalid
                      className="inp"
                      type="text"
                      name="nombre_region"
                      autoComplete="off"
                      {...register("nombre_region", {
                        required: {
                          value: true,
                          message: "Ingrese una Region ",
                        },
                        maxLength: {
                          value: 20,
                          message:
                            "El Nombre no debe tener más de veinte caracteres",
                        },
                        minLength: {
                          value: 3,
                          message:
                            "El Nombre no debe tener menos de tres caracteres",
                        },
                        max: {
                          value: 0,
                          message: "El nombre no puede comenzar con numeros",
                        },
                      })}
                    />
                    <span className="err">
                      {errors?.nombre_region?.message}
                    </span>
                  </>
                )}
                {/* {alerta ? (
            <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
          ) : null} */}
              </div>
              <Button className="btn-fill" color="primary" type="submit" block>
                Agregar
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
}

export default Regiones;
