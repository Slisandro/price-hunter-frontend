import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaises, putPais } from "../../../Redux/actions";
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

function PutPaises() {
  const dispatch = useDispatch();
  const paises = useSelector((store) => store.paises);

  const [state, setState] = useState({
    nombre_pais: "",
    codigo_alfa: "",
    nombre_nuevo_pais: "",
  });

  useEffect(() => {
    dispatch(getPaises());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "nombre_pais") {
      var pai = paises.find((f) => f.nombre_pais === e.target.value);
      var final = pai.codigo_alfa;
      setState({
        ...state,
        [name]: target.value,
        codigo_alfa: final,
      });
    } else if (name === "nombre_nuevo_pais") {
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
    const paisModificado = {
      nombre_pais: state.nombre_nuevo_pais,
      codigo_alfa: state.codigo_alfa,
    };

    dispatch(putPais(paisModificado));
    e.target.reset();
    if (paisModificado.nombre_pais) {
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => dispatch(getPaises()));
    } else if (!paisModificado.nombre_nuevo_pais) {
      swal({
        title: "Debe seleccionar un país para modificar!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }
    setState({
      nombre_pais: "",
      codigo_alfa: "",
      nombre_nuevo_pais: "",
    });
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <h1 id="title">Países</h1>
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
                <label className="title">Países</label>
                <Input name="nombre_pais" type="select" className="inp">
                  <option></option>
                  {paises.map((u) => (
                    <option value={u.nombre_pais}>{u.nombre_pais}</option>
                  ))}
                </Input>
                <div>
                  <label className="title">Nuevo País</label>
                  <Input
                    className="inp"
                    type="text"
                    name="nombre_nuevo_pais"
                    autoComplete="off"
                    max="0"
                    {...register("nombre_nuevo_pais", {
                      // required: {
                      //   value: true,
                      //   message: "Debe ingresar un nombre ",
                      // },
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
                  <span className="err">
                    {errors?.nombre_nuevo_pais?.message}
                  </span>
                  {/* </div> */}
                  {/* <span className="err">
                {errors?.codigo_unidad_medida?.message}
              </span> */}
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
        Países Actuales
        <div className="tiposCATE">
          {paises.map((u) => (
            <span className="spansCATE">{u.nombre_pais}</span>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default PutPaises;
