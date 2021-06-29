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
      title: "Region agregada con éxito!",
      icon: "success",
      button: "Aceptar",
      timer: "5000",
    });

    setRegion({
      nombre_region: "",
    });
  };
  return (
    <Card className="card-chart">
      <CardHeader>
        <h1 id="title">Regiones</h1>
      </CardHeader>
      <CardBody>
        <Form
          id="survey-form"
          className="form"
          // noValidate
          onChange={(e) => ChangeInput(e)}
          onSubmit={handleSubmit(submit)}
        >
          <Row>
            <Col>
              <label className="title">Regiones Actuales</label>
              <Input type="select" name="nombre_region" className="inp">
                <option></option>
                {regiones.map((u) => (
                  <option value={u.nombre_region}>{u.nombre_region}</option>
                ))}
              </Input>

              {/* <span className="err">{errors?.nombre_region?.message}</span> */}
              <label className="title">Nueva Región</label>
              <Input
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
                    value: 10,
                    message: "El Nombre no debe tener mas de diez caracteres",
                  },
                  minLength: {
                    value: 2,
                    message: "El Nombre no debe tener menos de dos caracteres",
                  },
                })}
              />
              <span className="err">{errors?.nombre_region?.message}</span>
              {/* {alerta ? (
            <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
          ) : null} */}

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
