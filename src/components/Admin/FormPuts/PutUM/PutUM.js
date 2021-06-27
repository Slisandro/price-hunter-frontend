import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putUM, getUnidadMedida } from "../../../Redux/actions";
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

function PutUM() {
  const dispatch = useDispatch();
  const unidad = useSelector((store) => store.unidad_medida);

  useEffect(() => {
    dispatch(getUnidadMedida());
  }, [dispatch]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const submit = async (data, e) => {
    if (data.nombre_unidad) {
      dispatch(putUM(data));
      e.target.reset();
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => dispatch(getUnidadMedida()));
    } else {
      swal({
        title: "Debe seleccionar una unidad de medida para modificar!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }
    reset({ data });
  };

  return (
    <>
      {/* <div className="content"> */}
      {/* <Row> */}
      {/* <Col lg="4"> */}
      <Card className="card-chart">
        <CardHeader>
          <h1 id="title">Unidad de Medida</h1>
        </CardHeader>
        <CardBody>
          <Form
            id="survey-form"
            className="form"
            noValidate
            // onChange={(e) => ChangeInput(e)}
            onSubmit={handleSubmit(submit)}
          >
            <Row>
              <Col>
                <label className="title">Unidad de Medida</label>
                <Input
                  name="codigo_unidad_medida"
                  className="inp"
                  type="select"
                  // value={paises.nombre_region}
                  // onChange={(e) => ChangeInput(e)}
                  {...register("codigo_unidad_medida", {
                    //   required: {
                    //     value: true,
                    //     message: "Debe seleccionar un campo a modificar",
                    //   },
                  })}
                >
                  <option></option>
                  {unidad.map((f, index) => (
                    <option key={index} value={f.codigo_unidad_medida}>
                      {f.nombre_unidad}
                    </option>
                  ))}
                </Input>
                <span className="err">
                  {errors?.codigo_unidad_medida?.message}
                </span>

                <div>
                  <label className="title">Nueva Unidad de Medida</label>
                  <Input
                    // className="inp"
                    type="text"
                    name="nombre_unidad"
                    autoComplete="off"
                    max="0"
                    {...register("nombre_unidad", {
                      // required: {
                      //   value: true,
                      //   message: "Debe ingresar un nombre nuevo ",
                      // },
                      maxLength: {
                        value: 20,
                        message:
                          "El nombre no debe tener mas de veinte caracteres",
                      },
                      minLength: {
                        value: 3,
                        message:
                          "El nombre no debe tener menos de tres caracteres",
                      },
                      max: {
                        value: 0,
                        message: "El nombre no puede comenzar con numeros",
                      },
                    })}
                  />
                  <span className="err">{errors?.nombre_unidad?.message}</span>
                </div>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  block
                >
                  Modificar
                </Button>

                {/* <div className="contenedorActualesUM">
                  Unidades de Medida Actuales
                  <div className="tiposUM">
                    {unidad.map((u, index) => (
                      <span key={index} className="spansUM">
                        {u.nombre_unidad}
                      </span>
                    ))}
                  </div>
                </div> */}
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      {/* </Col> */}
      {/* </Row> */}
      {/* </div> */}
    </>
  );
}

export default PutUM;
