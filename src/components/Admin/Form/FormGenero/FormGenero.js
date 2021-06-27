import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generoPost, getGeneros, mostrarError } from "../../../Redux/actions";
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
import close from "../../../../assets/cancel (1).png";
import "./FormGenero.css";

function FormGenero() {
  const [modal, setModal] = useState(true);
  const alerta = useSelector((store) => store.alerta);
  const generos = useSelector((store) => store.generos);

  const handleModal = () => {
    setModal(!modal);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGeneros());
    // dispatch(getUnidadMedida());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState({
    genero: "",
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    if (name === "genero") {
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
    e.preventDefault();

    const nuevoGenero = {
      genero: state.genero,
    };

    if (!nuevoGenero.genero) {
      dispatch(mostrarError("Ingrese un Género", "alerta-error"));
      return;
    }

    if (!isNaN(parseInt(nuevoGenero.genero))) {
      dispatch(
        mostrarError("El Género sólo puede contener letras", "alerta-error")
      );
      return;
    }

    dispatch(generoPost(nuevoGenero));
    e.target.reset();
    swal({
      title: "Género agregado con éxito!",
      icon: "success",
      button: "Aceptar",
      timer: "5000",
    }).then((r) => dispatch(getGeneros()));
    setState({
      genero: "",
    });
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <h1 id="title">Géneros</h1>
        </CardHeader>
        <CardBody>
          <Form
            id="survey-form"
            className="form"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={handleSubmit(submit)}
          >
            {/* {alerta ? (
              <span className={`alerta ${alerta.categoria}`}>{alerta.msg}</span>
            ) : null} */}
            <Row>
              <Col>
                <label className="title">Géneros Actuales</label>
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
                  {generos.map((f, index) => (
                    <option key={index} value={f.id}>
                      {f.genero}
                    </option>
                  ))}
                </Input>
                <label className="title">Nuevo Género</label>
                <Input
                  className="inp"
                  type="text"
                  name="genero"
                  max="0"
                  autoComplete="off"
                  {...register("genero", {
                    // required: {
                    //   value: true,
                    //   message: "Debe ingresar un genero ",
                    // },
                    maxLength: {
                      value: 20,
                      message: "El genero no debe tener mas de veinte letras!",
                    },
                    minLength: {
                      value: 3,
                      message: "El genero debe al menos tener tres letras!",
                    },
                    max: {
                      value: 0,
                      message: "El genero no puede comenzar con numeros",
                    },
                  })}
                />
                <span className="err">{errors?.genero?.message}</span>
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
      {/* <div className="contenedorActuales">
          <div className="tiposUsuarios">
            Tipos de Géneros Actuales
            {generos.map((u) => (
              <span className="spans">{u.genero}</span>
            ))}
          </div>
        </div> */}
    </>
  );
}

export default FormGenero;
