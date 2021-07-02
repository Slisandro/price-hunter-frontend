import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generoPost, getGeneros } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import "./FormGenero.css";

function FormGenero() {
  const generos = useSelector((store) => store.generos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGeneros());
  }, [dispatch]);

  const [state, setState] = useState({
    genero: "",
    id: "",
  });

  const ChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "genero") {
      setState({
        ...state,
        [name]: value,
      });
    }
    if (name === "id") {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data, e) => {
    for (let i = 0; i < generos.length; i++) {
      if (data.genero.toUpperCase() === generos[i].genero.toUpperCase()) {
        return swal({
          title: "El genero ya existe!",
          icon: "warning",
          button: "Aceptar",
          timer: "5000",
        });
      }
    }

    if (data.genero) {
      dispatch(generoPost(data));
      e.target.reset();
      return swal({
        title: "Género agregado con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => {
        dispatch(getGeneros());
        setState({
          genero: "",
          id: "",
        });
        reset({ data });
      });
    } else {
      swal({
        title: "El Género no fué agregado!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <span id="title">Géneros</span>
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
                <h6 className="title">Géneros Actuales</h6>
               
                  <Input
                    name="id"
                    type="select"
                    className="inp"
                    onChange={(e) => ChangeInput(e)}
                    {...register("id", {
                    
                    })}
                  >
                    <option></option>
                    {generos.map((f, index) => (
                      <option key={index} value={f.id}>
                        {f.genero}
                      </option>
                    ))}
                  </Input>
               

                <span className="err">{errors?.id?.message}</span>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nuevo Género</h6>
                  {!state.genero ? (
                    <>
                      <Input
                        className="inp"
                        type="text"
                        name="genero"
                        max="0"
                        autoComplete="off"
                        {...register("genero", {
                          required: {
                            value: true,
                            message: "Debe ingresar un género ",
                          },
                        })}
                      />
                      <span className="err">{errors?.genero?.message}</span>
                    </>
                  ) : state.genero.length >= 3 && state.genero.length <= 20 ? (
                    <>
                      <Input
                        valid
                        className="inp"
                        type="text"
                        name="genero"
                        max="0"
                        autoComplete="off"
                        {...register("genero", {})}
                      />
                      <span className="err">{errors?.genero?.message}</span>
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        className="inp"
                        type="text"
                        name="genero"
                        max="0"
                        autoComplete="off"
                        {...register("genero", {
                          
                          maxLength: {
                            value: 20,
                            message:
                              "El género no debe tener mas de veinte letras!",
                          },
                          minLength: {
                            value: 3,
                            message:
                              "El género debe al menos tener tres letras!",
                          },
                          max: {
                            value: 0,
                            message: "El género no puede comenzar con numeros",
                          },
                        })}
                      />
                      <span className="err">{errors?.genero?.message}</span>
                    </>
                  )}
                </div>
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
    </>
  );
}

export default FormGenero;
