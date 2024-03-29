import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ciudadPost, getPais, getCiudad } from "../../../Redux/actions";
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

function Ciudades() {
  const dispatch = useDispatch();

  const [ciudad, setCiudad] = useState({
    ciudad: "",
    paiseCodigoAlfa: "",
  });

  useEffect(() => {
    dispatch(getPais());
    dispatch(getCiudad());
  }, [dispatch]);

  const paises = useSelector((store) => store.pais);
  const ciudades = useSelector((store) => store.ciudad);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "ciudad") {
      setCiudad({
        ...ciudad,
        [name]: target.value,
      });
    } else if (name === "paiseCodigoAlfa") {
      setCiudad({
        ...ciudad,
        paiseCodigoAlfa: target.value,
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
    for (let i = 0; i < ciudades.length; i++) {
      if (data.ciudad.toUpperCase() === ciudades[i].ciudad.toUpperCase()) {
        return swal({
          title: "La ciudad ya existe",
          icon: "warning",
          button: "Aceptar",
          timer: "5000",
        });
      }
    }

    if (!data.ciudad) {
      return swal({
        title: "Agregue una Familia!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    } else {
      dispatch(ciudadPost(ciudad));
      e.target.reset();

      swal({
        title: "Ciudad agregada con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then(() => {
        dispatch(getCiudad())
        setCiudad({
          ciudad: "",
          paiseCodigoAlfa: "",
        });
        reset({ data });
      });
    }
  };

  return (
    <Card className="card-chart">
      <CardHeader>
        <span id="title">Ciudades</span>
      </CardHeader>
      <CardBody>
        <Form
          id="survey-form"
          noValidate
          onChange={(e) => ChangeInput(e)}
          onSubmit={handleSubmit(submit)}
        >
          {/* {alerta ? (
          <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
        ) : null} */}

          <Row>
            <Col>
              <h6 className="title">País</h6>
              {!ciudad.paiseCodigoAlfa ? (
                <>
                  <Input
                    name="paiseCodigoAlfa"
                    type="select"
                    className="inp"
                    value={paises.nombre_region}
                    onChange={(e) => ChangeInput(e)}
                    {...register("paiseCodigoAlfa", {
                      required: {
                        value: true,
                        message: "Debe seleccionar un pais",
                      },
                    })}
                  >
                    <option></option>
                    {paises.map((f) => (
                      <option value={f.codigo_alfa}>{f.nombre_pais}</option>
                    ))}
                  </Input>
                  <span className="err">
                    {errors?.paiseCodigoAlfa?.message}
                  </span>
                </>
              ) : (
                <>
                  <Input
                    valid
                    name="paiseCodigoAlfa"
                    type="select"
                    className="inp"
                    value={paises.nombre_region}
                    onChange={(e) => ChangeInput(e)}
                    {...register("paiseCodigoAlfa", {})}
                  >
                    <option></option>
                    {paises.map((f) => (
                      <option value={f.codigo_alfa}>{f.nombre_pais}</option>
                    ))}
                  </Input>
                  {/* <span className="err">
                    {errors?.paiseCodigoAlfa?.message}
                  </span> */}
                </>
              )}

              <div style={{ marginTop: "1rem" }}>
                <h6 className="title">Nueva Ciudad</h6>
                {ciudad.ciudad.length === 0 ? (
                  <Input
                    className="inp"
                    type="text"
                    name="ciudad"
                    autoComplete="off"
                    onChange={(e) => ChangeInput(e)}
                    {...register("ciudad", {
                      required: {
                        value: true,
                        message: "Debe ingresar un nombre para el ciudad",
                      }
                    })}
                  />
                ) : ciudad.ciudad.length > 2 && ciudad.ciudad.length < 21 ? (
                  <Input
                    valid
                    className="inp"
                    type="text"
                    name="ciudad"
                    autoComplete="off"
                    onChange={(e) => ChangeInput(e)}
                    {...register("ciudad", {})}
                  />
                ) : (
                  <Input
                    invalid
                    className="inp"
                    type="text"
                    name="ciudad"
                    autoComplete="off"
                    onChange={(e) => ChangeInput(e)}
                    {...register("ciudad", {
                      
                      maxLength: {
                        value: 20,
                        message:
                          "El Nombre no debe tener mas de veinte caracteres",
                      },
                      minLength: {
                        value: 3,
                        message:
                          "El nombre no debe tener menos de tres caracteres",
                      },
                    })}
                  />
                )}

                <span className="err">{errors?.ciudad?.message}</span>
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

export default Ciudades;
