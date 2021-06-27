import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  putCiudad,
  getRegion,
  getPais,
  getPaisesId,
  getCiudadId,
  mostrarError,
} from "../../../Redux/actions";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
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

function PutCiudades() {
  const dispatch = useDispatch();
  const paises = useSelector((store) => store.paises);
  const ciudad = useSelector((store) => store.ciudad);
  const ciudades = useSelector((store) => store.ciudades);
  const region = useSelector((store) => store.region);
  const pais = useSelector((store) => store.pais);
  const paisesId = useSelector((store) => store.paisesId);
  const ciudadesId = useSelector((store) => store.ciudadesId);

  const ciudadesId = useSelector((store) => store.ciudadesId);
  const paisesId = useSelector((store) => store.paisesId);

  useEffect(() => {
    dispatch(getPais());
    dispatch(getRegion());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const ChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "region") dispatch(getPaisesId(value));
    if (name === "paises") dispatch(getCiudadId(value));
  };
  console.log(pais, ciudad);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data, e) => {
    if (data.ciudad) {
      const ciudadModificada = {
        id: data.ciudad,
        ciudad: data.nombre_nuevo_pais,
        paiseCodigoAlfa: data.codigo_pais,
      };
      dispatch(putCiudad(ciudadModificada));
      e.target.reset();
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => dispatch(getPais()));
    } else {
      swal({
        title: "Debe seleccionar una ciudad para modificar!",
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
          <h1 id="title">Ciudades</h1>
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
                <label className="title">Región</label>
                <Input
                  type="select"
                  name="region"
                  onChange={(e) => ChangeInput(e)}
                >
                  <option deafult>Seleccionar</option>

                  {region.map((u) => (
                    <option value={u.id}>{u.nombre_region}</option>
                  ))}
                </Input>
                <span className="err">{errors?.nombre_region?.message}</span>

                <div>
                  <label className="title">Pais</label>
                  <Input
                    type="select"
                    name="paises"
                    onChange={(e) => ChangeInput(e)}
                  >
                    <option deafult>Seleccionar</option>
                    {paisesId.map((u) => (
                      <option value={u.codigo_alfa}>{u.nombre_pais}</option>
                    ))}
                  </Input>
                  <span className="err">{errors?.nombre_pais?.message}</span>
                </div>

                <div>
                  <label className="title">Ciudad</label>
                  <Input
                    name="ciudad"
                    className="inp"
                    type="select"
                    onChange={(e) => ChangeInput(e)}
                    {...register("ciudad", {
                      // required: {
                      //   value: true,
                      //   message: "Debe seleccionar una ciudad",
                      // },
                    })}
                  >
                    <option></option>
                    {ciudadesId.map((f, index) => (
                      <option key={index} value={f.id}>
                        {f.ciudad}
                      </option>
                    ))}
                  </Input>
                </div>
                <span className="err">{errors?.ciudadesId?.message}</span>
                <div>
                  <label className="title">Código País</label>
                  <Input
                    type="select"
                    name="codigo_pais"
                    className="inp"
                    onChange={(e) => ChangeInput(e)}
                    {...register("codigo_pais", {
                      required: {
                        value: true,
                        message: "Debe seleccionar una ciudad",
                      },
                    })}
                  >
                    <option></option>
                    {paisesId.map((f, index) => (
                      <option key={index} value={f.codigo_alfa}>
                        {f.codigo_alfa}
                      </option>
                    ))}
                  </Input>
                  {/* <input
                  className="inp"
                  type="text"
                  name="codigo_pais"
                  autoComplete="off"
                  max="0"
                  {...register("codigo_pais", {
                    required: {
                      value: true,
                      message: "Debe ingresar un nombre ",
                    },
                    maxLength: {
                      value: 15,
                      message: "El nombre debe tener menos de quince letras!",
                    },
                    minLength: {
                      value: 3,
                      message: "El nombre debe tener tres letras!",
                    },
                    max: {
                      value: 0,
                      message: "El nombre no puede comenzar con numeros",
                    },
                  })}
                /> */}

                  <span className="err">{errors?.codigo_pais?.message}</span>
                </div>
                <div>
                  <label className="title">Nombre Nueva Ciudad</label>
                  <Input
                    className="inp"
                    type="text"
                    name="nombre_nuevo_pais"
                    autoComplete="off"
                    max="0"
                    {...register("nombre_nuevo_pais", {
                      required: {
                        value: true,
                        message: "Debe ingresar un nombre ",
                      },
                      maxLength: {
                        value: 15,
                        message: "El nombre debe tener menos de quince letras!",
                      },
                      minLength: {
                        value: 3,
                        message: "El nombre debe tener tres letras!",
                      },
                      max: {
                        value: 0,
                        message: "El nombre no puede comenzar con numeros",
                      },
                    })}
                  />
                </div>
                <span className="err">{errors?.ciudades?.message}</span>

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
      {/* <div className="contenedorActualesUM">
        Ciudades Actuales
        <div className="tiposUM">
          {ciudades.map((u) => (
            <span className="spansUM">{u.nombre_ciudad}</span>
          ))}
        </div> */}
      {/* </div> */}
    </>
  );
}

export default PutCiudades;
