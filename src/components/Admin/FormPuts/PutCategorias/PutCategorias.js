import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putCategoria, getCategoria, getFamilia } from "../../../Redux/actions";
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

import "./PutCategorias.css";

function PutCategorías() {
  const dispatch = useDispatch();
  // const unidad_medida = useSelector((store) => store.unidad_medida);
  const categoria = useSelector((store) => store.categoria);
  const familia = useSelector((store) => store.familia);

  const [state, setState] = useState({
    nombre_categoria: "",
    descripcion: "",
    id: "",
    familiumId: "",
  });

  useEffect(() => {
    dispatch(getCategoria());
    dispatch(getFamilia());
  }, [dispatch]);

  const ChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "nombre_categoria") {
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
    if (name === "descripcion") {
      setState({
        ...state,
        [name]: value,
      });
    }
    if (name === "familiumId") {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const submit = (data, e) => {

    
    if (data.id && data.id.length > 0) {
      dispatch(putCategoria(data));
    e.target.reset();
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => dispatch(getCategoria()));
      reset({data})
    } else {
      swal({
        title: "Debe seleccionar una categoría para modificar!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }

    setState({
      nombre_categoria: "",
      descripcion: "",
      id: "",
      familiumId: "",
    });
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <span id="title">Categorías</span>
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
                <h6 className="title">Categoría</h6>
                {state.id.length === 0 ? (
                  <Input
                    type="select"
                    name="id"
                    className="inp"
                    onChange={(e) => ChangeInput(e)}
                    {...register("id", {})}
                  >
                    <option></option>
                    {categoria.map((u) => (
                      <option value={u.id}>{u.nombre_categoria}</option>
                    ))}
                  </Input>
                ) : (
                  <Input
                    valid
                    type="select"
                    name="id"
                    className="inp"
                    onChange={(e) => ChangeInput(e)}
                    {...register("id", {})}
                  >
                    <option></option>
                    {categoria.map((u) => (
                      <option value={u.id}>{u.nombre_categoria}</option>
                    ))}
                  </Input>
                )}

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nuevo Nombre</h6>
                  {state.nombre_categoria.length === 0 ? (
                    <Input
                      className="inp"
                      type="text"
                      name="nombre_categoria"
                      autoComplete="off"
                      max="0"
                      {...register("nombre_categoria", {
                        max: {
                          value: 0,
                          message: "La categoría no puede comenzar con numeros",
                        },
                      })}
                    />
                  ) : state.nombre_categoria.length > 2 &&
                    state.nombre_categoria.length < 21 ? (
                    <Input
                      valid
                      className="inp"
                      type="text"
                      name="nombre_categoria"
                      autoComplete="off"
                      max="0"
                      {...register("nombre_categoria", {})}
                    />
                  ) : (
                    <Input
                      invalid
                      className="inp"
                      type="text"
                      name="nombre_categoria"
                      autoComplete="off"
                      max="0"
                      {...register("nombre_categoria", {
                        maxLength: {
                          value: 20,
                          message:
                            "El nombre no debe tener mas de veinte letras!",
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
                  )}
                  <span className="err">
                    {errors?.nombre_categoria?.message}
                  </span>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Familia</h6>
                  {state.familiumId.length === 0 ? (
                    <Input
                      name="familiumId"
                      className="inp"
                      type="select"
                      onChange={(e) => ChangeInput(e)}
                      {...register("familiumId", {})}
                    >
                      <option></option>
                      {familia.map((f, index) => (
                        <option key={index} value={f.id}>
                          {f.nombre_familia}
                        </option>
                      ))}
                    </Input>
                  ) : (
                    <Input
                      valid
                      name="familiumId"
                      className="inp"
                      type="select"
                      onChange={(e) => ChangeInput(e)}
                      {...register("familiumId", {})}
                    >
                      <option></option>
                      {familia.map((f, index) => (
                        <option key={index} value={f.id}>
                          {f.nombre_familia}
                        </option>
                      ))}
                    </Input>
                  )}
                  <span className="err">{errors?.familiumId?.message}</span>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Descripción (opcional)</h6>
                  {state.descripcion.length === 0 ? (
                    <>
                      <Input
                        className="inp6"
                        type="text"
                        name="descripcion"
                        autoComplete="off"
                        max="0"
                      />
                    </>
                  ) : state.descripcion.length > 5 &&
                    state.descripcion.length < 256 ? (
                    <>
                      <Input
                        valid
                        {...register("descripcion", {
                          required: {
                            value: true,
                            message: "Debe ingresar un descripcion ",
                          },
                        })}
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        {...register("descripcion", {
                          maxLength: {
                            value: 256,
                            message:
                              "La descripcion no debe tener mas de 256 caracteres!",
                          },
                          minLength: {
                            value: 5,
                            message:
                              "La descripcion debe tener al menos cinco letras!",
                          },
                          max: {
                            value: 0,
                            message:
                              "La descripcion no puede comenzar con numeros",
                          },
                        })}
                      />
                    </>
                  )}
                  <span className="err">{errors?.descripcion?.message}</span>
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
    </>
  );
}

export default PutCategorías;
