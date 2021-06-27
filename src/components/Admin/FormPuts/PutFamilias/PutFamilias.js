import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFamilia, putFamilia } from "../../../Redux/actions";
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

function PutFamilias() {
  const dispatch = useDispatch();
  const familia = useSelector((store) => store.familia);

  const [state, setState] = useState({
    nombre_familia: "",
    nombre_nueva_familia: "",
    descripcion: "",
    id: null,
  });

  useEffect(() => {
    dispatch(getFamilia());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    if (name === "nombre_familia") {
      var fam = familia.find((f) => f.nombre_familia === e.target.value);
      var final = fam.id;
      setState({
        ...state,
        [name]: target.value,
        id: final,
      });
    } else if (name === "nombre_nueva_familia") {
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
    const familiaModificada = {
      nombre_familia: state.nombre_nueva_familia,
      descripcion: state.descripcion,
      id: state.id,
    };

    dispatch(putFamilia(familiaModificada));
    e.target.reset();
    if (familiaModificada.nombre_familia) {
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => dispatch(getFamilia()));
    } else if (!familiaModificada.nombre_nueva_familia) {
      swal({
        title: "Debe seleccionar una familia para modificar!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }

    setState({
      nombre_familia: "",
      nombre_nueva_familia: "",
      descripcion: "",
      id: null,
    });
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <h1 id="title">Familias</h1>
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
                <label className="title">Familias</label>
                <Input type="select" name="nombre_familia">
                  <option></option>
                  {familia.map((u) => (
                    <option value={u.nombre_familia}>{u.nombre_familia}</option>
                  ))}
                </Input>
                <div>
                  <label className="title">Nueva Familia</label>
                  <Input
                    className="inp"
                    type="text"
                    name="nombre_nueva_familia"
                    autoComplete="off"
                    max="0"
                    {...register("nombre_nueva_familia", {
                      // required: {
                      //   value: true,
                      //   message: "Debe ingresar un nombre ",
                      // },
                      maxLength: {
                        value: 15,
                        message: "El nombre debe tener menos de quince letras!",
                      },
                    })}
                  />
                  {/* <span className="err">{errors?.nombre_familia?.message}</span>
              </div> */}
                  <span className="err">
                    {errors?.nombre_nueva_familia?.message}
                  </span>
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
        Familias Actuales
        <div className="tiposUM">
          {familia.map((u) => (
            <span className="spansUM">{u.nombre_familia}</span>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default PutFamilias;
