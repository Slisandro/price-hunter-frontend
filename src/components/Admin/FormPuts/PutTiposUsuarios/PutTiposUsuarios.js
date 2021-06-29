import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putTipoUsuario, getTipoUsuario } from "../../../Redux/actions";
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

function PutTiposUsuarios() {
  const dispatch = useDispatch();
  const tipo_usuarios = useSelector((store) => store.tipo_usuarios);

  useEffect(() => {
    dispatch(getTipoUsuario());
  }, [dispatch]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const submit = (data, e) => {
    if (data.tipo_usuario) {
      dispatch(putTipoUsuario(data));
      e.target.reset();

      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => dispatch(getTipoUsuario()));
    } else {
      swal({
        title: "Debe seleccionar un tipo de usuario para modificar!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }
    reset({ data });
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <h1 id="title">Tipos de Usuario</h1>
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
                <label className="title">Tipos de Usuario</label>
                <Input
                  name="id"
                  type="select"
                  className="inp"
                  // value={paises.nombre_region}
                  // onChange={(e) => ChangeInput(e)}
                  {...register("id", {
                    // required: {
                    //   value: true,
                    //   message: "Debe seleccionar un campo a modificar",
                    // },
                  })}
                >
                  <option></option>
                  {tipo_usuarios.map((f, index) => (
                    <option key={index} value={f.id}>
                      {f.tipo_usuario}
                    </option>
                  ))}
                </Input>
                <span className="err">{errors?.id?.message}</span>

                <div>
                  <label className="title">Nuevo Tipo de Usuario</label>
                  <Input
                    className="inp"
                    type="text"
                    name="tipo_usuario"
                    autoComplete="off"
                    max="0"
                    {...register("tipo_usuario", {
                      // required: {
                      //   value: true,
                      //   message: "Debe ingresar nombre",
                      // },
                      maxLength: {
                        value: 15,
                        message:
                          "El nombre no debe tener mas de quince caracteres!",
                      },
                      max: {
                        value: 0,
                        message: "El nombre no puede comenzar con numeros",
                      },
                    })}
                  />
                  <span className="err">{errors?.tipo_usuario?.message}</span>
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
        Tipos de Usuarios Actuales
        <div className="tiposUM">
          {tipo_usuarios.map((u, index) => (
            <span key={index} className="spansUM">
              {u.tipo_usuario}
            </span>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default PutTiposUsuarios;
