import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unidadDeMedida, getUnidadMedida } from "../../../Redux/actions";
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

import "./FormUnidadMedida.css";

function FormUnidadMedida() {
  const dispatch = useDispatch();
  const unidad_medida = useSelector((store) => store.unidad_medida);

  const [state, setState] = useState({
    codigo_unidad_medida: "",
    nombre_unidad: "",
  });

  useEffect(() => {
    dispatch(getUnidadMedida());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "codigo_unidad_medida") {
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "nombre_unidad") {
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

  const submit = (data, e) => {
    const nuevaUM = {
      codigo_unidad_medida: state.codigo_unidad_medida,
      nombre_unidad: state.nombre_unidad,
    };

    if (!nuevaUM.codigo_unidad_medida) {
      alert("Por favor, ingrese el codigo de la moneda");
      return;
    }
    // if (nuevaUM.codigo_unidad_medida !== 3) {
    //   alert("Debe ingresar 3 letras...");
    //   return;
    // }
    if (!isNaN(parseInt(nuevaUM.codigo_unidad_medida))) {
      alert("El codigo solo puede contener letras");
      return;
    }
    if (!nuevaUM.nombre_unidad) {
      alert("Por favor, ingrese el nombre de la moneda");
      return;
    }
    if (!isNaN(parseInt(nuevaUM.nombre_unidad))) {
      alert("El nombre solo puede contener letras");
      return;
    }

    dispatch(unidadDeMedida(nuevaUM));
    e.target.reset();
    swal({
      title: "Unidad de Medida agregada con éxito!",
      icon: "success",
      button: "Aceptar",
      timer: "5000",
    }).then((r) => dispatch(getUnidadMedida()));
    setState({
      codigo_unidad_medida: "",
      nombre_unidad: "",
    });
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <h1 id="title">Unidad de Medida</h1>
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
                <label className="title">Unidades de Medida Actuales</label>
                <Input
                  name="id"
                  type="select"
                  className="inp"
                  onChange={(e) => ChangeInput(e)}
                  // {...register("id", {
                  //   required: {
                  //     value: true,
                  //     message: "Debe seleccionar un Producto",
                  //   },
                  // })}
                >
                  <option></option>
                  {unidad_medida.map((f, index) => (
                    <option key={index} value={f.id}>
                      {f.nombre_unidad}
                    </option>
                  ))}
                </Input>
                <label className="title">Nuevo Nombre</label>
                <Input
                  className="inp"
                  type="text"
                  name="nombre_unidad"
                  autoComplete="off"
                  max="0"
                  {...register("nombre_unidad", {
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
                <span className="err">{errors?.nombre_unidad?.message}</span>

                <div>
                  <label className="title">Nueva Unidad de Medida</label>
                  <Input
                    className="inp"
                    type="text"
                    name="codigo_unidad_medida"
                    autoComplete="off"
                    max="0"
                    {...register("codigo_unidad_medida", {
                      required: {
                        value: true,
                        message: "Debe ingresar una unidad ",
                      },
                      maxLength: {
                        value: 4,
                        message:
                          "la unidad no debe tener mas de cuatro letras!",
                      },
                      max: {
                        value: 0,
                        message: "La unidad no puede comenzar con numeros",
                      },
                    })}
                  />
                  <span className="err">
                    {errors?.codigo_unidad_medida?.message}
                  </span>
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
      {/* <div className="contenedorActualesUM">
        Unidades de Medida Actuales
        <div className="tiposUM">
          {unidad_medida.map((u) => (
            <span className="spansUM">{u.nombre_unidad}</span>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default FormUnidadMedida;
