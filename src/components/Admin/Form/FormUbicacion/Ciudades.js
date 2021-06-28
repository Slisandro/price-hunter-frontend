import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ciudadPost, getPais } from "../../../Redux/actions";
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

function Ciudades() {
  const dispatch = useDispatch();

  const [ciudad, setCiudad] = useState({
    ciudad: "",
    paiseCodigoAlfa: "",
  });

  useEffect(() => {
    dispatch(getPais());
  }, [dispatch]);

  const paises = useSelector((store) => store.pais);

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
  } = useForm();

  const alerta = useSelector((store) => store.alerta);

  const submit = (data, e) => {
    dispatch(ciudadPost(ciudad));
    e.target.reset();

    swal({
      title: "Ciudad agregada con éxito!",
      icon: "success",
      button: "Aceptar",
      timer: "5000",
    });
    setCiudad({
      ciudad: "",
      paiseCodigoAlfa: "",
    });
  };

  return (
    <Card className="card-chart">
      <CardHeader>
        <h1 id="title">Ciudades</h1>
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
              <label className="title">País</label>
              <Input
                name="paiseCodigoAlfa"
                type="select"
                className="selectTransAgregar"
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
              <span className="err">{errors?.paiseCodigoAlfa?.message}</span>

              <div>
                <label className="title">Nueva Ciudad</label>
                <Input
                  className="inp"
                  type="text"
                  name="ciudad"
                  autoComplete="off"
                  {...register("ciudad", {
                    required: {
                      value: true,
                      message: "Debe ingresar un nombre para el ciudad",
                    },
                    maxLength: {
                      value: 10,
                      message: "El Nombre no debe tener mas de diez caracteres",
                    },
                    minLength: {
                      value: 3,
                      message:
                        "El nombre no debe tener menos de tres caracteres",
                    },
                  })}
                />
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
