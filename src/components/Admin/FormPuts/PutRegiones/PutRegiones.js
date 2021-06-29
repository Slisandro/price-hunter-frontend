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

// import "./FormUnidadMedida.css";

function PutRegiones() {
  const dispatch = useDispatch();
  const region = useSelector((store) => store.region);

  const [state, setState] = useState({
    nombre_region: "",
    nuevo_nombre_region: "",
    id: null,
  });

  useEffect(() => {
    dispatch(getRegion());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "nombre_region") {
      var reg = region.find((f) => f.nombre_region === e.target.value);
      var final = reg.id;
      setState({
        ...state,
        [name]: target.value,
        id: final,
      });
    } else if (name === "nuevo_nombre_region") {
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
    const nuevaRegion = {
      nombre_region: state.nuevo_nombre_region,
      id: state.id,
    };

    dispatch(putRegion(nuevaRegion));
    e.target.reset();
    if (nuevaRegion.nombre_region) {
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => dispatch(getRegion()));
    } else if (!nuevaRegion.nuevo_nombre_region) {
      swal({
        title: "Debe seleccionar una región para modificar!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }

    setState({
      nombre_region: "",
      nuevo_nombre_region: "",
      id: null,
    });
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <h1 id="title">Regiones</h1>
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
                <label className="title">Regiones</label>
                <Input type="select" name="nombre_region" className="inp">
                  <option></option>
                  {region.map((u) => (
                    <option value={u.nombre_region}>{u.nombre_region}</option>
                  ))}
                </Input>

                <span className="err">{errors?.nombre_region?.message}</span>

                <div>
                  <label className="title">Nueva Región</label>
                  <Input
                    className="inp"
                    type="text"
                    name="nuevo_nombre_region"
                    autoComplete="off"
                    max="0"
                    {...register("nuevo_nombre_region", {
                      // required: {
                      //   value: true,
                      //   message: "Debe ingresar una region ",
                      // },
                      max: {
                        value: 0,
                        message: "La region no puede comenzar con numeros",
                      },
                    })}
                  />
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
      {/* <div className="contenedorActualesUM">
        Regiones Actuales
        <div className="tiposUM">
          {region.map((u) => (
            <span className="spansUM">{u.nombre_region}</span>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default PutRegiones;
