import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tipoUsuario, getTipoUsuario } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import close from "../../../../assets/cancel (1).png";
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
import "./FormUsuario.css";

function FormUsuario() {
  const [modal, setModal] = useState(true);
  const tipo_usuarios = useSelector((store) => store.tipo_usuarios);

  const handleModal = () => {
    setModal(!modal);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTipoUsuario());
    // dispatch(getUnidadMedida());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState({
    tipo_usuario: "",
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    if (name === "tipo_usuario") {
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
    const nuevoUsuario = {
      tipo_usuario: state.tipo_usuario,
    };

    if (!nuevoUsuario.tipo_usuario) {
      alert("Por favor, ingrese un tipo de usuario");
      return;
    }

    dispatch(tipoUsuario(nuevoUsuario));
    e.target.reset();
    swal({
      title: "Usuario agregado con éxito!",
      icon: "success",
      button: "Aceptar",
      timer: "5000",
    }).then((r) => dispatch(getTipoUsuario()));

    setState({
      tipo_usuario: "",
    });
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <h1 id="title">Tipo de Usuario</h1>
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
                <label className="title">Usuarios Actuales</label>
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
                  {tipo_usuarios.map((f, index) => (
                    <option key={index} value={f.id}>
                      {f.tipo_usuario}
                    </option>
                  ))}
                </Input>
                <label className="title">Nuevo Usuario</label>
                <Input
                  className="inp"
                  type="text"
                  name="tipo_usuario"
                  max="0"
                  autoComplete="off"
                  {...register("tipo_usuario", {
                    required: {
                      value: true,
                      message: "Debe ingresar un nombre ",
                    },
                    maxLength: {
                      value: 15,
                      message:
                        "El tipo de usuario no debe tener mas de quince letras!",
                    },
                    minLength: {
                      value: 3,
                      message:
                        "El tipo de usuario debe al menos tener tres letras!",
                    },
                    max: {
                      value: 0,
                      message: "No puede comenzar con numeros",
                    },
                  })}
                />
                <span className="err">{errors?.tipo_usuario?.message}</span>

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
          Tipos de Usuarios Actuales
          {tipo_usuarios.map((u) => (
            <span className="spans">{u.tipo_usuario}</span>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default FormUsuario;
