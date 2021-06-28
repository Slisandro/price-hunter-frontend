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

function PutMonedas() {
  const dispatch = useDispatch();
  const moneda = useSelector((store) => store.moneda);

  const [state, setState] = useState({
    codigo_moneda: "",
    nombre_moneda: "",
    nuevo_nombre_moneda: "",
    simbolo: "",
  });

  useEffect(() => {
    dispatch(getMoneda());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "nombre_moneda") {
      var mon = moneda.find((f) => f.nombre_moneda === e.target.value);
      var final = mon.codigo_moneda;
      setState({
        ...state,
        [name]: target.value,
        codigo_moneda: final,
      });
    } else if (name === "nuevo_nombre_moneda") {
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "codigo_moneda") {
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
    const nuevaMoneda = {
      nombre_moneda: state.nuevo_nombre_moneda,
      codigo_moneda: state.codigo_moneda,
      simbolo: state.simbolo,
    };

    dispatch(putMoneda(nuevaMoneda));
    e.target.reset();
    if (nuevaMoneda.nombre_moneda) {
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => dispatch(getMoneda()));
    } else if (!nuevaMoneda.nuevo_nombre_moneda) {
      swal({
        title: "Debe seleccionar una moneda para modificar!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }

    setState({
      codigo_moneda: "",
      nombre_moneda: "",
      nuevo_nombre_moneda: "",
      simbolo: "",
    });
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <h1 id="title">Moneda</h1>
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
                <label className="title">Monedas</label>
                <Input name="nombre_moneda" type="select" className="inp">
                  <option></option>
                  {moneda.map((u) => (
                    <option value={u.nombre_moneda}>{u.nombre_moneda}</option>
                  ))}
                </Input>
                {/* <input
              className="inp"
              type="text"
              name="nombre_moneda"
              autoComplete="off"
              max="0"
              {...register("nombre_moneda", {
                required: {
                  value: true,
                  message: "Debe ingresar una moneda",
                },
                maxLength: {
                  value: 15,
                  message: "El nombre de la moneda debe tener menos de quince letras!",
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
                <span className="err">{errors?.nombre_moneda?.message}</span>

                <div>
                  <label className="title">Moneda</label>
                  <Input
                    className="inp"
                    type="text"
                    name="nuevo_nombre_moneda"
                    autoComplete="off"
                    max="0"
                    {...register("nuevo_nombre_moneda", {
                      // required: {
                      //   value: true,
                      //   message: "Debe ingresar una moneda ",
                      // },
                      max: {
                        value: 0,
                        message: "La unidad no puede comenzar con numeros",
                      },
                    })}
                  />
                  <span className="err">{errors?.codigo_moneda?.message}</span>
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
      {/* <div className="contenedorActualesCATE">
        Monedas Actuales
        <div className="tiposCATE">
          {moneda.map((u) => (
            <span className="spansCATE">{u.nombre_moneda}</span>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default PutMonedas;
